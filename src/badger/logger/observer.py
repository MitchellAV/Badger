"""
observers...
"""

from datetime import datetime
from badger.logger.event import Events


class Observer:
    def update(self, event, solution):
        raise NotImplementedError


class _Tracker(object):
    def __init__(self):
        self._iterations = 0

        self._start_time = None
        self._previous_time = None

    def _update_tracker(self, event, solution):
        if event == Events.OPTIMIZATION_STEP:
            self._iterations += 1

    def _time_metrics(self):
        now = datetime.now()
        if self._start_time is None:
            self._start_time = now
        if self._previous_time is None:
            self._previous_time = now

        time_elapsed = now - self._start_time
        time_delta = now - self._previous_time

        self._previous_time = now
        return (
            now.strftime("%Y-%m-%d %H:%M:%S"),
            time_elapsed.total_seconds(),
            time_delta.total_seconds(),
        )
