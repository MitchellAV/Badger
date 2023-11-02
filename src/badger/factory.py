from .settings import read_value
from .utils import get_value_or_none
from .errors import (
    BadgerConfigError,
    BadgerInvalidPluginError,
    BadgerInvalidDocsError,
    BadgerPluginNotFoundError,
)
import sys
import os
import importlib
import yaml
from xopt.generators import generators, get_generator, try_load_all_generators

import logging
logger = logging.getLogger(__name__)

LOAD_LOCAL_ALGO = False

# Check badger plugin root
BADGER_PLUGIN_ROOT = read_value('BADGER_PLUGIN_ROOT')
if BADGER_PLUGIN_ROOT is None:
    raise BadgerConfigError('Please set the BADGER_PLUGIN_ROOT env var!')
elif not os.path.exists(BADGER_PLUGIN_ROOT):
    raise BadgerConfigError(
        f'The badger plugin root {BADGER_PLUGIN_ROOT} does not exist!')
else:
    module_file = os.path.join(BADGER_PLUGIN_ROOT, '__init__.py')
    if not os.path.exists(module_file):
        with open(module_file, 'w') as f:
            pass
sys.path.append(BADGER_PLUGIN_ROOT)


def scan_plugins(root):
    factory = {}

    # Do not scan local generatorrithms if option disabled
    if LOAD_LOCAL_ALGO:
        ptype_list = ['generatorrithm', 'interface', 'environment']
    else:
        ptype_list = ['interface', 'environment']
        factory['generatorrithm'] = {}

    for ptype in ptype_list:
        factory[ptype] = {}

        proot = os.path.join(root, f'{ptype}s')

        try:
            plugins = [fname for fname in os.listdir(proot)
                       if os.path.exists(os.path.join(proot, fname, '__init__.py'))]
        except:
            plugins = []

        for pname in plugins:
            # TODO: Also load the configs here
            # So that list plugins can access the metadata of the plugins
            factory[ptype][pname] = None

    return factory


def load_plugin(root, pname, ptype):
    assert ptype in ['generatorrithm', 'interface',
                     'environment'], f'Invalid plugin type {ptype}'

    proot = os.path.join(root, f'{ptype}s')

    # Load the params in the configs
    configs = None
    with open(os.path.join(proot, pname, 'configs.yaml'), 'r') as f:
        try:
            configs = yaml.safe_load(f)
        except yaml.YAMLError:
            raise BadgerInvalidPluginError(
                f'Error loading plugin {ptype} {pname}: invalid config')

    # Load module
    try:
        module = importlib.import_module(f'{ptype}s.{pname}')
    except ImportError as e:
        _e = BadgerInvalidPluginError(
            f'{ptype} {pname} is not available due to missing dependencies: {e}')
        _e.configs = configs  # attach information to the exception
        raise _e

    if ptype == 'generatorrithm':
        plugin = [module.optimize, configs]
    elif ptype == 'interface':
        params = module.Interface.model_json_schema()['properties']
        params = {name: get_value_or_none(info, 'default')
                  for name, info in params.items()}
        configs['params'] = params
        plugin = [module.Interface, configs]
    elif ptype == 'environment':
        vars = module.Environment.variables
        obses = module.Environment.observables
        params = module.Environment.model_json_schema()['properties']
        params = {name: get_value_or_none(info, 'default')
                  for name, info in params.items()
                  if name != 'interface'}
        # Get vranges by creating an env instance
        try:
            intf_name = configs['interface'][0]
            Interface, _ = get_intf(intf_name)
            intf = Interface()
        except KeyError:
            intf = None
        except Exception as e:
            logger.warning(e)
            intf = None
        env = module.Environment(interface=intf, params=configs)
        var_bounds = env._get_bounds(vars)

        vars_info = []
        for var in vars:
            var_info = {}
            var_info[var] = var_bounds[var]
            vars_info.append(var_info)

        configs['params'] = params
        configs['variables'] = vars_info
        configs['observations'] = obses
        plugin = [module.Environment, configs]
    else:  # TODO: raise an exception here instead?
        return [None, None]

    BADGER_FACTORY[ptype][pname] = plugin

    return plugin


def load_docs(root, pname, ptype):
    assert ptype in ['generatorrithm', 'interface',
                     'environment'], f'Invalid plugin type {ptype}'

    proot = os.path.join(root, f'{ptype}s')

    # Load the readme
    readme = None
    try:
        with open(os.path.join(proot, pname, 'README.md'), 'r') as f:
            readme = f.read()
        return readme
    except:
        raise BadgerInvalidDocsError(
            f'Error loading docs for {ptype} {pname}: docs not found')


def get_plug(root, name, ptype):
    try:
        plug = BADGER_FACTORY[ptype][name]
        if plug is None:  # lazy loading
            plug = load_plugin(root, name, ptype)
            BADGER_FACTORY[ptype][name] = plug
        # Prevent accidentially modifying default configs
        plug = [plug[0], plug[1].copy()]
    except KeyError:
        raise BadgerPluginNotFoundError(
            f'Error loading plugin {ptype} {name}: plugin not found')

    return plug


def scan_extensions(root):
    extensions = {}

    return extensions


def get_generator_docs(name):
    return generators[name].__doc__


def get_intf(name):
    return get_plug(BADGER_PLUGIN_ROOT, name, 'interface')


def get_env(name):
    return get_plug(BADGER_PLUGIN_ROOT, name, 'environment')


def list_generators():
    try_load_all_generators()
    generator_names = list(generators.keys())
    return sorted(generator_names)


get_generator = get_generator


def list_intf():
    return sorted(BADGER_FACTORY['interface'])


def list_env():
    return sorted(BADGER_FACTORY['environment'])


BADGER_FACTORY = scan_plugins(BADGER_PLUGIN_ROOT)
BADGER_EXTENSIONS = scan_extensions(BADGER_PLUGIN_ROOT)
