import { text } from 'incremental-dom'

const temp = document.createElement('div')

function renderText( node ) {
  temp.innerHTML = node
  return {
    el: text( temp.innerHTML )
  }
}

export default renderText
