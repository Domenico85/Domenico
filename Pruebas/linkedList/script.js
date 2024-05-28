class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.headNode === null) {
      this.headNode = newNode;
      return;
    }

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }

  size() {
    let count = 0;
    let current = this.headNode;
    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  head() {
    return this.headNode;
  }

  tail() {
    if (this.headNode === null) return null;

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    let count = 0;
    let current = this.headNode;
    while (current !== null && count < index) {
      current = current.nextNode;
      count++;
    }
    return current;
  }

  pop() {
    if (this.headNode === null) return null;

    if (this.headNode.nextNode === null) {
      const poppedNode = this.headNode;
      this.headNode = null;
      return poppedNode;
    }

    let current = this.headNode;
    while (current.nextNode.nextNode !== null) {
      current = current.nextNode;
    }
    const poppedNode = current.nextNode;
    current.nextNode = null;
    return poppedNode;
  }

  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      current = current.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let result = "";
    let current = this.headNode;
    while (current !== null) {
      result += `(${current.value}) -> `;
      current = current.nextNode;
    }
    return result + "null";
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const previousNode = this.at(index - 1);
    if (previousNode === null) return;

    const newNode = new Node(value, previousNode.nextNode);
    previousNode.nextNode = newNode;
  }

  removeAt(index) {
    if (index === 0 && this.headNode !== null) {
      this.headNode = this.headNode.nextNode;
      return;
    }

    const previousNode = this.at(index - 1);
    if (previousNode === null || previousNode.nextNode === null) return;

    previousNode.nextNode = previousNode.nextNode.nextNode;
  }
}

const list = new LinkedList();

list.append(10);
list.append(20);
list.prepend(5);
console.log(list.toString()); // ( 5 ) -> ( 10 ) -> ( 20 ) -> null

console.log(list.size()); // 3
console.log(list.head().value); // 5
console.log(list.tail().value); // 20
console.log(list.at(1).value); // 10
console.log(list.contains(10)); // true
console.log(list.find(20)); // 2

list.pop();
console.log(list.toString()); // ( 5 ) -> ( 10 ) -> null

list.insertAt(15, 1);
console.log(list.toString()); // ( 5 ) -> ( 15 ) -> ( 10 ) -> null

list.removeAt(1);
console.log(list.toString()); // ( 5 ) -> ( 10 ) -> null
