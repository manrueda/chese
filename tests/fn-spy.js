module.exports = function (fn) {
  return new Spy(fn)
}

function Spy (fn) {
  const that = this
  that.calls = 0
  that.inject = function () {
    that.calls++
    if (fn) {
      return fn.apply(this, arguments)
    } else {
      return arguments
    }
  }
}
