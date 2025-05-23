/**
 * Memento Pattern - Text Editor Example in TypeScript
 * 
 * Components:
 * 1. EditorMemento - Memento object storing state
 * 2. Editor - Originator that creates and restores state
 * 3. History - Caretaker managing saved states
 */

// Memento: stores the state of the Editor
class EditorMemento {
    constructor(public readonly content: string) {}
}

// Originator: the Editor that can save and restore its state
class Editor {
    private content: string = "";

    // Appends text to the editor content
    type(words: string) {
        this.content += words;
    }

    // Returns the current content
    getContent(): string {
        return this.content;
    }

    // Saves the current state in a memento
    save(): EditorMemento {
        return new EditorMemento(this.content);
    }

    // Restores the state from a memento
    restore(memento: EditorMemento) {
        this.content = memento.content;
    }
}

// Caretaker: manages memento history
class Historyy {
    private stack: EditorMemento[] = [];

    // Push a new memento onto the stack
    push(memento: EditorMemento) {
        this.stack.push(memento);
    }

    // Pop the last memento (for undo)
    pop(): EditorMemento | undefined {
        return this.stack.pop();
    }
}


export default () => {

    // === Example Usage ===
    const editor = new Editor();
    const historyy = new Historyy();
    
    editor.type("Hello, ");
    historyy.push(editor.save());  // Save state 1
    
    editor.type("world!");
    historyy.push(editor.save());  // Save state 2
    
    editor.type(" This will be undone.");
    console.log("Before undo:", editor.getContent());  // Output: Hello, world! This will be undone.
    
    editor.restore(historyy.pop()!);  // Undo to state 2
    console.log("After first undo:", editor.getContent());  // Output: Hello, world!
    
    editor.restore(historyy.pop()!);  // Undo to state 1
    console.log("After second undo:", editor.getContent());  // Output: Hello, 
    
}