interface IStack<T> {
  push(item: T): IStack<T>;
  push(items: T[]): IStack<T>;
  pop(): T | undefined;
  length(): number;
  print(): void;
}

interface IStackNode<T> {
  data: T;
  next: IStackNode<T>;
}

export default class Stack<T> implements IStack<T> {
  private head: IStackNode<T> | undefined;

  push(item: T): IStack<T>;
  push(items: T[]): IStack<T>;
  push(itemOrArray: T | T[]): IStack<T> {
    if (itemOrArray instanceof Array) {
      itemOrArray.forEach(item => this.push(item));
    } else {
      const node = {
        data: itemOrArray,
        next: this.head
      };
      this.head = node as IStackNode<T>;
    }
    return this;
  }

  pop(): T | undefined {
    const node = this.head;
    if (!node) return undefined;
    this.head = node.next;
    return node.data;
  }

  length(): number {
    let node = this.head;
    let length = 0;
    while (node) {
      length++;
      node = node.next;
    }
    return length;
  }

  print(): void {
    let node = this.head;
    while (node) {
      node = node.next;
    }
  }
}
