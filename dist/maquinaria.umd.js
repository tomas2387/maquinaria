!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).maquinaria={})}(this,function(t){var e=function(t){this.state=t&&"object"==typeof t?t:{};var e=Object.keys(this.state)[0];this.state[e]&&(this.state[e].action(),this.current=e)};e.prototype.transition=function(t){this.state[this.current]&&this.state[this.state[this.current].to[t]]&&(this.state[this.state[this.current].to[t]].action.call(this,Array.prototype.slice.call(arguments).splice(1)),this.current=this.state[this.current].to[t])},t.Maquina=e});