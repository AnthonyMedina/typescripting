/*
  Implement a generator function that can be used
  to generate numbers in the Fibonacci Sequence
*/

export function* getFibSequence(): IterableIterator<number> {
  let twoAgo = 1;
  let oneAgo = 0;
  while (true) {
    const current = twoAgo + oneAgo;
    yield current;
    twoAgo = oneAgo;
    oneAgo = current;
  }
}
