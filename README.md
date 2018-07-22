# Maquina
20 lines javascript finite state machine.

## Usage

Call the constructor passing an object with keys as the name of the states. Each action must have two keys: `action` and `to`.

`action` must be a function, and it will be executed whenever we transition to that state.

`to` must be an object, and will have all the available  transitions the state can transition to.

The first state is the initial state and is executed first.

```javascript
var m = new Maquina({
    idle: {
        action: function() {},
        to: {
            click: 'clicked'
        }
    },
    clicked: {
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
In here, the user only can click once in the button, as the `clicked` state does not have any available transitions to another `click` state.

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
- Avoid transient states (like show a message and go back to last state)
- Whenever it seems impossible to add another state to your current machine, maybe its time to add another state machine
