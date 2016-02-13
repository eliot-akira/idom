import './element'
import './events'
import create from './create'

let win = window,
    doc = document

const dom = {

  body: doc.body,

  head: doc.head,

  query: (sel) => dom.body.query(sel),

  queryAll: (sel) => dom.body.queryAll(sel),

  each: (sel, fn) => dom.body.each(sel, fn),

  on: function(evn, fn) {
    // Skips event in callback arguments
    dom.body.on(evn, (e) => fn(e.detail))
    return this
  },

  emit: function(evn, data) {
    dom.body.emit(evn, data)
    return this
  },

  ready: function(fn) {
    doc.addEventListener('DOMContentLoaded', fn)
    return this
  },

  onLoad: function(fn) {
    win.addEventListener('load', fn)
    return this
  },

  create

}

win.dom = dom

export default dom
