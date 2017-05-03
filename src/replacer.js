export default (code, replaces) => {
  replaces = replaces || {}
  for (let t in replaces) {
    let val = replaces[t]
    val = typeof val === 'string' ? `\`${val.split('`').join('\\`')}\`` : val
    val = typeof val === 'undefined' ? `undefined` : val
    val = typeof val === 'boolean' ? `${val}` : val
    val = typeof val === 'object' ? `${JSON.stringify(val)}` : val
    code = code.split(t).join(val)
  }
  return code
}
