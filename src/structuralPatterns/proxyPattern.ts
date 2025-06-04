class Cdn {
  retriveHtml(fileName: string) {
    return `Sending HTML for file: ${fileName}`;
  }
  retriveCss(fileName: string) {
    return `Sending CSS for file: ${fileName}`;
  }
  retriveJs(fileName: string) {
    return `Sending JS for file: ${fileName}`;
  }
}

class ProxyServer {
  private cdnService: Cdn = new Cdn();
  private cache: Record<string, string> = {};
  getHtml(fileName: string) {
    if (this.cache[fileName]) return this.cache[fileName];
    return this.cdnService.retriveHtml(fileName);
  }
  getCss(fileName: string) {
    return this.cdnService.retriveCss(fileName);
  }
  getJs(fileName: string) {
    return this.cdnService.retriveJs(fileName);
  }
}
export default () => {
  const proxyServer = new ProxyServer();
  console.log(proxyServer.getHtml("file_1.js"));
  console.log(proxyServer.getHtml("file_1.js"));
  console.log(proxyServer.getHtml("file_2.js"));
  console.log(proxyServer.getCss("file_4.js"));
};
