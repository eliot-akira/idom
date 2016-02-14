import iDom from 'incremental-dom'

import create from './create'
import render from './render'

iDom.create = create
iDom.render = render

iDom.register = function() {
  // Expose iDom.create for JSX
  window.iDom = iDom
}

iDom.renderable = function( el ) {
  // Provide render method
  el.render = function( fn ) {
    return iDom.render( this, fn )
  }
}

export default iDom
