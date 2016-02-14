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

Standard HTML attributes are used, including events. Call the *render* method to render itself.

#### Using the component

```js
import 'idom'
import Button from 'button'

const app = document.body.querySelector('#app')

app.render( <Button /> )
```

The library is imported before any JSX.

Component names begin with an uppercase letter.

A *render* method is provided to HTML elements. It can be called more than once, with new components or attributes.

### Pure function

A component as a pure function has no instance or state.

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

- Document and test all methods
