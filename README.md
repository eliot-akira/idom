# iDom

Modular, smart-rendering views with JSX and incremental DOM

## Example

### Class

```js
class Button {

  constructor() {
    this.count = 0
  }

  onClick( event ) {
    this.count++
    this.render()
  }

  render( props ) {
    return (
      <button type="button" class="btn" onclick={ this.onClick }>
        { this.count }
      </button>
    )
  }
}

export default Button
```

**Render**

A component class must provide a render method that returns JSX. Standard HTML attributes are used, including events. Call the *render* method to re-render with current state.

**Events**

Event handlers will have `this` bound to the component instance, not the element.

#### Using the component

The library is imported before any JSX.

```js
import 'idom'
```

Component names begin with an uppercase letter.

```js
import Button from 'button'
```

An HTML element is provided with a *render* method, which will render JSX passed to it.

```js
const app = document.body.querySelector('#app')

app.render( <Button /> )
```

This creates a new instance of the component class.

**Props/attributes**

Attributes on a component will be passed as an object to the render method.

```js
app.render(<Button key=value />)
```

To set new attributes on an existing component instance, call the render method again with an object.

```js
app.render({
  key: newValue
})
```

### Pure function

A component as a pure function is just the render method, with no state.

```js
const Button = ( props ) => {
  return (
    <button onclick={ props.click }>
      { props.count }
    </button>
  )
}
```

To use it:

```js
let count = 0

const click = () => {
  count++
  app.render({ count })
}

app.render( <Button { count, click } /> )
```

## Install

```bash
$ npm install idom --save
```

#### Compiling JSX

Dev dependencies

```bash
$ npm install babel babel-plugin-transform-react-jsx --save-dev
```

In *.babelrc*

```json
"plugins": [
  ["transform-react-jsx", { "pragma": "iDom.create" }]
]
```


## TODO

- Tests
