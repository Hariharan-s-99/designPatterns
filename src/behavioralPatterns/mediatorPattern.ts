/**
 * Mediator Pattern
 *
 * Purpose:
 * Defines an object (Mediator) that encapsulates how a set of objects interact.
 * Promotes loose coupling by preventing objects from referring to each other explicitly,
 * and lets you alter their interaction independently.
 *
 * Key Components:
 * - Mediator Interface: Declares send and add methods.
 * - Concrete Mediator: Coordinates communication between user objects.
 * - AbstractUser: Base class defining common user behavior.
 * - User: Concrete user class that can send and receive messages via the mediator.
 */

// -------------------------
// MEDIATOR INTERFACE
// -------------------------

/**
 * IMediator: Interface for the mediator.
 * Provides methods to send messages and register users.
 */
interface IMediator {
  sendMessage(message: string, from: AbstractUser, to?: AbstractUser): void;
  addUser(user: AbstractUser): void;
}

// -------------------------
// ABSTRACT USER (COLLEAGUE)
// -------------------------

/**
 * AbstractUser: Base class for users in the chat system.
 * Contains common logic for sending messages and requires `receive` method to be implemented.
 */
abstract class AbstractUser {
  public mediator: IMediator | null = null;

  constructor(public readonly name: string) {}

  /**
   * sendMessage: Sends a message via the mediator.
   * Validates presence of mediator and avoids self-messaging.
   * @param message - The message content to send.
   * @param to - Optional recipient. If omitted, broadcasts to all users.
   */
  sendMessage(message: string, to?: AbstractUser): void {
    if (!this.mediator) {
      console.warn(`[WARN][${this.name}] Tried to send a message but is not registered with a mediator.`);
      return;
    }

    if (to && to.name === this.name) {
      console.warn(`[WARN][${this.name}] Cannot send a message to oneself.`);
      return;
    }

    const toInfo = to ? `→ ${to.name}` : `→ ALL`;
    console.log(`[SEND][${this.name}] ${toInfo}: "${message}"`);
    this.mediator.sendMessage(message, this, to);
  }

  /**
   * receive: Abstract method to handle received messages.
   * Must be implemented by concrete user classes.
   * @param message - The message content received.
   * @param from - The user who sent the message.
   */
  abstract receive(message: string, from: AbstractUser): void;
}

// -------------------------
// CONCRETE USER
// -------------------------

/**
 * User: A concrete implementation of AbstractUser.
 * Implements how a user reacts when receiving a message.
 */
class User extends AbstractUser {
  receive(message: string, from: AbstractUser): void {
    console.log(`[RECEIVE][${this.name}] Message from ${from.name}: "${message}"`);
  }
}

// -------------------------
// CONCRETE MEDIATOR
// -------------------------

/**
 * ChatRoomMediator: Concrete mediator coordinating communication among users.
 * Handles message routing and user registration.
 */
class ChatRoomMediator implements IMediator {
  private users = new Map<string, AbstractUser>();

  /**
   * addUser: Registers a user to the chat room.
   * Associates the mediator with the user and ensures name uniqueness.
   * @param user - The user to register.
   */
  addUser(user: AbstractUser): void {
    const key = user.name.toLowerCase();
    if (this.users.has(key)) {
      console.warn(`[WARN] User "${user.name}" is already in the chat room.`);
      return;
    }

    this.users.set(key, user);
    user.mediator = this;
    console.log(`[INFO] ${user.name} has joined the chat room.`);
  }

  /**
   * sendMessage: Sends a message either to a specific user or to all (broadcast).
   * @param message - The message content.
   * @param from - The sender.
   * @param to - Optional recipient.
   */
  sendMessage(message: string, from: AbstractUser, to?: AbstractUser): void {
    if (to) {
      const receiver = this.users.get(to.name.toLowerCase());
      if (receiver) {
        console.log(`[ROUTE] ${from.name} → ${to.name}`);
        receiver.receive(message, from);
      } else {
        console.error(`[ERROR] User "${to.name}" not found in the chat room.`);
      }
    } else {
      // Broadcast to all users except the sender
      for (const user of this.users.values()) {
        if (user !== from) {
          user.receive(message, from);
        }
      }
    }
  }
}

// -------------------------
// CLIENT CODE (CHATROOM DEMO)
// -------------------------

/**
 * Entry point simulating a simple chatroom system.
 * Users are registered with the mediator and exchange messages through it.
 */
export default () => {
  const mediator = new ChatRoomMediator();

  const bob = new User("Bob");
  const alice = new User("Alice");
  const mike = new User("Mike");

  mediator.addUser(bob);
  mediator.addUser(alice);
  mediator.addUser(mike);

  bob.sendMessage("Hi Alice!", alice);
  alice.sendMessage("Hey Bob, how are you?", bob);
  mike.sendMessage("Hi everyone!"); // broadcast
  bob.sendMessage("Just a note to myself.", bob); // should warn
};
