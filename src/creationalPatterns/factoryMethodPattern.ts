/**
 * Factory Method Pattern
 *
 * Purpose:
 * Defines an interface for creating an object
 * Provides a way to delegate the instantiation logic to subclasses.
 *
 * Key Components:
 * - Product Interface: Defines a common interface for all products.
 * - Concrete Products: Implementations of the product interface.
 * - Factory Interface: Declares the method for creating a product.
 * - Concrete Factories: Override the factory method to instantiate specific products.
 */

// -------------------------
// PRODUCT INTERFACE
// -------------------------

/**
 * ICandy: Common interface that all candy types will implement.
 * Enforces the presence of a `sellCandy` method.
 */
interface ICandy {
    sellCandy: () => string;
}

// -------------------------
// FACTORY INTERFACE
// -------------------------

/**
 * ICandyFactory: Declares the `createCandy` method that returns an ICandy.
 * Allows factories to produce candy objects without specifying exact class names.
 */
interface ICandyFactory {
    createCandy(): ICandy;
}

// -------------------------
// CONCRETE PRODUCTS
// -------------------------

/**
 * SweetCandy: Concrete implementation of ICandy.
 * Represents a sweet variant of candy.
 */
class SweetCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a sweet candy`;
    }
}

/**
 * SpicyCandy: Concrete implementation of ICandy.
 * Represents a spicy variant of candy.
 */
class SpicyCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a spicy candy`;
    }
}

// -------------------------
// CONCRETE FACTORIES
// -------------------------

/**
 * SpicyCandyFactory: Creates instances of SpicyCandy.
 * Implements the factory method from ICandyFactory.
 */
class SpicyCandyFactory implements ICandyFactory {
    createCandy(): ICandy {
        return new SpicyCandy();
    }
}

/**
 * SweetCandyFactory: Creates instances of SweetCandy.
 * Implements the factory method from ICandyFactory.
 */
class SweetCandyFactory implements ICandyFactory {
    createCandy(): ICandy {
        return new SweetCandy();
    }
}

// -------------------------
// CLIENT CODE (CANDY STORE)
// -------------------------

/**
 * Entry point simulating a candy store.
 * Uses a specific factory (e.g., SpicyCandyFactory) to create and sell candy.
 * Demonstrates how the client can use factories without knowing the exact product classes.
 */
export default () => {
    const candyStore = new SpicyCandyFactory(); // Can easily switch to SweetCandyFactory
    console.log(candyStore.createCandy().sellCandy()); // Output: cooked and sold a spicy candy
}
