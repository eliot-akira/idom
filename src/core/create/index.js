import renderIdom from './idom'

// JSX is compiled to functions with this signature
function create( tag, attrs, ...children ) {

  let node = { tag, attrs, children }

  const render = ( newAttrs ) => {

    if ( typeof newAttrs === 'undefined' ) return renderIdom( node )

    // Set new attributes
    if (newAttrs != '') node.attrs = newAttrs
    return render
  }

  return render
}

export default create
