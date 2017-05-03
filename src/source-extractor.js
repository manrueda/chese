let isBlockArrow = /^\(.*?\)\s*=>\s*{?((.|\s)*)}/m
let expressionArrow = /^\(.*?\)\s*=>\s*((.|\s)*)/m

export default (fn) => {
  const fnStr = fn.toString().trim()
  if (fnStr.startsWith('function')) {
    return fnStr.slice(fnStr.indexOf('{') + 1, fnStr.lastIndexOf('}')).trim()
  } else {
    // Is arrow function
    if (isBlockArrow.test(fnStr)) {
      // Is an arrow function with block
      return fnStr.match(isBlockArrow)[1].trim()
    } else {
      // Is an arrow function with expression
      return fnStr.match(expressionArrow)[1].trim()
    }
  }
}
