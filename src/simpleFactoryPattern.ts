/**
 * Simple Factory Pattern
 *
 * Creates objects without exposing the instantiation logic.
 * Centralizes object creation in a single factory class.
 * Client code requests objects by providing a type parameter.
 *
 * Components:
 * - Factory: Central class with static creation methods
 * - Product Interface: Common interface or abstract class for all products
 * - Concrete Products: Specific implementations created by the factory
 */

type CandyType = "sweet" | "spicy";

interface ICandy {
    sellCandy: () => string;
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

//FACTORY CLASS
class candyFactory {
    static getCandy(candyType: CandyType) {
        switch (candyType) {
            case "sweet":
                return new SweetCandy();
            case "spicy":
                return new SpicyCandy();
            default:
                throw new Error("Invalid candy type")
        }
    }
}

//CLIENT STORE
export default () => {
    const candyStore = candyFactory.getCandy("spicy");
    console.log(candyStore.sellCandy())
}