import { patch } from 'incremental-dom'

function render( el, fn ) {

  if ( typeof fn === 'function' ) {

    el.renderFn = fn

  // Previously defined
  } else if ( el.renderFn ) {

    // Apply new attributes to render function
    // Empty string to prevent undefined
    el.renderFn = el.renderFn( fn || '' )

  // No render function
  } else return

  patch( el, el.renderFn )

  // The rendered element
  return el.firstChild
}

export default render
