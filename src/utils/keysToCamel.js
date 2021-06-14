const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  )

const isArray = (a) => {
  return Array.isArray(a)
}

const isObject = (o) => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach((k) => {
      n[snakeToCamel(k)] = keysToCamel(o[k])
    })

    return n
  }

  if (isArray(o)) {
    return o.map(keysToCamel)
  }

  return o
}

export { keysToCamel }
