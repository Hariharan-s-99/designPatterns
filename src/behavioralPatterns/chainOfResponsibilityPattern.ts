/**
 * Chain of Responsibility Pattern
 *
 * Purpose:
 * Allows a request to be passed along a chain of handlers. Each handler decides whether
 * to process the request or pass it to the next handler in the chain.
 *
 * Key Components:
 * - Handler Interface: Declares a method for handling requests and setting the next handler.
 * - Abstract Handler: Implements default chaining behavior and delegates unhandled requests.
 * - Concrete Handlers: Implement specific logic to process certain types of requests.
 */

// -------------------------
// HANDLER TYPE DEFINITION
// -------------------------

/**
 * HandlerType: Enum-like type representing different content formats
 * the chain is expected to process.
 */
type HandlerType = "PDF" | "CSV" | "TEXT";

// -------------------------
// HANDLER INTERFACE
// -------------------------

/**
 * IHandler: Defines the interface for all handlers in the chain.
 * Enforces methods to set the next handler and to process a request.
 */
interface IHandler {
  setNext(nextHandler: IHandler): IHandler;
  handle(type: HandlerType): void;
}

// -------------------------
// ABSTRACT BASE HANDLER
// -------------------------

/**
 * AbstractHandler: Base class that implements default chaining behavior.
 * Stores a reference to the next handler and delegates the request if unhandled.
 */
abstract class AbstractHandler implements IHandler {
  private nextHandler: IHandler | null = null;

  /**
   * setNext: Assigns the next handler in the chain.
   * Allows method chaining by returning the passed handler.
   */
  setNext(nextHandler: IHandler): IHandler {
    this.nextHandler = nextHandler;
    return nextHandler;
  }

  /**
   * handle: Default behavior that delegates the request to the next handler, if any.
   */
  handle(type: HandlerType): void {
    this.nextHandler?.handle(type);
  }
}

// -------------------------
// CONCRETE HANDLERS
// -------------------------

/**
 * PDFHandler: Handles requests of type "PDF".
 * If the type doesn't match, delegates the request to the next handler.
 */
class PDFHandler extends AbstractHandler {
  handle(type: HandlerType): void {
    if (type === "PDF") {
      console.log("📄 Handling PDF");
    } else {
      super.handle(type);
    }
  }
}

/**
 * TextHandler: Handles requests of type "TEXT".
 * If the type doesn't match, delegates the request to the next handler.
 */
class TextHandler extends AbstractHandler {
  handle(type: HandlerType): void {
    if (type === "TEXT") {
      console.log("📝 Handling TEXT");
    } else {
      super.handle(type);
    }
  }
}

/**
 * CSVHandler: Handles requests of type "CSV".
 * If the type doesn't match, delegates the request to the next handler.
 */
class CSVHandler extends AbstractHandler {
  handle(type: HandlerType): void {
    if (type === "CSV") {
      console.log("📊 Handling CSV");
    } else {
      super.handle(type);
    }
  }
}

// -------------------------
// CLIENT CODE (CHAIN DEMO)
// -------------------------

/**
 * Entry point that sets up a chain of handlers and dispatches requests.
 * Demonstrates how each handler checks the type and either processes or forwards the request.
 */
export default function runChainOfResponsibilityDemo(): void {
  const pdfHandler = new PDFHandler();
  const textHandler = new TextHandler();
  const csvHandler = new CSVHandler();

  // Build the chain: PDF -> TEXT -> CSV
  pdfHandler.setNext(textHandler).setNext(csvHandler);

  // Dispatch different types to see how the chain handles them
  pdfHandler.handle("CSV"); // 📊 Handling CSV
  pdfHandler.handle("PDF"); // 📄 Handling PDF
  pdfHandler.handle("TEXT"); // 📝 Handling TEXT
}
