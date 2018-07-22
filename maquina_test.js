
suite('maquina', () => {
    const {Maquina} = require('./maquina.js')
    const {assert} = require('chai')
    const {spy} = require('sinon')

    test('WhenCalledWithAnInitialState_ShouldExecuteThatState',  () => {
        const idleAction = spy()
        sut = new Maquina({
            idle: {
                action: idleAction,
            }
        })
        assert.deepEqual(true, idleAction.calledOnce)
    })
    
    test('WhenTransitioningToAnotherState_ShouldExecuteTheTransitionedState',  () => {
        const idleAction = spy()
        sut = new Maquina({
            do_something: {
                action: function() {},
                to: {
                    win_state: 'win_state'
                }
            },
            win_state: {
                action: idleAction,
            }
        })
        sut.transition('win_state')
        assert.deepEqual(true, idleAction.calledOnce)
    })

    test('WhenInvalidTransitioningState_ShouldNotExecuteTheTransitionedState',  () => {
        const idleAction = spy()
        sut = new Maquina({
            do_nothing: {
                action: function() {},
                to: {
                    lose_state: 'lose_state'
                }
            },
            win_state: {
                action: idleAction,
            }
        })
        sut.transition('win_state')
        assert.deepEqual(false, idleAction.calledOnce)
    })

    
    test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState',  () => {
        const idleAction = spy()
        sut = new Maquina({
            idle: {
                action: function() {},
                to: {
                    click: 'click'
                }
            },
            click: {
                action: function() {},
                to: {
                    click: 'double_click'
                }
            },
            double_click: {
                action: idleAction,
                to: {}
            }
        })
        sut.transition('click')
        sut.transition('click')
        assert.deepEqual(true, idleAction.calledOnce)
    })

    test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState',  () => {
        const idleAction = spy()
        sut = new Maquina({
            idle: {
                action: function() {},
                to: {
                    click: 'click'
                }
            },
            click: {
                action: idleAction,
                to: {}
            }
        })
        sut.transition('click', true, 2399, {banana: 12})
        assert.deepEqual([true, 2399, {banana:12}], idleAction.firstCall.args[0])
    })

    
})