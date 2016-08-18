var EventSinks = require('event-sinks/geval')
var document = require('global/document')
var test = require('tape')
var setImmediate = require('timers').setImmediate

var Event = require('./lib/create-event.js')
var h = require('./lib/h.js')
var event = require('../index.js')

test('filter event is a function', function (assert) {
  assert.equal(typeof event, 'function')
  assert.end()
})

test('can add filter event', function (assert) {
  var elem = h('div')
  document.body.appendChild(elem)
  var input = EventSinks('', [
    'someEvent'
  ])

  var values = []
  input.events.someEvent(function (data) {
    values.push(data)
  })
  elem.addEventListener('focusin', event(input.sinks.someEvent, {
    some: 'data'
  }, {
    event_types: ['focusin']
  }))

  var ev = Event('focusin')
  elem.dispatchEvent(ev)

  setImmediate(function () {
    assert.equal(values.length, 1)
    assert.equal(values[0].some, 'data')

    document.body.removeChild(elem)
    assert.end()
  })
})

test('can add (function) filter event', function (assert) {
  var elem = h('div')
  document.body.appendChild(elem)

  var values = []
  var sink = function (data) {
    values.push(data)
  }
  elem.addEventListener('focusin', event(sink, {
    some: 'data'
  }, {
    event_types: ['focusin']
  }))

  var ev = Event('focusin')
  elem.dispatchEvent(ev)

  setImmediate(function () {
    assert.equal(values.length, 1)
    assert.equal(values[0].some, 'data')

    document.body.removeChild(elem)
    assert.end()
  })
})


test('filter event does not fire when does not match filtered types', function (assert) {
  var elem = h('div')
  document.body.appendChild(elem)

  var values = []
  var sink = function (data) {
    values.push(data)
  }
  elem.addEventListener('focusin', event(sink, {
    some: 'data'
  }, {
    event_types: ['focusin']
  }))

  var ev = Event('click')
  elem.dispatchEvent(ev)

  setImmediate(function () {
    assert.equal(values.length, 0);

    document.body.removeChild(elem)
    assert.end()
  })
})