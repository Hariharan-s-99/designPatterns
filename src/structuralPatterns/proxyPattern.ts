/**
 * Proxy Pattern in TypeScript
 * 
 * This example demonstrates a Virtual Proxy that defers the loading of a real image
 * object until it is actually needed.
 */

// Step 1: Define the Subject Interface
interface Image {
    display(): void;
  }
  
  // Step 2: Real Subject - The actual object that performs the work
  class RealImage implements Image {
    private filename: string;
  
    constructor(filename: string) {
      this.filename = filename;
      this.loadFromDisk(); // Simulate a costly operation
    }
  
    private loadFromDisk(): void {
      console.log(`Loading image from disk: ${this.filename}`);
    }
  
    public display(): void {
      console.log(`Displaying image: ${this.filename}`);
    }
  }
  
  // Step 3: Proxy - A substitute that controls access to the RealImage
  class ProxyImage implements Image {
    private realImage: RealImage | null = null;
  
    constructor(private filename: string) {}
  
    public display(): void {
      // Lazy initialization: instantiate RealImage only when needed
      if (!this.realImage) {
        this.realImage = new RealImage(this.filename);
      }
      this.realImage.display();
    }
  }
  
  // Step 4: Client Code - Uses the proxy instead of accessing RealImage directly
  export default () => {
    const image = new ProxyImage("sample_photo.jpg");
  
    console.log("Image proxy created.");
  
    // RealImage is not loaded until display() is called
    image.display(); // Loads and displays the image
    image.display(); // Only displays (image already loaded)
  }
  
  