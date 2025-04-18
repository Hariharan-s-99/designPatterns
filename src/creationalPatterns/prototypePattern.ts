/**
 * Prototype Design Pattern
 *
 * Definition:
 * The Prototype Design Pattern is a creational pattern that specifies the kinds of objects 
 * to create using a prototypical instance, and creates new objects by copying this prototype.
 *
 * Purpose:
 * Allows objects to be cloned, creating new instances without knowing their exact classes.
 * Useful when object creation is expensive or complex.
 *
 * Key Components:
 * - Prototype Interface: Declares the clone method.
 * - Concrete Prototype: Implements the clone method to return a copy of itself.
 * - Client: Clones the prototype instead of creating a new object from scratch.
 */

// -------------------------
// PROTOTYPE INTERFACE
// -------------------------

/**
 * IPrototype: Interface that declares the `clone` method.
 * Ensures all implementing classes can produce a copy of themselves.
 */
interface IPrototype {
    clone(): IPrototype;
}

// -------------------------
// CONCRETE PROTOTYPE
// -------------------------

/**
 * Library: Concrete implementation of IPrototype.
 * Represents a library with a name and a list of books.
 * Implements the `clone` method to return a deep copy of itself.
 */
class Library implements IPrototype {
    constructor(private name: string, public books: String[]) { }

    /**
     * clone: Creates a shallow copy of the Library instance.
     * Uses the spread operator to ensure the books array is not shared.
     */
    clone() {
        return new Library(this.name, [...this.books]);
    }

    /**
     * getBooks: Returns a comma-separated string of book titles.
     */
    getBooks() {
        return this.books.join(",");
    }
}

// -------------------------
// CLIENT CODE (LIBRARY CLONING)
// -------------------------

/**
 * Entry point demonstrating the prototype pattern.
 * Clones a library and modifies the clone's book list.
 * Shows that the original library remains unaffected.
 */
export default () => {
    const commonLibrary = new Library("dev", ["designPatterns", "systemDesigns", "dsa"]);
    const modernLibrary = commonLibrary.clone();
    modernLibrary.books.push("dbms");

    console.log("commonLibrary books =>", commonLibrary.getBooks());
    console.log("modernLibrary books =>", modernLibrary.getBooks());
};
