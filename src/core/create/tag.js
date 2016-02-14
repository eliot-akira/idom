import { elementOpen, elementClose, elementVoid } from 'incremental-dom'

function renderTag( node, renderIdom ) {

  const { tag, attrs = {}, children } = node

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

    node.el = elementVoid.apply( null, argsArray )

  } else {

    elementOpen.apply( null, argsArray )

    children.forEach( renderIdom )

    node.el = elementClose( tag )
  }

  // If component instance, store reference to element
  if ( node.instance )
    node.instance.el = node.el

  return node
}

export default renderTag
