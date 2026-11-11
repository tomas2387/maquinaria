export interface State {
  /**
   * Runs when the machine enters this state. Receives the extra arguments
   * passed to `transition` as a single array; the initial state receives none.
   */
  action(args?: unknown[]): void;
  /** Maps transition names to the name of the target state. */
  to: Record<string, string>;
}

export declare class Maquina {
  /** The first state of `stateGraph` is the initial one and runs right away. */
  constructor(stateGraph?: Record<string, State>);
  state: Record<string, State>;
  /** Name of the current state; undefined if the machine has no states. */
  current?: string;
  /** Moves to the state mapped to `toState`, if the current state allows it. */
  transition(toState: string, ...args: unknown[]): void;
}
