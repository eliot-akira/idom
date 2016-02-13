
const temp = document.createElement('div')

function decodeHTML( str ) {
  temp.innerHTML = str
  return temp.innerHTML
}

export default decodeHTML
