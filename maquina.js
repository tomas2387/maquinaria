(function (exports) {
  var Maquina = function Maquina (stateGraph) {
    this.state = stateGraph
    var initial = Object.keys(stateGraph)[0]
    if (this.state[initial]) {
      this.state[initial].action()
      this.current = initial
    }
  }

  Maquina.prototype.transition = function transition (toState) {
    if (this.state[this.current] &&
            this.state[this.state[this.current].to[toState]]
    ) {
      this.state[this.state[this.current].to[toState]].action.call(
        this,
        Array.prototype.slice.call(arguments).splice(1)
      )
      this.current = toState
    } else {
      console.warn('No transition from state ' + this.current + ' to state ' + toState)
    }
  }
  exports.Maquina = Maquina
})(typeof module === 'object' ? module.exports : window)
