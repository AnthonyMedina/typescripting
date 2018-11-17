import { getFibSequence } from '../src/fib';

describe('fib.js#getFibSequence basic cases', () => {
  test('getFibSequence() returns an iterator', () => {
    expect(typeof getFibSequence()).toBe('object');
    expect(Object.keys(getFibSequence())).toMatchObject([
      'next',
      'throw',
      'return'
    ]);
  });
  test('getFibSequence() first number -> 1', () => {
    let it = getFibSequence();
    expect(it.next().value).toBe(1);
  });
  test('getFibSequence() -> 2nd number -> 1', () => {
    let it = getFibSequence();
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(1);
  });
  test('getFibSequence() -> 3rd number -> 2', () => {
    let it = getFibSequence();
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(2);
  });
  test('getFibSequence() -> 4th number -> 3', () => {
    let it = getFibSequence();
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(2);
    expect(it.next().value).toBe(3);
  });
  test('getFibSequence() -> 5th number -> 5', () => {
    let it = getFibSequence();

    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(1);
    expect(it.next().value).toBe(2);
    expect(it.next().value).toBe(3);
    expect(it.next().value).toBe(5);
  });
});
