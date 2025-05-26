/**
 * Template Method Pattern
 *
 * Purpose:
 * Defines the skeleton of an algorithm in a base class, allowing subclasses to redefine
 * specific steps without changing the overall structure of the algorithm.
 *
 * Key Components:
 * - Abstract Class (Template): Defines the template method and fixed steps.
 * - Concrete Subclasses: Implement the variable parts of the algorithm.
 * - Hook Methods: Optional steps that can be overridden by subclasses.
 */

// -------------------------
// TEMPLATE ABSTRACT CLASS
// -------------------------

/**
 * BeverageMaker: Abstract class that defines the template for preparing a beverage.
 * Implements the invariant steps and provides hooks for subclass customization.
 */
abstract class BeverageMaker {
    /**
     * makeBeverage: The template method that defines the sequence of steps.
     * This method is final — subclasses cannot change the sequence.
     */
    public makeBeverage(): void {
        this.boilWater();       // Step 1: Boil water (common to all beverages)
        this.brew();            // Step 2: Brew (abstract - defined by subclass)
        this.pourInCup();       // Step 3: Pour into cup (common to all beverages)
        this.addCondiments();   // Step 4: Add optional condiments (hook method)
    }

    /**
     * boilWater: Boils water — a common step for all beverages.
     */
    private boilWater(): void {
        console.log("Boiling water");
    }

    /**
     * pourInCup: Pours the beverage into a cup — a shared step.
     */
    protected pourInCup(): void {
        console.log("Pouring into cup");
    }

    /**
     * brew: Abstract method that must be implemented by subclasses to define
     * how the beverage is brewed.
     */
    protected abstract brew(): void;

    /**
     * addCondiments: Hook method for adding condiments like sugar, milk, lemon, etc.
     * Subclasses may override this to customize behavior, or leave it as-is to skip.
     */
    protected addCondiments(): void {
        // Optional step — no condiments by default
    }
}

// -------------------------
// CONCRETE CLASS
// -------------------------

/**
 * CoffeeMaker: Concrete implementation of BeverageMaker for coffee.
 * Defines how to brew coffee and optionally adds condiments (e.g., choco chips).
 */
class CoffeeMaker extends BeverageMaker {
    /**
     * brew: Specific brewing logic for coffee.
     */
    protected brew(): void {
        console.log("Brewing coffee");
    }

    /**
     * addCondiments: Adds optional condiments specific to coffee.
     */
    protected addCondiments(): void {
        console.log("Adding choco chips");
    }
}

// -------------------------
// CLIENT CODE (COFFEE DEMO)
// -------------------------

/**
 * Entry point that demonstrates the beverage preparation process.
 * Uses the CoffeeMaker to create a drink with predefined steps and optional customization.
 */
export default () => {
    const coffeeMaker = new CoffeeMaker();
    coffeeMaker.makeBeverage();
};
