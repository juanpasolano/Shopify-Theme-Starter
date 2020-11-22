/* eslint-disable prefer-destructuring */
// Lazy Load

class Lazy {
  constructor(wrap) {
    if (wrap) {
      this.wrapper = wrap;
      this.img = wrap.querySelectorAll(".lazy__img")[0];
      this.source = wrap.querySelectorAll(".lazy__source")[0];
      this.transitionSpeed = parseInt(wrap.dataset.transitionspeed, 10) + 50;
      const observerOpts = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      };

      const observer = new IntersectionObserver((entries, imgObserv) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.swapImgSrc();
            imgObserv.unobserve(this.wrapper);
          }
        });
      }, observerOpts);
      observer.observe(this.wrapper);
    }
  }

  swapImgSrc() {
    this.wrapper.classList.add("lazy--loading");
    const { img, source } = this;

    // check load of new src
    img.onload = () => this.showImg();
    img.error = () => this.showImg();

    // Changes Image sources (lazy loading)
    // set src/srcset to data-src/data-srcset value
    img.setAttribute("src", img.dataset.src);
    img.setAttribute("srcset", img.dataset.srcset);

    // Changes Source tag sources (lazy loading)
    // set srcset to data-srcset value
    if (source !== undefined)
      source.setAttribute("srcset", source.dataset.srcset);

    // if image is already cached or loaded
    if (img.complete) this.showImg();
  }

  showImg() {
    this.wrapper.classList.remove("lazy--loading");
    this.wrapper.classList.add("lazy--loaded");

    setTimeout(() => {
      this.wrapper.classList.add("lazy--done");
    }, this.transitionSpeed);
  }
}

// init for all .lazy elements
const lazyInit = {
  init() {
    const lazyImgWrap = [].slice.call(document.querySelectorAll(".lazy"));
    if (lazyImgWrap.length > 0) {
      lazyImgWrap.forEach((wrap) => {
        new Lazy(wrap);
      });
    }
  },
};

export default lazyInit;
