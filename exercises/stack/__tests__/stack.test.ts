import Stack from '../src/stack';

test('new stack has size of 0', () => {
  const l = new Stack();
  expect(l.length()).toBe(0);
});

test('pushing an item to the stack increases its size by 1', () => {
  const l = new Stack<string>();
  l.push('abc');
  expect(l.length()).toBe(1);
});

test('pushing a few items to the stack (one-by-one) increases its size appropriately', () => {
  const l = new Stack<string>();
  l.push('abc');
  l.push('abc');
  l.push('abc');
  l.push('abc');
  expect(l.length()).toBe(4);
});

test('pushing a few items to the stack (at once) increases its size appropriately', () => {
  const l = new Stack<string>();
  l.push(['abc', 'def', 'ghi', 'jkl']);
  expect(l.length()).toBe(4);
});

test('pushing a few items to the stack (at once) increases its size appropriately', () => {
  const l = new Stack<string>();
  l.push(['abc', 'def', 'ghi', 'jkl']);
  expect(l.length()).toBe(4);
});

test('last items pushed on are the first to pop off', () => {
  const l = new Stack<string>();
  l.push(['abc', 'def', 'ghi', 'jkl']);
  const last = l.pop();
  expect(l.length()).toBe(3);
  expect(last).toBe('jkl');
});

test('pop() returns undefined if the list is empty', () => {
  const l = new Stack<string>();
  const last = l.pop();
  expect(last).toBeUndefined();
});
