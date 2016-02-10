import iDom from 'incremental-dom'
let { text, elementVoid, elementOpen, elementClose } = iDom

const arraySlice = Array.prototype.slice
const temp = document.createElement('div')

const decodeHTML = (str) => {
  temp.innerHTML = str
  temp.innerHTML
}

const renderIdom = (node) => {

  // Render array
  if (Array.isArray(node)) {
    node.forEach(renderIdom)
    return node
  }

  // Render function: a call to renderIdom
  else if (typeof node === 'function') {
    return node()
  }

  // Render string or number
  else if (typeof node === 'object') {
    node.el = iDOM.text(decodeHTML(node))
    return node
  }

  const tag = node.tag
  const attrs = node.attrs || {}
  const children = node.children

  // Render <Component>
  if (typeof tag === 'function') {

    // Pure function
    if ( ! tag.prototype.render ) {
      node = renderIdom(tag( attrs, children ))
    }

    // Class
    else {

      let instance = node.instance

      // Instantiate class if not already
      if ( ! instance ) {
        instance = node.instance = new tag( attrs, children )
      }

      if (instance.render) {
        node = renderIdom(instance.render( attrs, children ))
        node.instance = instance
      }
    }

    return node
  }

  // Pass to elementVoid/Open: tag, [key,] [attrs]
  let argsArray = [ tag, null, null ]

  // Convert attributes object into flat array
  for (attr in attrs) {

    if ( ! Object.hasOwnProperty(attr, attrs) ) continue

    if (attr === 'key') {
      // Pass key as second argument to elementOpen
      argsArray[1] = attrs[key]
    }
    else {
      argsArray.push(attr)
      argsArray.push(attrs[attr])
    }
  }

  if ( ! children || ! children.length ) {
    node.el = iDOM.elementVoid.apply(null, argsArray)
  }
  else {
    iDOM.elementOpen.apply(null, argsArray)
    children.forEach(renderIdom)
    node.el = iDOM.elementClose(tag)
  }

  return node
}


const jsxidom = (tag, attrs, ...children) => {

  let node = { tag, attrs, children }

  const render = (newAttrs) => {
    // Can be called again with new arguments
    if (typeof newAttrs !== 'undefined') {
      node.attrs = newAttrs
    }
    else {
      // event: before render
      renderIdom(node)
      // event: after after
      if (node.instance && node.instance.rendered) {
        node.instance.rendered.apply(node.instance)
      }
    }

    return render
  }

  return render
}

// transform-react-jsx converts JSX into function calls
export default jsxidom
