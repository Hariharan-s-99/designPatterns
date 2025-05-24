// 1. Memento: Represents the saved state of the Originator
interface EditorMemento {
    getContent(): string;
    // Potentially add metadata like timestamp, name, etc.
    getName(): string;
    getDate(): string;
}

// Concrete Memento implementation
class ConcreteEditorMemento implements EditorMemento {
    private readonly state: string;
    private readonly date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getContent(): string {
        return this.state;
    }

    public getName(): string {
        return `${this.date} / (${this.state.substring(0, 15)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

// 2. Originator: The object whose state needs to be saved
class TextEditor {
    private content: string;

    constructor(initialContent: string = "") {
        this.content = initialContent;
        console.log(`Editor: Initial content is: "${this.content}"`);
    }

    public type(text: string): void {
        this.content += text;
        console.log(`Editor: Appended "${text}". Current content: "${this.content}"`);
    }

    public getContent(): string {
        return this.content;
    }

    // Creates a Memento to save the current state
    public save(): EditorMemento {
        console.log('Editor: Saving current state...');
        return new ConcreteEditorMemento(this.content);
    }

    // Restores the state from a given Memento
    public restore(memento: EditorMemento): void {
        this.content = memento.getContent();
        console.log(`Editor: Restored state to: "${this.content}"`);
    }
}

// 3. Caretaker: Manages and stores Memento objects
class HistoryManager {
    private mementos: EditorMemento[] = [];
    private editor: TextEditor;

    constructor(editor: TextEditor) {
        this.editor = editor;
    }

    public backup(): void {
        console.log('\nHistoryManager: Saving editor\'s state...');
        this.mementos.push(this.editor.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            console.log('HistoryManager: No previous states to restore.');
            return;
        }

        const memento = this.mementos.pop();
        if (memento) {
            console.log(`HistoryManager: Restoring state to: "${memento.getName()}"`);
            this.editor.restore(memento);
        }
    }

    public showHistory(): void {
        console.log('\nHistoryManager: Here\'s the history:');
        for (const memento of this.mementos) {
            console.log(`- ${memento.getName()}`);
        }
    }
}


export default () => {

// Client Code
const editor = new TextEditor();
const historyManager = new HistoryManager(editor);

historyManager.backup(); // Save initial empty state
editor.type("Hello, ");

historyManager.backup(); // Save "Hello, " state
editor.type("world!");

historyManager.backup(); // Save "Hello, world!" state
editor.type(" How are you?");

console.log(`\nFinal content: "${editor.getContent()}"`);

historyManager.showHistory();

console.log('\nClient: Now, let\'s undo some changes!');
historyManager.undo(); // Undo " How are you?"
console.log(`Current content after undo: "${editor.getContent()}"`);

historyManager.undo(); // Undo "world!"
console.log(`Current content after undo: "${editor.getContent()}"`);

historyManager.undo(); // Undo "Hello, "
console.log(`Current content after undo: "${editor.getContent()}"`);

historyManager.undo(); // Try to undo more

}
