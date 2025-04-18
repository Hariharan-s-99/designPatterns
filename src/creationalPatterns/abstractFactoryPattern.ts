/**
 * Abstract Factory Pattern - Candy & Wrapper Set
 *
 * This implementation demonstrates the Abstract Factory Design Pattern by modeling
 * a system for creating sets of related products: Candy and their corresponding Wrappers.
 * 
 * Purpose:
 * - Provide an interface for creating families of related objects.
 *
 * Components:
 * - Product Interfaces: ICandy, IWrapper
 * - Concrete Products: SweetCandy, SpicyCandy, SweetWrapper, SpicyWrapper
 * - Abstract Factory: ICandySetFactory
 * - Concrete Factories: SweetCandySetFactory, SpicyCandySetFactory
 * - Client: Demonstrates how to use the factories to create product families
 */


// ========== PRODUCT INTERFACES ==========

// Interface for Candy product
interface ICandy {
    cookCandy: () => string;
}

// Interface for Wrapper product
interface Iwrapper {
    wrap: () => string;
}


// ========== CONCRETE PRODUCTS ==========

// Concrete implementation of a sweet candy
class sweetCandy implements ICandy {
    cookCandy() {
        return "Cooked sweet candy";
    }
}

// Concrete implementation of a spicy candy
class spicyCandy implements ICandy {
    cookCandy() {
        return "Cooked spicy candy";
    }
}

// Concrete implementation of a sweet-style wrapper
class sweetWrapper implements Iwrapper {
    wrap() {
        return "🎀 Wrapped in a cute, pink wrapper.";
    }
}

// Concrete implementation of a spicy-style wrapper
class SpicyWrapper implements Iwrapper {
    wrap() {
        return "🔥 Wrapped in a bold, red wrapper.";
    }
}


// ========== ABSTRACT FACTORY INTERFACE ==========

// Abstract factory interface to produce a candy and its wrapper
interface IcandySetFactory {
    cookCandy: () => string;
    wrap: () => string;
}


// ========== CONCRETE FACTORIES ==========

// Factory that produces a sweet candy and its matching wrapper
class SweetCandySetFactiory implements IcandySetFactory {
    cookCandy() {
        return new sweetCandy().cookCandy();
    }
    wrap() {
        return new sweetWrapper().wrap();
    }
}

// Factory that produces a spicy candy and its matching wrapper
class SpicyCandySetFactiory implements IcandySetFactory {
    cookCandy() {
        return new spicyCandy().cookCandy();
    }
    wrap() {
        return new SpicyWrapper().wrap();
    }
}


// ========== CLIENT CODE ==========

// Example usage of the abstract factories to create related products
export default () => {
    const spicyCandyFactory = new SpicyCandySetFactiory();
    const sweetCandyFactory = new SweetCandySetFactiory();

    // Produce and display spicy candy set
    console.log(spicyCandyFactory.cookCandy());
    console.log(spicyCandyFactory.wrap());

    // Produce and display sweet candy set
    console.log(sweetCandyFactory.cookCandy());
    console.log(sweetCandyFactory.wrap());
}
