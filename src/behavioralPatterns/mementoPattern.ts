interface IEditorMemento {
  getContent(): string;
}

class ConcreteEditorMemento implements IEditorMemento {
  constructor(private content: string) {}
  getContent(): string {
    return this.content;
  }
}

class TextEditor {
  constructor(private content: string) {}
  type(text: string) {
    this.content += text;
  }
  getContent() {
    return this.content;
  }
  save() {
    return new ConcreteEditorMemento(this.content);
  }
  restore(editorMemento: IEditorMemento) {
    this.content = editorMemento.getContent();
  }
}

class EditorHistory {
  private mementos: IEditorMemento[] = [];

  backup(memento: IEditorMemento) {
    this.mementos.push(memento);
  }
  undo(memento: IEditorMemento) {
    return this.mementos.pop();
  }
}

export default () => {
  const textEditor = new TextEditor("");
  textEditor.type("Hello");
  textEditor.type(" ");
  textEditor.type("world");
  const history = new EditorHistory();
  history.backup(textEditor);
  console.log(textEditor.getContent());
  textEditor.type("mispelled");
  const previousState = history.undo(textEditor);
  if (previousState) {
    textEditor.restore(previousState);
  }
  console.log(textEditor.getContent());
};
