import iDom from './core'
import './dom'

// iDom.create for JSX
window.iDom = iDom

// Element render method
HTMLElement.prototype.render = function( fn ) {
  return iDom.render( this, fn )
}

export default iDom
