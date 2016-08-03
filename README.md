# [idom](https://github.com/eliot-akira/idom)

`idom` is a library for writing **stateless functional view components**, rendered by [Incremental DOM](https://github.com/google/incremental-dom/).

It is based on the same paradigm as React, with:

- In-place diffing instead of virtual DOM
- Only functions for components (no class or state)
- Small size (6kB minified)

## Example

The following assumes the use of Babel and JSX, but they're not required.

**Component**

```js
const Button = ({ action, color }) => {

  let style = { backgroundColor: color }

  return (
    <button onclick={action} style={style}>
      { color }
    </button>
  )
}
```

**Render**

```js
import { render } from 'idom'
import Button from './Button'

const el = document.getElementById('root')

const action = () => {
  const state = '#'+Math.floor(Math.random()*16777215).toString(16)
  render(<Button action={action} color={state} />, el)
}

action()
```

## Methods

### element(tag, props, ...children)

Create a virtual element to be rendered. JSX is compiled to call this method, so there's no need to use it directly. It is similar to `React.createElement` or `h` in hyperscript.

### render(Component, HTMLElement)

Render a functional component to the given DOM element. It is called again with new state to re-render; only the difference will be applied to the DOM.

## Property names

Standard DOM element property names are used, such as `class` and `onclick`.

## Install

```bash
npm install idom --save
```

## Setup

```bash
npm install babel babel-plugin-transform-react-jsx --save-dev
```

In `.babelrc`, add:

```json
"plugins": [
  [
    "transform-react-jsx",
    { "pragma": "idom" }
  ]
]
```

### JSX

JSX used in components are compiled to call `idom`. Use one of the methods below to provide the function.

**Import**

The basic way is to import `idom` at the top of every component.

```js
import idom from 'idom'
```

**Global**

You can import `idom` as a global variable, once at the beginning of the application. Then it is available for all components implicitly.

```js
import 'idom/global'
```

**Webpack**

```js
plugins: [
  new webpack.ProvidePlugin({
    idom: path.resolve('idom')
  })
]
```

---

The implementation/syntax of `idom` is inspired by an article by Brent Jackson: [Universal UI Components](http://jxnblk.com/writing/posts/universal-ui-components/).
