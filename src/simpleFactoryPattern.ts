/**
 * Simple Factory Pattern
 *
 * Purpose:
 * Encapsulates the object creation logic to centralize and abstract
 * instantiation details from the client code. This allows for easier
 * maintenance, improved scalability, and separation of concerns.
 *
 * Key Components:
 * - Factory: Provides static methods to create instances based on input.
 * - Product Interface: Defines a common contract for all product types.
 * - Concrete Products: Specific implementations of the product interface.
 */

type CandyType = "sweet" | "spicy";

// PRODUCT INTERFACE
// Defines a common structure for all candy types.
interface ICandy {
    sellCandy: () => string;
}

// CONCRETE PRODUCT: SweetCandy
// Implements the ICandy interface for sweet candy.
class SweetCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a sweet candy`;
    }
}

// CONCRETE PRODUCT: SpicyCandy
// Implements the ICandy interface for spicy candy.
class SpicyCandy implements ICandy {
    sellCandy() {
        return `cooked and sold a spicy candy`;
    }
}

// FACTORY CLASS: candyFactory
// Provides a static method to create and return candy objects
// based on the specified CandyType.
// Hides the creation logic from the client.
class candyFactory {
    static getCandy(candyType: CandyType): ICandy {
        switch (candyType) {
            case "sweet":
                return new SweetCandy();
            case "spicy":
                return new SpicyCandy();
            default:
                throw new Error("Invalid candy type");
        }
    }
}

// CLIENT CODE
// Demonstrates how a client can use the factory to obtain and use a candy object
// without needing to know the details of instantiation.
export default () => {
    const candyStore = candyFactory.getCandy("spicy");
    console.log(candyStore.sellCandy());
}
