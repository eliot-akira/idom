import renderIdom from './render-idom'

// JSX is compiled to functions with this signature
function jsxidom( tag, attrs, ...children ) {

  let node = { tag, attrs, children }

  const render = ( newAttrs ) => {

    if ( ! newAttrs ) {

      if (node.instance && node.instance.beforeRender)
        node.instance.beforeRender.apply(node.instance)

      renderIdom( node )

      if (node.instance && node.instance.afterRender)
        node.instance.afterRender.apply(node.instance)

      return node

    } else {

      // Set new attributes to existing render function
      if (newAttrs != '') node.attrs = newAttrs
      return render
    }
  }

  return render
}

export default jsxidom
