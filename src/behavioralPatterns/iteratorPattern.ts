// Custom iterator interface to avoid conflict with built-in Iterator
// Defines a generic interface for iterating over a collection of type T
interface MyIterator<T> {
    hasNext(): boolean; // Checks if the collection has more elements
    next(): T;          // Retrieves the next element in the collection
  }
  
  // Collection interface to avoid conflict with built-in Iterable
  // Represents a collection that can produce an iterator
  interface IterableCollection<T> {
    createIterator(): MyIterator<T>; // Factory method to create an iterator
  }
  
  // Concrete iterator implementation for array-like collections
  class ArrayIterator<T> implements MyIterator<T> {
    private collection: T[];
    private position: number = 0;
  
    constructor(collection: T[]) {
      this.collection = collection;
    }
  
    // Returns true if there are more elements to iterate over
    public hasNext(): boolean {
      return this.position < this.collection.length;
    }
  
    // Returns the next element and advances the iterator
    public next(): T {
      return this.collection[this.position++];
    }
  }
  
  // Concrete collection class for numbers
  // Implements the IterableCollection interface using a number array
  class NumberCollection implements IterableCollection<number> {
    private items: number[] = [];
  
    constructor(items: number[]) {
      this.items = items;
    }
  
    // Returns an iterator to traverse the number collection
    public createIterator(): MyIterator<number> {
      return new ArrayIterator<number>(this.items);
    }
  }
  
  // Client code demonstrating use of the iterator
  export default () => {
    // Create a collection with some numbers
    const numbers = new NumberCollection([1, 2, 3, 4, 5]);
  
    // Get an iterator from the collection
    const iterator = numbers.createIterator();
  
    // Use the iterator to go through all items in the collection
    console.log("Iterating through numbers:");
    while (iterator.hasNext()) {
      console.log(iterator.next());
    }
  };
  