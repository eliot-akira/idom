let doc = document

let wrapMap = {
  option: [1, '<select multiple=\'multiple\'>', '</select>'],
  legend: [1, '<fieldset>', '</fieldset>'],
  area: [1, '<map>', '</map>'],
  param: [1, '<object>', '</object>'],
  thead: [1, '<table>', '</table>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  _default: [1, '<div>', '</div>']
}

wrapMap.optgroup = wrapMap.option

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead

wrapMap.th = wrapMap.td

function domCreate(html) {

  let element = doc.createElement('div')
  let match = /<\s*\w.*?>/g.exec(html)

  if (match != null) {
    let tag = match[0].replace(/</g, '').replace(/>/g, '')
    let map = wrapMap[tag] || wrapMap._default
    html = map[1] + html + map[2]
    element.innerHTML = html

    let j = map[0] + 1
    while (j--) {
      element = element.lastChild
    }
  } else {
    element.innerHTML = html
    element = element.lastChild
  }
  return element
}

export default domCreate
