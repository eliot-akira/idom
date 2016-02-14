
# iDom

Modular, smart-rendering views with JSX and incremental DOM

## Use

Require/import the library before any JSX.

```js
import iDom from 'idom'
```

## Example

**Pure function**

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

**Class**

```js
class Counter {

  constructor() {
    this.state = {
      count: 0
    }
  }

  onClick(e) {

    // `this` should point to instance

    this.state.count++    

    // Re-render
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
const app = dom.query('#app')

app.render(<Counter />)
```

## Install

```bash
$ npm install idom --save
```

#### Setup for JSX

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

- Bind event handlers' `this` to component instance
- A way to call render method within component instance
- Unescaped text/HTML in JSX
- Document and test all methods
