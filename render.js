
import { patch } from 'incremental-dom'

window.HTMLElement.prototype.render = function ( fn ) {

  if (typeof fn === 'function') {
    renderFn = this._renderFn = fn
  }
  else if (this._renderFn) {
    // Apply new attributes and get render function
    renderFn = this._renderFn(fn || '')
  }
  else return

  patch(this, renderFn)
  // Return the rendered element
  return this.firstChild
}
