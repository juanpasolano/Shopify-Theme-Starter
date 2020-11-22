import Lazyload from "./lazyload";

(function () {
  class App {
    constructor() {
      //Lazy
      Lazyload.init();
    }
  }

  new App();
})();
