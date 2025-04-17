/**
 * Factory Method Pattern
 *
 * Defines an interface for creating an object, but allows subclasses
 * to decide which class to instantiate.
 *
 * Components:
 * - Product Interface: Common interface for all products
 * - Concrete Products: Specific implementations of the product
 * - Factory Interface: Declares the factory method
 * - Concrete Factories: Implement the factory method to return specific products
 */


// PRODUCT INTERFACE
interface ICandy {
    sellCandy: () => string;
}

// FACTORY INTERFACE
interface ICandyFactory {
    createCandy(): ICandy;
}

//CONCRETE CLASS
class SweetCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a sweet candy`
    }
}

//CONCRETE CLASS
class SpicyCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a spicy candy`
    }
}

// CONCRETE FACTORIES
class SpicyCandyFactory implements ICandyFactory {
    createCandy(): ICandy {
        return new SpicyCandy();
    }
}

// CONCRETE FACTORIES
class SweetCandyFactory implements ICandyFactory {
    createCandy(): ICandy {
        return new SweetCandy();
    }
}

//CLIENT STORE
export default () => {
    const candyStore = new SpicyCandyFactory();
    console.log(candyStore.createCandy().sellCandy())

}