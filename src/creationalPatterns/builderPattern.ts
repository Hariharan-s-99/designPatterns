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
