
let win = window,
    doc = document,
    El = HTMLElement.prototype

const eventMethods = {

  emit: function(eventName, arg) {
    let e = doc.createEvent('Event')
    e.initEvent(eventName, 1, 1)
    e.detail = arg
    this.dispatchEvent(e)
    return this
  },

  on: function() {
    this.addEventListener.apply(this, arguments)
    return this
  },

  off: function() {
    this.removeEventListener.apply(this, arguments)
    return this
  },

  once: function(eventName, callback, capture) {
    const fn = function() {
      this.off(eventName, fn, !!capture)
      callback.apply(this, arguments)
    }
    return this.on(eventName, fn, !!capture)
  }
}

for (let method in eventMethods) {
  win[method] = El[method] = eventMethods[method]
}
