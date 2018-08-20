# 🎛️ Maquina
20 LOC javascript finite state machine.     
Made with TDD, this machine is ready to run in all browsers and environments.

[![Build Status](https://travis-ci.org/tomas2387/maquina.svg?branch=master)](https://travis-ci.org/tomas2387/maquina)
[![Coverage Status](https://coveralls.io/repos/github/tomas2387/maquina/badge.svg?branch=master)](https://coveralls.io/github/tomas2387/maquina?branch=master)
[![dependencies Status](https://david-dm.org/tomas2387/maquina/status.svg)](https://david-dm.org/tomas2387/maquina)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standastanrdjs.com)   

## Usage

Call the constructor passing an object with keys as the name of the states. Each action must have two keys: `action` and `to`.

`action` must be a function, and it will be executed whenever we transition to that state.

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
        action: function(aBoolean, aNumber, anObject) {
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
        action: function(aBoolean, aNumber, anObject) {
            // Here we modify whatever this state should do
        },
        to: {
            click: 'cant_buy_coins_twice'
        }
    },
    cant_buy_coins_twice: {
        action: function(button) {
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

## Tips

- Try to maintain the state machine simple.
- Limit the number of states
- Avoid micro-transient states (like show a message and go back to last state). It's harder to reason about a machine that has many temporal states.
- Whenever it seems impossible to add another state to your current machine, maybe its time to add another simplier state machine.
