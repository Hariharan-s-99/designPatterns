interface Visitable {
  accept(visitor: Visitor): void;
  getContent(): void;
}
interface Visitor {
  visit(visitable: Visitable): void;
}

//CONCRETE VISITABLE
class TextDocument implements Visitable {
  constructor(private content: string) {
    this.content = content;
  }
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
  getContent() {
    return this.content;
  }
}

//CONCRETE VISITOR
class PdfExportor implements Visitor {
  visit(visitable: Visitable): void {
    console.log(`Exporting the text into PDF --> ${visitable.getContent()}`);
  }
}

//CONCRETE VISITOR
class HtmlExporter implements Visitor {
  visit(visitable: Visitable): void {
    console.log(`Exporting the text into HTML --> ${visitable.getContent()}`);
  }
}

export default () => {
  const textDocument = new TextDocument("this is a text document");
  const pdfExporter = new PdfExportor();
  const htmlExporter = new HtmlExporter();
  textDocument.accept(pdfExporter);
  textDocument.accept(htmlExporter);
};
