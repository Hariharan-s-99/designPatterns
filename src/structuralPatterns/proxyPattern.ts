/**
 * Proxy Pattern
 *
 * Purpose:
 * Provides a surrogate or placeholder for another object to control access to it.
 * Often used for lazy initialization, access control, logging, or caching.
 *
 * Key Components:
 * - Subject (CDN): Provides actual resource retrieval methods.
 * - Proxy (ProxyServer): Adds caching and logging behavior, controlling access to the CDN.
 * - Client: Requests resources through the proxy as if it's the actual CDN.
 */

// -------------------------
// SUBJECT: CDN SERVICE
// -------------------------

/**
 * Cdn: The real service that retrieves various types of resources.
 * Simulates fetching HTML, CSS, and JS content.
 */
class Cdn {
  retriveHtml(fileName: string): string {
    return `📄 Sending HTML for file: ${fileName}`;
  }

  retriveCss(fileName: string): string {
    return `🎨 Sending CSS for file: ${fileName}`;
  }

  retriveJs(fileName: string): string {
    return `📜 Sending JS for file: ${fileName}`;
  }
}

// -------------------------
// PROXY: CACHING AND LOGGING WRAPPER
// -------------------------

/**
 * ProxyServer: Controls access to the CDN by adding caching and logging.
 * Reduces redundant fetches by storing previously retrieved resources in memory.
 */
class ProxyServer {
  private cdnService: Cdn = new Cdn(); // Instance of the real CDN
  private cache: Record<string, string> = {}; // In-memory cache for resources

  /**
   * getHtml: Returns HTML content from the cache or fetches it from CDN if not cached.
   */
  getHtml(fileName: string): string {
    const key = `html:${fileName}`;
    let content: string;
    let cacheHit = false;

    if (this.cache[key]) {
      content = this.cache[key];
      cacheHit = true;
    } else {
      content = this.cdnService.retriveHtml(fileName);
      this.cache[key] = content;
    }

    console.log(`[PROXY][HTML] ${fileName} | cacheHit: ${cacheHit}`);
    return content;
  }

  /**
   * getCss: Returns CSS content from the cache or fetches it from CDN if not cached.
   */
  getCss(fileName: string): string {
    const key = `css:${fileName}`;
    let content: string;
    let cacheHit = false;

    if (this.cache[key]) {
      content = this.cache[key];
      cacheHit = true;
    } else {
      content = this.cdnService.retriveCss(fileName);
      this.cache[key] = content;
    }

    console.log(`[PROXY][CSS] ${fileName} | cacheHit: ${cacheHit}`);
    return content;
  }

  /**
   * getJs: Returns JS content from the cache or fetches it from CDN if not cached.
   */
  getJs(fileName: string): string {
    const key = `js:${fileName}`;
    let content: string;
    let cacheHit = false;

    if (this.cache[key]) {
      content = this.cache[key];
      cacheHit = true;
    } else {
      content = this.cdnService.retriveJs(fileName);
      this.cache[key] = content;
    }

    console.log(`[PROXY][JS] ${fileName} | cacheHit: ${cacheHit}`);
    return content;
  }
}

// -------------------------
// CLIENT CODE (CDN DEMO)
// -------------------------

/**
 * Entry point demonstrating the use of ProxyServer to access CDN resources.
 * Shows how repeated requests are served faster via cache, with proper logging.
 */
export default () => {
  const proxyServer = new ProxyServer();

  proxyServer.getHtml("file_1.html"); // 📥 cache miss
  proxyServer.getHtml("file_1.html"); // ✅ cache hit
  proxyServer.getHtml("file_2.html"); // 📥 cache miss

  proxyServer.getCss("file_4.css");   // 📥 cache miss
  proxyServer.getJs("file_4.js");     // 📥 cache miss
  proxyServer.getJs("file_4.js");     // ✅ cache hit
  proxyServer.getCss("file_4.css");   // ✅ cache hit
  proxyServer.getCss("file_5.css");   // 📥 cache miss
  proxyServer.getJs("file_6.js");     // 📥 cache miss
};
