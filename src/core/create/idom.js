import renderText from './text'
import renderComponent from './component'
import renderTag from './tag'

function renderIdom( node ) {

  // Multiple root nodes
  if (Array.isArray(node)) {
    node.forEach( renderIdom )
    return node
  }

  // Compiled JSX
  if (typeof node === 'function') return node()

  // String or number
  if (typeof node !== 'object') return renderText( node )

  // <Component>
  if (typeof node.tag === 'function') return renderComponent( node, renderIdom )

  // <tag>
  return renderTag( node, renderIdom )
}

export default renderIdom
