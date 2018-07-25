/* global suite, test */

suite('maquina', () => {
  const {Maquina} = require('../maquina.js')
  const {assert} = require('chai')
  const {spy} = require('sinon')

  const invalidStateCases = [null, '', 0, true]
  invalidStateCases.forEach(invalidState => {
    test(`WhenCalledWithInvalidState_ShouldSetEmptyState[${invalidState}]`, () => {
      const sut = new Maquina(invalidState) // eslint-disable-line no-new
      assert.deepEqual(sut.state, {})
    })
  })

  test(`WhenCalledWithEmptyState_ShouldNotFail`, () => {
    new Maquina({}) // eslint-disable-line no-new
  })

  test('WhenCalledWithAnInitialState_ShouldExecuteThatState', () => {
    const idleAction = spy()
    new Maquina({ // eslint-disable-line no-new
      idle: {
        action: idleAction
      }
    })
    assert.deepEqual(true, idleAction.calledOnce)
  })

  test('WhenTransitioningToAnotherState_ShouldExecuteTheTransitionedState', () => {
    const winAction = spy()
    const sut = new Maquina({
      do_something: {
        action: function () {},
        to: {
          win_state: 'win_state'
        }
      },
      win_state: {
        action: winAction
      }
    })
    sut.transition('win_state')
    assert.deepEqual(true, winAction.calledOnce)
  })

  test('WhenInvalidTransitioningState_ShouldNotExecuteTheTransitionedState', () => {
    const winAction = spy()
    const sut = new Maquina({
      do_nothing: {
        action: function () {},
        to: {
          lose_state: 'lose_state'
        }
      },
      win_state: {
        action: winAction
      }
    })
    sut.transition('win_state')
    assert.deepEqual(false, winAction.calledOnce)
  })

  test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState', () => {
    const doubleClickAction = spy()
    const sut = new Maquina({
      idle: {
        action: function () {},
        to: {
          click: 'click'
        }
      },
      click: {
        action: function () {},
        to: {
          click: 'double_click'
        }
      },
      double_click: {
        action: doubleClickAction,
        to: {}
      }
    })
    sut.transition('click')
    sut.transition('click')
    assert.deepEqual(true, doubleClickAction.calledOnce)
  })

  test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState', () => {
    const clickAction = spy()
    const sut = new Maquina({
      idle: {
        action: function () {},
        to: {
          click: 'click'
        }
      },
      click: {
        action: clickAction,
        to: {}
      }
    })
    sut.transition('click', true, 2399, {banana: 12})
    assert.deepEqual([true, 2399, {banana: 12}], clickAction.firstCall.args[0])
  })
})
