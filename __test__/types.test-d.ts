import { describe, test, expectTypeOf } from 'vitest';
import { Maquina, type State } from '../maquinaria';

describe('maquinaria types', () => {
  test('the constructor accepts a state graph', () => {
    const machine = new Maquina({
      IDLE: { action: () => {}, to: { click: 'CLICKED' } },
      CLICKED: {
        action: (args) => {
          expectTypeOf(args).toEqualTypeOf<unknown[] | undefined>();
        },
        to: {},
      },
    });
    expectTypeOf(machine.current).toEqualTypeOf<string | undefined>();
    expectTypeOf(machine.state).toEqualTypeOf<Record<string, State>>();
    expectTypeOf(new Maquina()).toEqualTypeOf<Maquina>();
  });

  test('transition accepts extra arguments', () => {
    const machine = new Maquina();
    expectTypeOf(machine.transition('click', true, 2399)).toEqualTypeOf<void>();
    // @ts-expect-error the transition name is required
    machine.transition();
  });

  test('a state needs an action and its transitions', () => {
    // @ts-expect-error `to` is required
    new Maquina({ IDLE: { action: () => {} } });
  });
});
