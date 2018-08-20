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
      IDLE: {
        action: idleAction
      }
    })
    assert.deepEqual(true, idleAction.calledOnce)
  })

  test('WhenTransitioningToAnotherState_ShouldExecuteTheTransitionedState', () => {
    const winAction = spy()
    const sut = new Maquina({
      DO_SOMETHING: {
        action: function () {},
        to: {
          win: 'WIN'
        }
      },
      WIN: {
        action: winAction
      }
    })
    sut.transition('win')
    assert.deepEqual(true, winAction.calledOnce)
  })

  test('WhenInvalidTransitioningState_ShouldNotExecuteTheTransitionedState', () => {
    const winAction = spy()
    const sut = new Maquina({
      DO_NOTHING: {
        action: function () {},
        to: {
          LOSE: 'lose_state'
        }
      },
      WIN: {
        action: winAction
      }
    })
    sut.transition('WIN')
    assert.deepEqual(false, winAction.calledOnce)
  })

  test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState', () => {
    const doubleClickAction = spy()
    const sut = new Maquina({
      IDLE: {
        action: function () {},
        to: {
          click: 'CLICK'
        }
      },
      CLICK: {
        action: function () {},
        to: {
          click: 'DOUBLE_CLICK'
        }
      },
      DOUBLE_CLICK: {
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
      IDLE: {
        action: function () {},
        to: {
          click: 'CLICK'
        }
      },
      CLICK: {
        action: clickAction,
        to: {}
      }
    })
    sut.transition('click', true, 2399, {banana: 12})
    assert.deepEqual([true, 2399, {banana: 12}], clickAction.firstCall.args[0])
  })
})
