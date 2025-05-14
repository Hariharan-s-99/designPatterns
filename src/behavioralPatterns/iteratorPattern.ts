/**
 * Iterator Pattern
 *
 * Purpose:
 * Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
 *
 * Key Components:
 * - Iterator: Defines the interface for accessing elements.
 * - Concrete Iterator: Implements the iterator interface and maintains the current position.
 * - Iterable Collection: Interface that defines a method to return an iterator.
 * - Concrete Collection: Holds a collection of elements and returns an appropriate iterator.
 */

// -------------------------
// ITERATOR INTERFACE
// -------------------------

/**
 * IIterator<T>: Generic interface representing an iterator over a collection.
 */
interface IIterator<T> {
  /**
   * Determines if the collection has more elements to iterate.
   * @returns {Boolean} True if there are more elements, otherwise false.
   */
  hasNext(): Boolean;

  /**
   * Returns the next element in the collection, or null if no more elements.
   * @returns {T | null} The next element, or null.
   */
  next(): T | null;
}

// -------------------------
// ITERABLE COLLECTION INTERFACE
// -------------------------

/**
 * IIterableCollection<T>: Interface for collections that can return an iterator.
 */
interface IIterableCollection<T> {
  /**
   * Creates and returns an iterator for the collection.
   * @returns {IIterator<T>} An iterator instance.
   */
  createIterator(): IIterator<T>;
}

// -------------------------
// CONCRETE ITERATOR
// -------------------------

/**
 * FunkyNamesIterator<T>: Concrete implementation of IIterator.
 * Iterates over an array of items, maintaining an internal index.
 */
class FunkyNamesIterator<T> implements IIterator<T> {
  private index = 0;

  /**
   * @param collection The array to be iterated.
   */
  constructor(private collection: T[]) {}

  hasNext(): Boolean {
    return this.index < this.collection.length;
  }

  next(): T | null {
    if (this.hasNext()) {
      return this.collection[this.index++];
    } else {
      return null;
    }
  }
}

// -------------------------
// CONCRETE COLLECTION
// -------------------------

/**
 * FunkyNameRepository: Concrete implementation of IIterableCollection.
 * Contains a fixed list of humorous or whimsical names.
 */
class FunkyNameRepository implements IIterableCollection<string> {
  private names: string[] = [
    "💃 DJ Jazzy Jeff",
    "🥒 MC Pickle",
    "🧙‍♂️ Captain Quirk",
    "🌟 Ziggy Stardust",
    "🍭 Lady Lollipop",
    "🎩 Sir Dabs-a-Lot",
    "🐱 Miss MeowMix",
    "🕺 Disco Dave",
    "👑 Queen Beatz",
    "🎤 FunkMaster Flex",
  ];

  /**
   * Returns an iterator for the funky names.
   * @returns {IIterator<string>}
   */
  createIterator(): IIterator<string> {
    return new FunkyNamesIterator(this.names);
  }
}

// -------------------------
// CLIENT CODE (ITERATION DEMO)
// -------------------------

/**
 * Entry point that demonstrates the usage of the iterator pattern.
 * Creates a repository of funky names, iterates over them, and logs each to the console.
 */
export default () => {
  const funkyNameRepository = new FunkyNameRepository();
  const iterator = funkyNameRepository.createIterator();

  while (iterator.hasNext()) {
    console.log(iterator.next());
  }

  // Once done, demonstrate what happens when calling next() again.
  console.log(`Reached the end returning ${iterator.next()}`);
};
