/**
 * Singleton Pattern:
 * A design pattern that ensures a class has only one instance
 * and provides a global point of access to that instance.
 * 
 * Common use cases: configuration managers, loggers, database connections, etc.
 */

// Singleton class definition
class Singleton {
    // Static property to hold the single shared instance
    private static singletonInstance?: Singleton;

    // Tracks how many times a connection has been established
    private connectionCount = 0;

    // Private constructor to prevent direct instantiation from outside
    private constructor() { }

    // Public static method to get the single instance of the class
    static getInstance() {
        // Create the instance if it doesn't exist
        if (!this.singletonInstance) this.singletonInstance = new Singleton();
        return this.singletonInstance;
    }

    // Simulates establishing a new connection
    establishConnection() {
        this.connectionCount++;
    }

    // Returns the current number of established connections
    getConnectionCount() {
        return this.connectionCount;
    }
}

// Function to demonstrate Singleton behavior
export default () => {
    // Get the Singleton instance (first reference)
    const singletonInstance_1 = Singleton.getInstance();

    // Get the Singleton instance again (same instance)
    const singletonInstance_2 = Singleton.getInstance();

    // Check connection count before establishing any connections
    console.log(singletonInstance_1.getConnectionCount());

    // Establish connections through the first reference
    singletonInstance_1.establishConnection();
    console.log(singletonInstance_1.getConnectionCount());
    singletonInstance_1.establishConnection();
    console.log(singletonInstance_1.getConnectionCount());

    console.log("---------------");

    // Connection count remains shared across all references
    console.log(singletonInstance_2.getConnectionCount());
    singletonInstance_2.establishConnection();
    console.log(singletonInstance_2.getConnectionCount());
    singletonInstance_2.establishConnection();
    console.log(singletonInstance_2.getConnectionCount());
}
