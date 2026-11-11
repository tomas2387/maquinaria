# 🎛️ Maquinaria
20 LOC javascript finite state machine.     
Made with TDD, this machine is ready to run in all browsers and environments.

[![Version](https://badgen.net/npm/v/maquinaria)](https://www.npmjs.com/package/maquinaria)
[![CI](https://github.com/tomas2387/maquinaria/actions/workflows/test.yml/badge.svg)](https://github.com/tomas2387/maquinaria/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/tomas2387/maquinaria/badge.svg?branch=master)](https://coveralls.io/github/tomas2387/maquinaria?branch=master)
[![Mutation testing](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Ftomas2387%2Fmaquinaria%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/tomas2387/maquinaria/master)
[![Types](https://badgen.net/npm/types/maquinaria)](https://www.npmjs.com/package/maquinaria)
[![Bundle size](https://deno.bundlejs.com/badge?q=maquinaria)](https://bundlejs.com/?q=maquinaria)
[![License](https://badgen.net/npm/license/maquinaria)](LICENSE)

## Usage

Call the constructor passing an object with keys as the name of the states. Each action must have two keys: `action` and `to`.

`action` must be a function, and it will be executed whenever we transition to that state. It receives the extra arguments passed to `transition` as a single array.

`to` must be an object, and will have all the available  transitions the state can transition to.

The first state is the initial state and is executed first.

```javascript
var m = new Maquina({
    IDLE: {
        action: function() {},
        to: {
            click: 'CLICKED'
        }
    },
    CLICKED: {
        action: function(args) {
            // args is [aBoolean, aNumber, anObject]
            // Here we modify whatever this state should do
        },
        to: {}
    }
})

document.querySelector('button')
.addEventListener('click', function() {
    m.transition('click', true, 2399, {banana: 12})
})
```
In here, the user only can click once in the button, as the `CLICKED` state does not have any available transitions to another `click` state. Therefore we reach the end of the machine.

## Control your transitions

You can play with the transitions making "aliases".   
For example:

```javascript
var buyCoinsMachine = new Maquina({
    idle: {
        action: function() {},
        to: {
            click: 'buy_coins'
        }
    },
    buy_coins: {
        action: function(args) {
            // args is [aBoolean, aNumber, anObject]
            // Here we modify whatever this state should do
        },
        to: {
            click: 'cant_buy_coins_twice'
        }
    },
    cant_buy_coins_twice: {
        action: function(args) {
            var button = args[0]
            // Here we display a message to the user that double clicks are not allowed in this system
            // Or we could disable the button
            button.setAttribute('disabled', 'disabled')
        },
        to: {
        }
    }
})

var button = document.querySelector('button')
button.addEventListener('click', function() {
    buyCoinsMachine.transition('click', button)
})
```
So the user will click the button once, the machine will transition to `buy_coins` state, then the user will click a second time, and it will transition to `cant_buy_coins_twice`, as it is an alias of `click` in the `buy_coins` state.

## TypeScript

Types are included. The `State` type describes each state of the machine:

```ts
import { Maquina, type State } from 'maquinaria';

const clicked: State = {
  action: (args = []) => {
    const [button] = args as [HTMLButtonElement];
    button.setAttribute('disabled', 'disabled');
  },
  to: {},
};

const machine = new Maquina({
  idle: { action: () => {}, to: { click: 'clicked' } },
  clicked,
});

machine.transition('click', document.querySelector('button'));
```

## Tips

- Try to maintain the state machine simple.
- Limit the number of states
- Avoid micro-transient states (like show a message and go back to last state). It's harder to reason about a machine that has many temporal states.
- Whenever it seems impossible to add another state to your current machine, maybe its time to add another simplier state machine.
