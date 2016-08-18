# filter-event
mercury / vdom compatible event for taking a firehose of events and reducing to the ones you want.

## Scenario
I was working on an app where I need to capture just the focus events (focusin, focusout) for a given input, then modify state.  When using `value-event/event`, I can broadcast and receive the event, but this has 2 problems:

1. Since the original event object and DOM element are de-coupled, it is not possible to know the type of event fired.  I just know that there was AN event.
2. A large number of events are being fired.  Most of them are not important to me.

## Solution
Added `value-event/filter` event.  This works exactly like `value-event/event`except that it takes a whitelist of event names that it will allow to pass.  This allows event targeting without bringing any part of the event or DOM forward into the handler or channel.

# Usage

```
var sendFilteredEvent  = require('value-event/filter.js');

var state = { 
  active: false
};
var active_handler = function(active) {
  state.active = active;
};
var text_handlers = [

  sendFilteredEvent(active_handler, true , {
    event_types: ['focusin']
  }), 

  sendFilteredEvent(active_handler, false, {
    event_types: ['focusout']
  })
];

```

Now the VDOM part
```
h('input', {
  'ev-event': text_handlers,
  name: 'dogs',
  type: 'text'
});

```
