import Lazyload from "./lazyload";

(function () {
  class App {
    constructor() {
      this.initializeModules();
      this.initializeEditor();
    }
    initializeModules(){
      //Lazy
      Lazyload.init();
    }
    initializeEditor() {
      document.addEventListener("shopify:section:load", () => {
        this.initializeModules();
      });
    }
  }

  new App();
})();
