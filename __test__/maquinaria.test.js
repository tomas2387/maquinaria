/* global suite, test */

describe('maquina', () => {
  const { Maquina } = require('../dist/maquinaria.cjs');

  const invalidStateCases = [null, '', 0, true];
  invalidStateCases.forEach(invalidState => {
    test(`WhenCalledWithInvalidState_ShouldSetEmptyState[${invalidState}]`, () => {
      const sut = new Maquina(invalidState); // eslint-disable-line no-new
      expect(sut.state).toEqual({});
    });
  });

  test(`WhenCalledWithEmptyState_ShouldNotFail`, () => {
    new Maquina({}); // eslint-disable-line no-new
  });

  test('WhenCalledWithAnInitialState_ShouldExecuteThatState', () => {
    const idleAction = jest.fn();
    new Maquina({
      // eslint-disable-line no-new
      IDLE: {
        action: idleAction
      }
    });
    expect(idleAction).toHaveBeenCalledTimes(1);
  });

  test('WhenTransitioningToAnotherState_ShouldExecuteTheTransitionedState', () => {
    const winAction = jest.fn();
    const sut = new Maquina({
      DO_SOMETHING: {
        action: function() {},
        to: {
          win: 'WIN'
        }
      },
      WIN: {
        action: winAction
      }
    });
    sut.transition('win');
    expect(winAction).toHaveBeenCalledTimes(1);
  });

  test('WhenInvalidTransitioningState_ShouldNotExecuteTheTransitionedState', () => {
    const winAction = jest.fn();
    const sut = new Maquina({
      DO_NOTHING: {
        action: function() {},
        to: {
          LOSE: 'lose_state'
        }
      },
      WIN: {
        action: winAction
      }
    });
    sut.transition('WIN');
    expect(winAction).not.toHaveBeenCalled();
  });

  test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState', () => {
    const doubleClickAction = jest.fn();
    const sut = new Maquina({
      IDLE: {
        action: function() {},
        to: {
          click: 'CLICK'
        }
      },
      CLICK: {
        action: function() {},
        to: {
          click: 'DOUBLE_CLICK'
        }
      },
      DOUBLE_CLICK: {
        action: doubleClickAction,
        to: {}
      }
    });
    sut.transition('click');
    sut.transition('click');
    expect(doubleClickAction).toHaveBeenCalledTimes(1);
  });

  test('WhenTransitioningToAnotherStateAnotherStateAlias_ShouldExecuteTheTransitionedState', () => {
    const clickAction = jest.fn();
    const sut = new Maquina({
      IDLE: {
        action: function() {},
        to: {
          click: 'CLICK'
        }
      },
      CLICK: {
        action: clickAction,
        to: {}
      }
    });
    sut.transition('click', true, 2399, { banana: 12 });
    expect(clickAction).toHaveBeenNthCalledWith(1, [
      true,
      2399,
      { banana: 12 }
    ]);
  });
});
