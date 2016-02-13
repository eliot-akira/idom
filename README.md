
# iDom

Modular, smart-rendering views with JSX and incremental DOM

## Install

```bash
$ npm install idom --save
```

#### Setup for JSX

```bash
$ npm install babel babel-plugin-transform-react-jsx --save-dev
```

In *.babelrc*

```json
"plugins": [
  ["transform-react-jsx", { "pragma": "iDom.create" }]
]
```

## Use

The library must be loaded before any JSX.

```js
import iDom from 'idom'
```

**Example component: pure function**

```js
const Button = (props) => {

  let butonClass = 'btn'

  buttonClass += ` btn-${ props.type || 'default' }`

  if (props.class) buttonClass += ` ${props.class}`

  return (
    <button class={buttonClass} onclick={ props.click }>
      { props.text }
    </button>    
  )
}
```

**Example component: class**

```js
class Counter {

  constructor() {
    this.state = {
      count: 0
    }
  }

  onClick() {

    // `this` should point to instance

    this.state.count++    

    // Render
  }

  render( props ) {
    return (
      <div class="counter">{ this.state.count }</div>
      <Button click={ this.onClick }>
        Click here
      </Button>
    )    
  }
}
```

**Render**

```js
const app = dom.query('#.app')

app.render(<Counter />)
```
