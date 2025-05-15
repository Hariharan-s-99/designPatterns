// Colleague interface
interface User {
  name: string;
  chatRoom: ChatRoomMediator;
  send(message: string, to: string): void;
  receive(message: string, from: string): void;
}

// Concrete Colleague
class ChatUser implements User {
  name: string;
  chatRoom: ChatRoomMediator;

  constructor(name: string, mediator: ChatRoomMediator) {
    this.name = name;
    this.chatRoom = mediator;
  }

  send(message: string, to: string): void {
    console.log(`${this.name} sending message: "${message}" to ${to}`);
    this.chatRoom.sendMessage(message, this.name, to);
  }

  receive(message: string, from: string): void {
    console.log(`${this.name} received message: "${message}" from ${from}`);
  }
}

// Mediator interface
interface ChatRoomMediator {
  sendMessage(message: string, user: string, to: string): void;
  addUser(user: User): void;
}

// Concrete Mediator
class ChatRoom implements ChatRoomMediator {
  users: { [key: string]: User } = {};

  addUser(user: User): void {
    this.users[user.name] = user;
  }

  sendMessage(message: string, from: string, to: string): void {
    const receiver = this.users[to];
    if (receiver) {
      receiver.receive(message, from);
    } else {
      console.log(`${to} is not in the chat room.`);
    }
  }
}

export default () => {
  const mediator = new ChatRoom();

  const john = new ChatUser("John", mediator);
  const jane = new ChatUser("Jane", mediator);
  const peter = new ChatUser("Peter", mediator);

  mediator.addUser(john);
  mediator.addUser(jane);
  mediator.addUser(peter);

  john.send("Hello Jane!", "Jane");
  jane.send("Hi John, how are you?", "John");
  peter.send("Anyone there?", "All"); // Peter doesn't know everyone, relies on the mediator
};
