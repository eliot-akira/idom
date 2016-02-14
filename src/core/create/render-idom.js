import { text, elementVoid, elementOpen, elementClose } from 'incremental-dom'

import decodeHTML from './decode-html'

function renderIdom( node ) {

  // Multiple root nodes
  if (Array.isArray(node)) {

    node.forEach(renderIdom)
    return node

  // Compiled JSX
  } else if (typeof node === 'function') {

    return node()

  // String or number
  } else if (typeof node !== 'object') {

    return { el: text( decodeHTML(node) ) }
  }

  const tag = node.tag
  const attrs = node.attrs || {}
  const children = node.children

  // <Component>
  if (typeof tag === 'function') {

    // Class
    if ( tag.prototype.render ) {

      let instance = node.instance

      // Instantiate once
      if ( ! instance )
        instance = node.instance = new tag( attrs, children )

      node = renderIdom( instance.render( attrs, children ) )

      node.instance = instance
      node.instance.el = node.el

    // Pure function
    } else {
      node = renderIdom( tag( attrs, children ) )
    }

    return node
  }

  // Arguments to elementVoid/elementOpen: tag, key, attrs
  let argsArray = [ tag, null, null ]

  // Convert attributes object into flat array: [ key, value, ... ]
  for (let attr in attrs) {

    if ( ! attrs.hasOwnProperty(attr) ) continue

    if (attr === 'key') {

      // Pass key as second argument to elementOpen
      argsArray[1] = attrs[key]

    } else {
      argsArray.push( attr )
      argsArray.push( attrs[attr] )
    }
  }

  if ( ! children || ! children.length ) {

    node.el = elementVoid.apply(null, argsArray)

  } else {
    elementOpen.apply(null, argsArray)
    children.forEach( renderIdom )
    node.el = elementClose(tag)
  }

  // If component instance, store reference to element
  if (node.instance)
    node.instance.el = node.el

  return node
}

export default renderIdom
