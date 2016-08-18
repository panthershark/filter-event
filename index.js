var BaseEvent = require('value-event/base-event.js');

module.exports = BaseEvent(eventLambda);

function eventLambda(ev, broadcast) {
  var opts = this.opts;
  var is_valid = false;

  if (opts.event_types && opts.event_types.length) {
    is_valid = opts.event_types.indexOf(ev.type) >= 0;
  }

  if (is_valid) {
    broadcast(this.data);
  }
}