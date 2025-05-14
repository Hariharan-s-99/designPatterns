// Custom iterator interface to avoid conflict with built-in Iterator
interface MyIterator<T> {
    hasNext(): boolean;
    next(): T;
  }
  
  // Collection interface to avoid conflict with built-in Iterable
  interface IterableCollection<T> {
    createIterator(): MyIterator<T>;
  }
  
  // Concrete iterator implementation
  class ArrayIterator<T> implements MyIterator<T> {
    private collection: T[];
    private position: number = 0;
    
    constructor(collection: T[]) {
      this.collection = collection;
    }
    
    public hasNext(): boolean {
      return this.position < this.collection.length;
    }
    
    public next(): T {
      return this.collection[this.position++];
    }
  }
  
  // Concrete collection
  class NumberCollection implements IterableCollection<number> {
    private items: number[] = [];
    
    constructor(items: number[]) {
      this.items = items;
    }
    
    public createIterator(): MyIterator<number> {
      return new ArrayIterator<number>(this.items);
    }
  }
  
  // Client code
  export default () => {
    // Create a collection with some numbers
    const numbers = new NumberCollection([1, 2, 3, 4, 5]);
    
    // Get iterator from the collection
    const iterator = numbers.createIterator();
    
    // Use the iterator to go through all items
    console.log("Iterating through numbers:");
    while (iterator.hasNext()) {
      console.log(iterator.next());
    }
  }
  