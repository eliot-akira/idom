
const excluded = ['file', 'reset', 'submit', 'button']

const isExcluded = (type) => excluded.indexOf(type) >= 0

const serializeForm = (form) => {

  let obj = {}

  if (typeof form !== 'object' || form.nodeName !== 'FORM') {
    return obj;
  }

  for (let i = 0, eLen = form.elements.length; i < eLen; i++) {

    let el = form.elements[i]

    if ( !el.name || el.disabled || isExcluded(el.type) ) continue

    if (el.type === 'select-multiple') {

      for (let j = 0, oLen = el.options.length; j < oLen; j++) {

        let option = el.options[j]

        if ( ! obj[el.name] ) obj[el.name] = []

        if (option.selected) {
          obj[el.name].push(option.value)
        }
      }

    } else if (el.type === 'checkbox') {

      if ( ! obj[el.name] ) obj[el.name] = []

      if (el.checked) {
        obj[el.name].push(el.value)
      }

    } else if (el.type !== 'radio' || el.checked) {

      obj[el.name] = el.value
    }
  }

  return obj
}

export default serializeForm
