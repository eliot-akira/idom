import serialize from './serialize'

let win = window,
    doc = document,
    El = win.HTMLElement.prototype,
    cache = {}

const start = '(?:^|\\s)'
const end = '(?:\\s|$)'

function lookupClass(className) {
  if ( ! typeof cache[className] ) {
    cache[className] = new RegExp(start + className + end, 'g')
  }
  return cache[className]
}

function wrapNode(node) {
  if (typeof node === 'string') {
    return doc.createTextNode(node)
  } else {
    return node
  }
}

function sliceCall(nodeList) {
  return Array.prototype.slice.call(nodeList)
}

const methods = {

  // Query

  query: function(selector) {
    return this.querySelector(selector)
  },

  // Returns a real array instead of node list
  queryAll: function(selector) {
    return sliceCall(this.querySelectorAll(selector))
  },

  each: function(selector, fn) {
    this.queryAll(selector).forEach(fn)
    return this
  },

  // Class

  addClass: function(className) {
    const current = this.className
    if (!current.length) {
      this.className = className
    } else if (!lookupClass(className).test(current)) {
      this.className += ' ' + className
    }
    return this
  },

  removeClass: function(className) {
    this.className = this.className.replace(lookupClass(className), ' ').trim()
    return this
  },

  toggleClass: function(className) {
    if (this.hasClass(className)) {
      this.removeClass(className)
    } else {
      this.addClass(className)
    }
    return this
  },

  hasClass: function(className) {
    return lookupClass(className).test(this.className)
  },

  // Traversal

  matches: El.matches || El.matchesSelector || El.webkitMatchesSelector || El.khtmlMatchesSelector || El.mozMatchesSelector || El.msMatchesSelector || El.oMatchesSelector || function(selector) {
    return (this.parentNode != null) && this.parentNode.queryAll(selector).indexOf(this) >= 0
  },

  closest: function(selector) {
    let parentNode = this
    while (parentNode && parentNode.matches && !parentNode.matches(selector)) {
      parentNode = parentNode.parentNode
    }
    return parentNode
  },

  prepend: function(el) {
    if (this.firstChild) {
      this.insertBefore(wrapNode(el), this.firstChild)
    } else {
      this.appendChild(wrapNode(el))
    }
    return this
  },

  append: function(el) {
    this.appendChild(wrapNode(el))
    return this
  },

  before: function(el) {
    if (this.parentNode) {
      this.parentNode.insertBefore(wrapNode(el), this)
    }
    return this
  },

  after: function(el) {
    if (this.parentNode) {
      if (this.nextSibling != null) {
        this.parentNode.insertBefore(wrapNode(el), this.nextSibling)
      } else {
        this.parentNode.appendChild(node)
      }
    }
    return this
  },

  replaceWith: function(el) {
    if (this.parentNode) {
      this.parentNode.replaceChild(wrapNode(el), this)
    }
    return this
  },

  remove: function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
    return this
  },

  serialize: function() {
    return serialize( this )
  }
}

for (let method in methods) {
  El[method] = methods[method]
}
