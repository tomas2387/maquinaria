var Maquina = function Maquina(stateGraph) {
  this.state = stateGraph && typeof stateGraph === 'object' ? stateGraph : {};
  var initial = Object.keys(this.state)[0];
  if (this.state[initial]) {
    this.state[initial].action();
    this.current = initial;
  }
};

Maquina.prototype.transition = function transition(toState) {
  if (
    this.state[this.current] &&
    this.state[this.state[this.current].to[toState]]
  ) {
    this.state[this.state[this.current].to[toState]].action.call(
      this,
      Array.prototype.slice.call(arguments).splice(1)
    );
    this.current = this.state[this.current].to[toState];
  }
};

export { Maquina };
