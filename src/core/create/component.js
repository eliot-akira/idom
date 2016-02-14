import { patch } from 'incremental-dom'

function renderComponent( node, renderIdom ) {

  const { tag, attrs = {}, children } = node

  // Pure function
  if ( ! tag.prototype.render ) return renderIdom( tag( attrs, children ) )

  // Class

  let { instance } = node

  if ( ! instance ) {

    // Instantiate once
    instance = node.instance = new tag( attrs, children )

    // Bind all instance methods to keep reference to `this`
    Object.getOwnPropertyNames(tag.prototype).forEach( key => {
      if (typeof instance[key] !== 'function' || key==='constructor') return
      instance[key] = instance[key].bind(instance)
    })

    // Keep internal reference to original render method and attributes
    instance._render = instance.render
    instance._attrs = attrs

    // Wrap instance render method to patch container element
    instance.render = function( newAttrs, ...args ) {

      // Update instance attributes
      for (let key in newAttrs) {
        instance._attrs[key] = newAttrs[key]
      }

      if (instance.beforeRender) instance.beforeRender()
      patch( instance.el.parentElement, instance._render( instance._attrs, ...args ) )
      if (instance.afterRender) instance.afterRender()

      return node
    }

  } else {

    // Already instantiated: update instance attributes
    for (let key in attrs) {
      instance._attrs[key] = attrs[key]
    }
  }

  if (instance.beforeRender) instance.beforeRender()

  node = renderIdom( instance._render( instance._attrs, children ) )
  node.instance = instance
  node.instance.el = node.el

  if (instance.afterRender) instance.afterRender()

  return node
}

export default renderComponent
