abstract class Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class ConcreteHandler1 extends Handler {
  handle(request: string): string | null {
    if (request === "request1") {
      return `Handler1: I'll handle ${request}`;
    }
    return super.handle(request);
  }
}

class ConcreteHandler2 extends Handler {
  handle(request: string): string | null {
    if (request === "request2") {
      return `Handler2: I'll handle ${request}`;
    }
    return super.handle(request);
  }
}

export default () => {
  // Usage
  const handler1 = new ConcreteHandler1();
  const handler2 = new ConcreteHandler2();

  handler1.setNext(handler2);
  console.log(handler1.handle("request1")); // Handler1: I'll handle request1
  console.log(handler1.handle("request2")); // Handler2: I'll handle request2
};
