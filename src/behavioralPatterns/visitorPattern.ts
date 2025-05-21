/**
 * Visitor Pattern
 *
 * Purpose:
 * Allows you to add new operations to existing object structures without modifying the structures.
 * It decouples the operations from the objects on which they operate.
 *
 * Key Components:
 * - Visitable (Element): Defines an `accept` method that accepts a visitor.
 * - Visitor: Declares a `visit` operation for each Visitable type.
 * - Concrete Visitors: Implement operations to be performed on the elements.
 * - Concrete Visitable: Accepts a visitor and allows it to operate on itself.
 */

// -------------------------
// VISITABLE INTERFACE
// -------------------------

/**
 * Visitable: Interface for elements that can be visited by a Visitor.
 * Enforces the presence of the `accept` method and a `getContent` method.
 */
interface Visitable {
    accept(visitor: Visitor): void;
    getContent(): string;
  }
  
  // -------------------------
  // VISITOR INTERFACE
  // -------------------------
  
  /**
   * Visitor: Interface that defines a visit operation for a Visitable element.
   * Allows implementing different actions on visitable elements without changing their structure.
   */
  interface Visitor {
    visit(visitable: Visitable): void;
  }
  
  // -------------------------
  // CONCRETE VISITABLE
  // -------------------------
  
  /**
   * TextDocument: Concrete implementation of Visitable.
   * Represents a document with textual content and supports visitors to operate on it.
   */
  class TextDocument implements Visitable {
    constructor(private content: string) {}
  
    accept(visitor: Visitor): void {
      console.log(`📄 TextDocument is accepting a visitor: ${visitor.constructor.name}`);
      visitor.visit(this);
    }
  
    getContent(): string {
      return this.content;
    }
  }
  
  // -------------------------
  // CONCRETE VISITORS
  // -------------------------
  
  /**
   * PdfExporter: Concrete Visitor.
   * Exports the content of the document to a PDF format.
   */
  class PdfExporter implements Visitor {
    visit(visitable: Visitable): void {
      console.log(`📤 Exporting to PDF...`);
      console.log(`📝 Content: "${visitable.getContent()}"`);
      console.log(`✅ Export successful! 🧾📄`);
    }
  }
  
  /**
   * HtmlExporter: Concrete Visitor.
   * Exports the content of the document to an HTML format.
   */
  class HtmlExporter implements Visitor {
    visit(visitable: Visitable): void {
      console.log(`🌍 Exporting to HTML...`);
      console.log(`📝 Content: "${visitable.getContent()}"`);
      console.log(`✅ Export complete! 🖥️📄`);
    }
  }
  
  // -------------------------
  // CLIENT CODE (DEMO)
  // -------------------------
  
  /**
   * Entry point demonstrating the Visitor Pattern in action.
   * Creates a TextDocument and applies different visitors (PDF, HTML).
   */
  export default () => {
    const textDocument = new TextDocument("🗒️Text document contains information about design patterns.");
  
    const pdfExporter = new PdfExporter();
    const htmlExporter = new HtmlExporter();
  
    textDocument.accept(pdfExporter);
    console.log("\n----------------------------\n");
    textDocument.accept(htmlExporter);
  
  };
  