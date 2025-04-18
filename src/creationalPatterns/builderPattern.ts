/**
 * Builder Pattern
 * 
 * Definition:
 * The Builder Pattern is a creational design pattern that allows you to construct complex objects step by step.
 * It separates the construction of an object from its representation so that the same construction process
 * can create different representations.
 *
 * This code demonstrates the Builder Design Pattern to construct a `Car` object step-by-step.
 * It allows flexible and readable object creation, especially useful when the object has many optional properties.
 */

// -------------------------
// PRODUCT: Car
// -------------------------

/**
 * Represents a car with several configurable properties.
 */
class Car {
    modelName: string;
    engineType?: string;
    color?: string;
    wheels?: string;

    /**
     * Creates a new Car with a required model name.
     * @param model - The model name of the car.
     */
    constructor(model: string) {
        this.modelName = model;
    }
}

// -------------------------
// BUILDER INTERFACE
// -------------------------

/**
 * Defines the interface for building a Car.
 */
interface ICarBuilder {
    setEngineType(engineType: string): this;
    setColor(color: string): this;
    setWheels(wheels: string): this;
    build(): Car;
}

// -------------------------
// CONCRETE BUILDER
// -------------------------

/**
 * Implements the Car building process using the Builder Pattern.
 */
class CarBuilder implements ICarBuilder {
    private car: Car;

    /**
     * Initializes a new CarBuilder with a required model name.
     * @param modelName - The model of the car to build.
     */
    constructor(modelName: string) {
        this.car = new Car(modelName);
    }

    /**
     * Sets the engine type of the car.
     * @param engineType - The type of engine (e.g., "V6", "Electric").
     * @returns The builder instance (for method chaining).
     */
    setEngineType(engineType: string) {
        this.car.engineType = engineType;
        return this;
    }

    /**
     * Sets the color of the car.
     * @param color - The color of the car (e.g., "red", "white").
     * @returns The builder instance (for method chaining).
     */
    setColor(color: string) {
        this.car.color = color;
        return this;
    }

    /**
     * Sets the number or type of wheels.
     * @param wheels - Wheel description (e.g., "4", "Alloy").
     * @returns The builder instance (for method chaining).
     */
    setWheels(wheels: string) {
        this.car.wheels = wheels;
        return this;
    }

    /**
     * Returns the fully built Car object.
     * @returns A complete Car instance.
     */
    build() {
        return this.car;
    }
}

// -------------------------
// CLIENT USAGE
// -------------------------

/**
 * Demonstrates how to use the CarBuilder to construct a Car object.
 */
export default () => {
    // Instantiate the CarBuilder with the model name "BMW"
    const car = new CarBuilder("BMW");

    // Configure the car step-by-step using chained methods
    const resultantCar = car
        .setColor("white")
        .setEngineType("V8")
        .setWheels("4")
        .build();

    // Output the constructed Car object
    console.log(resultantCar);
};


// ----------------------------------------------------------------------------------------------
// EXAMPLE 2
// ----------------------------------------------------------------------------------------------

// -------------------------
// PRODUCT INTERFACE
// -------------------------

/**
 * IInvoice: Represents a business invoice with name, product, and feature.
 */
interface IInvoice {
    name: string;
    product: string;
    feature: string;
}

// -------------------------
// INVOICE BUILDER (IMMUTABLE BUILDER)
// -------------------------

/**
 * InvoiceGenerator<T>: Generic builder class for creating an `IInvoice` object.
 * 
 * - Uses Partial<T> to allow progressive building.
 * - Returns a new instance for each method, ensuring immutability.
 * - Final build method only works when all required fields are present.
 */
class InvoiceGenerator<T extends Partial<IInvoice>> {
    // Private constructor to enforce controlled instantiation
    private constructor(private invoice: T) { }

    /**
     * Static factory method to initialize the builder.
     */
    static create() {
        return new InvoiceGenerator({});
    }

    /**
     * Sets the `name` field and returns a new builder instance.
     */
    setName(name: string) {
        return new InvoiceGenerator({ ...this.invoice, name });
    }

    /**
     * Sets the `product` field and returns a new builder instance.
     */
    setProduct(product: string) {
        return new InvoiceGenerator({ ...this.invoice, product });
    }

    /**
     * Sets the `feature` field and returns a new builder instance.
     */
    setFeature(feature: string) {
        return new InvoiceGenerator({ ...this.invoice, feature });
    }

    /**
     * Finalizes and returns the complete invoice object.
     * Ensures type safety by requiring all fields to be present.
     */
    build(this: InvoiceGenerator<IInvoice>) {
        return this.invoice;
    }
}

// -------------------------
// CLIENT CODE (INVOICE CREATION)
// -------------------------

/**
 * Entry point simulating invoice generation.
 * Demonstrates robust builder usage with immutability and type enforcement.
 */
export const builderPattern_2 = () => {
    const invoiceGenerator = InvoiceGenerator.create();

    const resultantInvoice = invoiceGenerator
        .setFeature("AI")
        .setName("QUARTERLY_INVOICE")
        .setProduct("SALES")
        .build();

    console.log(resultantInvoice);
};