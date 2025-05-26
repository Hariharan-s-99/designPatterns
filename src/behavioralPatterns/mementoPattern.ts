/**
 * Memento Pattern
 *
 * Purpose:
 * Captures and externalizes an object's internal state so that it can be restored later,
 * without violating encapsulation.
 *
 * Key Components:
 * - Memento: Stores the internal state of the Originator.
 * - Originator: Creates and restores states using Mementos.
 * - Caretaker: Maintains a history of Mementos but never operates on their content.
 */

// -------------------------
// MEMENTO INTERFACE
// -------------------------

/**
 * IEditorMemento: Defines a common interface for Mementos.
 * Only exposes the ability to retrieve saved content.
 */
interface IEditorMemento {
    getContent(): string;
  }
  
  // -------------------------
  // CONCRETE MEMENTO
  // -------------------------
  
  /**
   * ConcreteEditorMemento: Implements the Memento interface.
   * Encapsulates the editor content at a specific point in time.
   */
  class ConcreteEditorMemento implements IEditorMemento {
    constructor(private content: string) {}
  
    getContent(): string {
      return this.content;
    }
  }
  
  // -------------------------
  // ORIGINATOR
  // -------------------------
  
  /**
   * TextEditor: Acts as the Originator.
   * Can modify its content and save/restore it using Mementos.
   */
  class TextEditor {
    constructor(private content: string) {}
  
    /**
     * type: Appends text to the current content.
     * @param text - The string to append to the content.
     */
    type(text: string) {
      this.content += text;
      console.log(`📝 Typed: "${text}"`);
    }
  
    /**
     * getContent: Retrieves the current content of the editor.
     */
    getContent(): string {
      return this.content;
    }
  
    /**
     * save: Captures the current state into a Memento.
     */
    save(): IEditorMemento {
      console.log(`💾 State saved: "${this.content}"`);
      return new ConcreteEditorMemento(this.content);
    }
  
    /**
     * restore: Reverts to a previous state using a Memento.
     * @param editorMemento - The Memento to restore from.
     */
    restore(editorMemento: IEditorMemento) {
      this.content = editorMemento.getContent();
      console.log(`⏪ Restored to: "${this.content}"`);
    }
  }
  
  // -------------------------
  // CARETAKER
  // -------------------------
  
  /**
   * EditorHistory: Acts as the Caretaker.
   * Stores a stack of Mementos for undo operations.
   */
  class EditorHistory {
    private mementos: IEditorMemento[] = [];
  
    /**
     * backup: Saves a new Memento into the history.
     * @param memento - The Memento to store.
     */
    backup(memento: IEditorMemento) {
      this.mementos.push(memento);
      console.log(`📚 Backup added. Total states: ${this.mementos.length}`);
    }
  
    /**
     * undo: Removes and returns the most recent Memento.
     */
    undo(): IEditorMemento | undefined {
      const popped = this.mementos.pop();
      if (popped) {
        console.log(`↩️ Undo performed.`);
      } else {
        console.log(`⚠️ No previous state to undo.`);
      }
      return popped;
    }
  
    /**
     * getMementos: Returns the current list of stored Mementos.
     */
    getMementos(): IEditorMemento[] {
      return this.mementos;
    }
  }
  
  // -------------------------
  // CLIENT CODE (EDITOR DEMO)
  // -------------------------
  
  /**
   * Entry point simulating the use of Memento Pattern.
   * Demonstrates state saving, undo functionality, and restoration.
   */
  export default () => {
    const textEditor = new TextEditor("");
  
    textEditor.type("Hello");
    textEditor.type(" ");
    textEditor.type("world");
  
    const history = new EditorHistory();
    history.backup(textEditor.save()); // Save current state
  
    console.log(`📄 Current content: "${textEditor.getContent()}"`);
  
    textEditor.type("mispelled"); // Simulate a mistake
    console.log(`📄 After typo: "${textEditor.getContent()}"`);
  
    const previousState = history.undo(); // Undo the mistake
    if (previousState) {
      textEditor.restore(previousState);
    }
  
    console.log(`📄 Final content: "${textEditor.getContent()}"`);
  };
  