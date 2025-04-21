/**
 * Observer Pattern
 *
 * Purpose:
 * Defines a one-to-many dependency between objects so that when one object changes state,
 * all its dependents (observers) are notified and updated automatically.
 *
 * Key Components:
 * - Subject (Publisher): Maintains a list of observers and sends notifications.
 * - Observer (Subscriber): Defines an interface for receiving updates.
 * - Concrete Observers: React to the updates issued by the subject.
 */

// -------------------------
// OBSERVER INTERFACE
// -------------------------

/**
 * ISubscriber: Common interface that all subscribers will implement.
 * Enforces the presence of an `update` method and a `name` property.
 */
interface ISubscriber {
    update(message: string): void;
    name: string;
}

// -------------------------
// SUBJECT (PUBLISHER)
// -------------------------

/**
 * MessageBroker: Acts as the subject or publisher.
 * Maintains a list of subscribers for each topic and notifies them when a message is published.
 */
class MessageBroker {
    private topics: Map<string, Set<ISubscriber>> = new Map();

    /**
     * subscribe: Adds a subscriber to a given topic.
     * Initializes the topic if it doesn't exist yet.
     */
    subscribe(topic: string, subscriber: ISubscriber) {
        if (!this.topics.get(topic)) {
            this.topics.set(topic, new Set());
        }
        this.topics.get(topic)!.add(subscriber);
    }

    /**
     * unsubscribe: Removes a subscriber from a given topic.
     * If the topic doesn't exist, the operation is skipped.
     */
    unsubscribe(topic: string, subscriber: ISubscriber) {
        if (!this.topics.get(topic)) return;
        this.topics.get(topic)!.delete(subscriber);
        console.log(`🔔 ${subscriber.name} has been unsubscribed from topic: ${topic}`);
    }

    /**
     * publish: Sends a message to all subscribers of a given topic.
     * Calls the `update` method on each subscriber.
     */
    publish(topic: string, message: string) {
        this.topics.get(topic)?.forEach((subscriber) => {
            subscriber.update(message);
        });
    }
}

// -------------------------
// CONCRETE OBSERVER
// -------------------------

/**
 * Subscriber: Concrete implementation of ISubscriber.
 * Receives messages and logs them to the console.
 */
class Subscriber implements ISubscriber {
    constructor(public name: string) {}

    update(message: string): void {
        console.log(`📨 ${this.name} received a message → "${message}"`);
    }
}

// -------------------------
// CLIENT CODE (MESSAGE SYSTEM DEMO)
// -------------------------

/**
 * Entry point simulating a basic messaging system.
 * Subscribes users to topics, publishes messages, and handles unsubscriptions.
 * Demonstrates how the publisher can notify multiple observers dynamically.
 */
export default () => {
    const messageBroker = new MessageBroker();

    const subscriber_1 = new Subscriber("subscriber_1");
    const subscriber_2 = new Subscriber("subscriber_2");
    const subscriber_3 = new Subscriber("subscriber_3");

    messageBroker.subscribe("topic_1", subscriber_1);
    messageBroker.subscribe("topic_2", subscriber_2);
    messageBroker.subscribe("topic_2", subscriber_3);

    messageBroker.publish("topic_1", "hola");
    messageBroker.publish("topic_2", "aloh");

    messageBroker.unsubscribe("topic_1", subscriber_1);
    messageBroker.publish("topic_1", "holaaaaaaaaaa");
}
