import { describe, test, expect, vi } from 'vitest';
import { createRequire } from 'node:module';
import { Maquina as EsmMaquina } from '../dist/maquinaria.esm.js';

const require = createRequire(import.meta.url);

describe('published bundles', () => {
  test.each([
    ['require (package main, CJS)', () => require('..').Maquina],
    ['UMD', () => require('../dist/maquinaria.umd.js').Maquina],
    ['ESM', () => EsmMaquina],
  ])('%s exposes a working machine', (_, load) => {
    const Maquina = load();
    const winAction = vi.fn();
    const sut = new Maquina({
      IDLE: { action: () => {}, to: { win: 'WIN' } },
      WIN: { action: winAction },
    });
    sut.transition('win', 1);
    expect(winAction).toHaveBeenCalledWith([1]);
    expect(sut.current).toBe('WIN');
  });
});
