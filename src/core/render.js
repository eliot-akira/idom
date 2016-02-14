import { patch } from 'incremental-dom'

function render( el, fn ) {

  if ( typeof fn === 'function' ) {

    el.renderFn = fn

  // Check previously defined
  } else if ( el.renderFn ) {

    // Apply new attributes to render function
    el.renderFn = el.renderFn( fn || '' )

  // No render function
  } else return

  patch( el, el.renderFn )

  // The rendered element
  return el.firstChild

  // ..or the container element?
  // return el
}

export default render
