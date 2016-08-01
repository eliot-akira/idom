import { elementOpen, elementClose, text, patch } from 'incremental-dom'

// JSX is compiled to use this function
function element(tag, props, ...children) {

  // Render/patch calls the result to create elements
  return () => (create({ tag, props, children }))
}

function create(node) {

  if (!node) return

  let nodeType = typeof node

  if (nodeType === 'function') return node()
  if (Array.isArray(node)) return node.forEach(create)
  if (nodeType === 'string' || nodeType === 'number') return text(node)

  let { tag, props, children } = node

  if (!tag) return
  props = props || {}
  children = children || []

  if (typeof tag === 'function') return tag(props, children)()

  // Prepare arguments
  // (See: http://google.github.io/incremental-dom/#api/elementOpen)
  let args = [tag, null, null]

  for (let key in props) {
    if (key==='key') {
      args[1] = props.key
      delete props.key
    }
    args.push(key)
    args.push(props[key])
  }

  elementOpen.apply(null, args)
  children.forEach(create)
  elementClose(tag)
}

element.render = (fn, el) => (patch(el, fn))

module.exports = element