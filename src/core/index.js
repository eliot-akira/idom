import iDom from 'incremental-dom'
import create from './create'
import render from './render'

iDom.create = create
iDom.render = render

iDom.renderable = ( el ) => {
  el.render = function( fn ) {
    return iDom.render( this, fn )
  }
}

iDom.register = () => window.iDom = iDom

export default iDom
