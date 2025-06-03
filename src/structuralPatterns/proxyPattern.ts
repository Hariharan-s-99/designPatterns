/**
 * Proxy Pattern
 * 
 * Purpose:
 * Provides a surrogate or placeholder for another object to control access to it.
 * In this example, a **Virtual Proxy** defers the loading of a RealImage object 
 * until it is actually needed, which is useful when the real object is resource-intensive.
 * 
 * Key Components:
 * - Subject Interface: Declares the common interface for Real and Proxy objects.
 * - Real Subject: The actual object that performs the real operation (e.g., image loading).
 * - Proxy: Controls access to the Real Subject and may instantiate it on demand.
 */

// -------------------------
// SUBJECT INTERFACE
// -------------------------

interface Image {
  display(): void;
}

// -------------------------
// REAL SUBJECT
// -------------------------

class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk(); // Simulate expensive operation
  }

  // Simulates a costly operation like loading a large image file from disk
  private loadFromDisk(): void {
    console.log(`Loading image from disk: ${this.filename}`);
  }

  // Displays the image (assumes it has been loaded)
  public display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }
}

// -------------------------
// PROXY
// -------------------------

class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  // Only loads the real image when needed (lazy initialization)
  public display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// -------------------------
// CLIENT CODE (DEMO)
// -------------------------

export default () => {
  const image = new ProxyImage("sample_photo.jpg");

  console.log("Calling display() for the first time:");
  // Loads the image from disk and then displays it
  image.display();

  console.log("\nCalling display() a second time:");
  // Image is already loaded, so it just displays it
  image.display();
};
