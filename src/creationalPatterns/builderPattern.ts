/**
 * Builder Pattern
 *
 * Definition:
 * The Builder Pattern is a creational design pattern that allows the step-by-step
 * construction of complex objects. It separates the construction process from the final
 * representation, enabling the same construction process to create different representations.
 *
 * Purpose:
 * Separates the construction of a complex object from its representation.
 * Allows step-by-step construction of different representations using the same building process.
 *
 * Key Components:
 * - Product: The complex object under construction.
 * - Builder Interface (implicitly used): Methods to construct parts of the product.
 * - Concrete Builder: Provides implementation for builder methods and tracks the construction process.
 * - Director (optional): Directs the building process.
 */

// -------------------------
// PRODUCT TYPES
// -------------------------

/**
 * Address: Represents the address details of a user.
 */
type Address = {
    street: string;
    doorNo: number;
    city: string;
}

/**
 * User: Represents a user with personal and address details.
 */
type User = {
    name: string;
    age: number;
    address: Address;
}

// -------------------------
// USER BUILDER (CONCRETE BUILDER)
// -------------------------

/**
 * buildUser: Constructs a User object step-by-step.
 * Uses method chaining for fluent interface design.
 */
class buildUser {
    private user: Partial<User>; // Partially constructed User object

    constructor() {
        this.user = {};
    }

    /**
     * Sets the user's name.
     */
    setName(name: string) {
        this.user.name = name;
        return this;
    }

    /**
     * Sets the user's age.
     */
    setAge(age: number) {
        this.user.age = age;
        return this;
    }

    /**
     * Sets the user's address.
     */
    setAddress(address: Address) {
        this.user.address = address;
        return this;
    }

    /**
     * Finalizes and returns the constructed User object.
     */
    build() {
        return this.user;
    }
}

// -------------------------
// ADDRESS BUILDER (CONCRETE BUILDER)
// -------------------------

/**
 * addressBuilder: Constructs an Address object with the given parameters.
 */
class addressBuilder {
    private address: Partial<Address>; // Partially constructed Address object

    constructor() {
        this.address = {};
    }

    /**
     * Builds and returns a complete Address object.
     */
    build(city: string, doorNo: number, street: string) {
        this.address.city = city;
        this.address.doorNo = doorNo;
        this.address.street = street;
        return this.address as Address;
    }
}

// -------------------------
// CLIENT CODE (USER CREATOR)
// -------------------------

/**
 * Entry point simulating a user creation scenario.
 * Demonstrates how builders can be used to incrementally construct objects.
 */
export default () => {
    const address = new addressBuilder();
    const user = new buildUser();

    const resultantUser = user
        .setName("user1")
        .setAddress(address.build("chennai", 10, "dev 1st street"))
        .setAge(25)
        .build();

    console.log(resultantUser);
};


// ----------------------------------------------------------------------------------------------
// EXAMPLE 2
// ----------------------------------------------------------------------------------------------

/**
 * Builder Pattern (Robust Implementation with Immutable Builders)
 *
 * Definition:
 * The Builder Pattern allows the step-by-step construction of a complex object using
 * chained methods. This version ensures immutability by returning a new builder instance
 * with every method call, which makes it safer and more predictable in multi-step construction.
 *
 * Purpose:
 * - Provides a flexible and readable way to construct complex objects.
 * - Enhances safety and immutability by using a new instance for each chained call.
 *
 * Key Components:
 * - Product: The complex object under construction (`IInvoice`).
 * - Builder: Contains methods to incrementally build up the object.
 * - Immutable Steps: Each setter returns a new builder instance to avoid side effects.
 */

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