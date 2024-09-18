"use strict";(self.webpackChunkbadger_home=self.webpackChunkbadger_home||[]).push([[783],{2062:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=t(5893),s=t(1151);const i={sidebar_position:4},r="Create a plugin",l={id:"guides/create-a-plugin",title:"Create a plugin",description:"Plugins have two types:",source:"@site/versioned_docs/version-1.0/guides/create-a-plugin.md",sourceDirName:"guides",slug:"/guides/create-a-plugin",permalink:"/docs/guides/create-a-plugin",draft:!1,unlisted:!1,editUrl:"https://github.com/SLAC-ML/Badger-Home/edit/master/versioned_docs/version-1.0/guides/create-a-plugin.md",tags:[],version:"1.0",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"GUI Usage",permalink:"/docs/guides/gui-usage"},next:{title:"Implement an extension",permalink:"/docs/guides/implement-an-extension"}},o={},c=[{value:"Create an interface plugin",id:"create-an-interface-plugin",level:2},{value:"Create an environment plugin",id:"create-an-environment-plugin",level:2},{value:"The basics",id:"the-basics",level:3},{value:"Advanced topics",id:"advanced-topics",level:3},{value:"Specify variable range",id:"specify-variable-range",level:4},{value:"Incorperate hyper-parameters",id:"incorperate-hyper-parameters",level:4},{value:"Check variable readout",id:"check-variable-readout",level:4},{value:"Delayed observation",id:"delayed-observation",level:4},{value:"Caveats",id:"caveats",level:2},{value:"EPICS-related interface/environment",id:"epics-related-interfaceenvironment",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",strong:"strong",sup:"sup",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"create-a-plugin",children:"Create a plugin"}),"\n",(0,a.jsx)(n.p,{children:"Plugins have two types:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Interface: class"}),"\n",(0,a.jsx)(n.li,{children:"Environment: class"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Interface is the low-level layer between the machine/simulation and the environment that deals with the fundamental communications. It can be treated as an abstract of the underlying control system. Interface is optional ",(0,a.jsx)(n.strong,{children:"BUT"})," recommended! The pros of having an interface:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["It can be reused across different environments, so that you don't have to rewrite the same communication logic again and again",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-intf-exp",id:"user-content-fnref-intf-exp","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})})]}),"\n",(0,a.jsxs)(n.li,{children:["Unlike the environment, all the raw data that go through the interface can be recorded and archived, those raw data could include the intermediate measurements/observations that used to calculate the objectives/constraints/states",(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-env-cons",id:"user-content-fnref-env-cons","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})})]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Environment, on the other hand, abstracts the specific machine to be optimized. It contains the necessary information regarding the tuning knobs and the measurements, as well as the way to get and/or set them. Environment is the core of defining the optimization problem in Badger and it is mandatory."}),"\n",(0,a.jsx)(n.p,{children:"This guide will go through the basic components that compose a custom interface/environment by creating a simplest but full-featured interface/environment plugin. Let's get started."}),"\n",(0,a.jsx)(n.h2,{id:"create-an-interface-plugin",children:"Create an interface plugin"}),"\n",(0,a.jsx)(n.p,{children:"The file structure of a Badger interface plugin looks like this:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",metastring:'title="Badger interface plugin file structure"',children:"|--<INTERFACE_ID>\n    |--__init__.py\n    |--configs.yaml\n    |--README.md\n    |--...\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Let's create a simple interface that has 9 channels (8 input channels and 1 output channel), where the output channel is the L2 norm of all the input channel values. We'll name it ",(0,a.jsx)(n.code,{children:"myintf"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["Assume that the Badger plugin root has been pointed to some directory ",(0,a.jsx)(n.code,{children:"PLUGIN_ROOT"})," on your computer, then we can create a new folder ",(0,a.jsx)(n.code,{children:"myintf"})," inside ",(0,a.jsx)(n.code,{children:"PLUGIN_ROOT/interfaces/"}),", and we put the following files with the given content into the newly created folder:"]}),"\n",(0,a.jsx)(n.p,{children:"First the main script file:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:'title="myintf/__init__.py"',children:"from badger import interface\n\n\nclass Interface(interface.Interface):\n\n    name = 'myintf'\n\n    def get_values(self, channel_names: list):\n        pass\n\n    def set_values(self, channel_inputs: dict):\n        pass\n"})}),"\n",(0,a.jsx)(n.p,{children:"Then the configs file:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",metastring:'title="myintf/configs.yaml"',children:'---\nname: myintf\nversion: "0.1"\ndependencies:\n  - badger-opt\n'})}),"\n",(0,a.jsx)(n.h2,{id:"create-an-environment-plugin",children:"Create an environment plugin"}),"\n",(0,a.jsx)(n.p,{children:'To let Badger deal with your own optimization problem, you\'ll need to turn the problem into a custom environment plugin first. An environment in Badger defines how Badger could interact with the "control system" upon which the optimization problem forms up. To be more specific, Badger wants to know:'}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"What variables can be tuned"}),"\n",(0,a.jsx)(n.li,{children:"What are the ranges for the tunable variables"}),"\n",(0,a.jsx)(n.li,{children:"What observations are available (objectives, constraints, anything you would like to monitor in the optimization)"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Plus (actually more importantly):"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"How to tune one variable"}),"\n",(0,a.jsx)(n.li,{children:"How to get one observation"}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["And you incorporate those knowledge into Badger by inheriting the ",(0,a.jsx)(n.code,{children:"Environment"})," base class provided by the Badger core, and implementing the corresponding methods."]}),"\n",(0,a.jsx)(n.p,{children:"Let's get a better idea about it by creating a simple custom environment plugin for Badger from the ground up."}),"\n",(0,a.jsx)(n.h3,{id:"the-basics",children:"The basics"}),"\n",(0,a.jsx)(n.p,{children:"First off, let's create a file structure like the following:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",metastring:'title="Simplest environment plugin file structure"',children:"|--myenv\n    |--__init__.py\n    |--configs.yaml\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Here we'll name our simple custom env as ",(0,a.jsx)(n.code,{children:"myenv"}),", as the folder name shows."]}),"\n",(0,a.jsxs)(n.p,{children:["Then put the boilerplate code below into ",(0,a.jsx)(n.code,{children:"__init__.py"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:'title="myenv/__init__.py"',children:"from badger import environment\nfrom badger.interface import Interface\n\n\nclass Environment(environment.Environment):\n\n    name = 'myenv'\n    variables = {}\n    observables = []\n\n    def get_variables(self, variable_names: list[str]) -> dict:\n        return {}\n\n    def set_variables(self, variable_inputs: dict[str, float]):\n        pass\n\n    def get_observables(self, observable_names: list[str]) -> dict:\n        return {}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Several things to note regarding the boilerplate code:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["It should have a class variable called ",(0,a.jsx)(n.code,{children:"name"}),", and it should match the folder name of the plugin"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["In order to create a proper Badger env, there are 2 ",(0,a.jsx)(n.strong,{children:"CLASS"})," variables:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"variables"}),": A dictionary of all the supported variables, key is the variable name, value is the range of the variable"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"observables"}),": A list of all the supported observables"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"and 3 methods:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"get_variables"}),": Get a dictionary contains values of a given list of variables"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"set_variables"}),": Set the variables in the env with a given dictionary of variables and the target values"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"get_observables"}),": Get a dictionary contains values of a given list of observables"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"that are required to be implemented."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["Try to avoid doing time-consuming thing in ",(0,a.jsx)(n.code,{children:"__init__"})," method. Badger would create an instance of the environment when users try to get the details of the plugin (say, when ",(0,a.jsx)(n.code,{children:"badger env myenv"})," is called in CLI mode), so just put some light-computing code there in the constructor would provide the users a smoother experience."]})}),"\n",(0,a.jsxs)(n.p,{children:["Okay, now we can start to implement the methods. Assume that our sample environment has 3 variables: ",(0,a.jsx)(n.code,{children:"x"}),", ",(0,a.jsx)(n.code,{children:"y"}),", and ",(0,a.jsx)(n.code,{children:"z"}),", with range of [0, 1]. It also has 2 observations: ",(0,a.jsx)(n.code,{children:"norm"}),", and ",(0,a.jsx)(n.code,{children:"mean"}),". Then the ",(0,a.jsx)(n.code,{children:"variables"})," and ",(0,a.jsx)(n.code,{children:"observables"})," class variables should look like:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"    variables = {\n        'x': [0, 1],\n        'y': [0, 1],\n        'z': [0, 1],\n    }\n    observables = ['norm', 'mean']\n"})}),"\n",(0,a.jsx)(n.p,{children:"Our custom env is so simple that we don't really need an interface here. Let's implement the getter and setter for the variables:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"    # Internal variables start with a single underscore\n    _variables = {\n        'x': 0,\n        'y': 0,\n        'z': 0,\n    }\n\n    def get_variables(self, variable_names: list[str]) -> dict:\n        variable_outputs = {v: self._variables[v] for v in variable_names}\n\n        return variable_outputs\n\n    def set_variables(self, variable_inputs: dict[str, float]):\n        for var, x in variable_inputs.items():\n            self._variables[var] = x\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Here we use a dictionary called ",(0,a.jsx)(n.code,{children:"_variables"})," to hold the values for the variables."]}),"\n",(0,a.jsx)(n.p,{children:"Now let's add observable related logic:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"    def get_observables(self, observable_names: list[str]) -> dict:\n        x = self._variables['x']\n        y = self._variables['y']\n        z = self._variables['z']\n\n        observable_outputs = {}\n        for obs in observable_names:\n            if obs == 'norm':\n                observable_outputs[obs] = (x ** 2 + y ** 2 + z ** 2) ** 0.5\n            elif obs == 'mean':\n                observable_outputs[obs] = (x + y + z) / 3\n\n        return observable_outputs\n"})}),"\n",(0,a.jsxs)(n.p,{children:["At this point, the content of ",(0,a.jsx)(n.code,{children:"__init__.py"})," should be:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:'title="myenv/__init__.py"',children:"import numpy as np\nfrom badger import environment\n\n\nclass Environment(environment.Environment):\n\n    name = 'myenv'\n\n    variables = {\n        'x': [0, 1],\n        'y': [0, 1],\n        'z': [0, 1],\n    }\n    observables = ['norm', 'mean']\n\n    # Internal variables start with a single underscore\n    _variables = {\n        'x': 0,\n        'y': 0,\n        'z': 0,\n    }\n\n    def get_variables(self, variable_names: list[str]) -> dict:\n        variable_outputs = {v: self._variables[v] for v in variable_names}\n\n        return variable_outputs\n\n    def set_variables(self, variable_inputs: dict[str, float]):\n        for var, x in variable_inputs.items():\n            self._variables[var] = x\n\n    def get_observables(self, observable_names: list[str]) -> dict:\n        x = self._variables['x']\n        y = self._variables['y']\n        z = self._variables['z']\n\n        observable_outputs = {}\n        for obs in observable_names:\n            if obs == 'norm':\n                observable_outputs[obs] = (x ** 2 + y ** 2 + z ** 2) ** 0.5\n            elif obs == 'mean':\n                observable_outputs[obs] = (x + y + z) / 3\n\n        return observable_outputs\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Alright! Our little env is almost done -- even though it doesn\u2019t do much, it already has everything that we need for a Badger environment! To make the plugin complete, we should also incorporate some meta data (such as version number) of our env into ",(0,a.jsx)(n.code,{children:"configs.yaml"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:'title="myenv/configs.yaml"',children:'---\nname: myenv\nversion: "0.1"\ndependencies:\n  - badger-opt\n'})}),"\n",(0,a.jsxs)(n.p,{children:["Congrats! Our custom env plugin is ready to go! Let's put the whole folder under ",(0,a.jsx)(n.code,{children:"BADGER_PLUGIN_ROOT/environments"}),", then executing the following command in a terminal (in which the Badger package is available, of course):"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-shell",children:"badger env myenv\n"})}),"\n",(0,a.jsx)(n.p,{children:"The printouts should look like below. Yay!"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"name: myenv\nversion: '0.1'\ndependencies:\n  - badger-opt\nparams: {}\nvariables:\n  - x: 0 -> 1\n  - y: 0 -> 1\n  - z: 0 -> 1\nobservations:\n  - norm\n  - mean\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"caution",children:(0,a.jsx)(n.p,{children:"Please be sure to use Badger v1.0+"})}),"\n",(0,a.jsxs)(n.p,{children:["Now you can take ",(0,a.jsx)(n.code,{children:"myenv"})," for a spin -- just write some routine configs and run some algorithm (say, ",(0,a.jsx)(n.code,{children:"silly"})," the random sampler) on our newly created env, to see if everything works as expected."]}),"\n",(0,a.jsx)(n.h3,{id:"advanced-topics",children:"Advanced topics"}),"\n",(0,a.jsx)(n.h4,{id:"specify-variable-range",children:"Specify variable range"}),"\n",(0,a.jsx)(n.h4,{id:"incorperate-hyper-parameters",children:"Incorperate hyper-parameters"}),"\n",(0,a.jsx)(n.h4,{id:"check-variable-readout",children:"Check variable readout"}),"\n",(0,a.jsx)(n.h4,{id:"delayed-observation",children:"Delayed observation"}),"\n",(0,a.jsx)(n.h2,{id:"caveats",children:"Caveats"}),"\n",(0,a.jsx)(n.h3,{id:"epics-related-interfaceenvironment",children:"EPICS-related interface/environment"}),"\n",(0,a.jsxs)(n.p,{children:["When setting up an interface that uses EPICS. There is a need to run ",(0,a.jsx)(n.code,{children:"epics.ca.clear_cache()"}),(0,a.jsx)(n.sup,{children:(0,a.jsx)(n.a,{href:"#user-content-fn-epics-docs",id:"user-content-fnref-epics-docs","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"3"})})," when both getting and setting values from PVs. This ensures that the new processes do not share connections with previous runs of Badger."]}),"\n",(0,a.jsxs)(n.p,{children:["Below is an example that where you should make the ",(0,a.jsx)(n.code,{children:"epics.ca.clear_cache()"})," call in an interface. The same applies for ",(0,a.jsx)(n.code,{children:"set_values()"})," -- you should put ",(0,a.jsx)(n.code,{children:"epics.ca.clear_cache()"})," at the beginning of the function body."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:"{2,6}",children:"def get_values(self, channel_names):\n    epics.ca.clear_cache()\n\n    channel_outputs = {}\n\n    values = epics.caget_many(channel_names, timeout=3)\n    for i, channel in enumerate(channel_names):\n        channel_outputs[channel] = values[i]\n\n    return channel_outputs\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Also to note, when you uses ",(0,a.jsx)(n.code,{children:"PV.get()"})," to fetch data, the connections must be disconnected by the interface when they are no longer needed. If they are not properly disconnected they will persist between runs and cause a fault in Badger. Here is the example code for the same epics interface but with the ",(0,a.jsx)(n.code,{children:"PV"})," approach."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",metastring:"{2,6,7}",children:"def get_values(self, channel_names):\n    epics.ca.clear_cache()\n\n    channel_outputs = {}\n\n    pvs = [epics.PV(name) for name in channel_names]\n    values = [p.get(timeout=3) for p in pvs]\n    for i, channel in enumerate(channel_names):\n        channel_outputs[channel] = values[i]\n\n    return channel_outputs\n"})}),"\n",(0,a.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,a.jsx)(n.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{id:"user-content-fn-intf-exp",children:["\n",(0,a.jsxs)(n.p,{children:["One example is that both LCLS and NSLS use Epics as the control system, so an Epics interface can be shared between the LCLS and NSLS Badger environments ",(0,a.jsx)(n.a,{href:"#user-content-fnref-intf-exp","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{id:"user-content-fn-env-cons",children:["\n",(0,a.jsxs)(n.p,{children:["Environment can only record the VOCS, not the intermediate measurements. Say, to calculate the FEL pulse energy, one needs to average over a buffer of values. It is the averaged value being recorded in the archived run data, not the raw buffers ",(0,a.jsx)(n.a,{href:"#user-content-fnref-env-cons","data-footnote-backref":"","aria-label":"Back to reference 2",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{id:"user-content-fn-epics-docs",children:["\n",(0,a.jsxs)(n.p,{children:["See ",(0,a.jsx)(n.a,{href:"https://pyepics.github.io/pyepics/ca.html",children:"https://pyepics.github.io/pyepics/ca.html"})," for notes on the ",(0,a.jsx)(n.code,{children:"clear_cache"})," method ",(0,a.jsx)(n.a,{href:"#user-content-fnref-epics-docs","data-footnote-backref":"","aria-label":"Back to reference 3",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>r});var a=t(7294);const s={},i=a.createContext(s);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);