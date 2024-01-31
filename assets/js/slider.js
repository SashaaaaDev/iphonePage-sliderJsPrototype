function Carousel(containerId = "#mySlider", slideId="#slide") {
  this.slide = document.querySelectorAll(slideId);
  this.container = document.querySelector(containerId);
}

Carousel.prototype = {
  property() {
    this.slides = document.querySelector("#slides");

    this.countSlide = 0;
    this.action = true;
    this.mouseHover = false;
    this.xDown = null;
    this.xUp = null;
    this.interaval = 6000;

    this.SLIDES_COUNT = this.slide.length;
  },
  controlsInit() {
    const control = document.createElement("div");
    control.setAttribute("class", "control");

    const prev = '<span class="prev" id="prev">Prev</span>';
    const next = '<span class="next" id="next">Next</span>';
    const play = '<span class="play" id="pause">Pause</span>';

    control.innerHTML = prev + next + play;
    this.container.append(control);

    this.next = document.querySelector("#next");
    this.prev = document.querySelector("#prev");
    this.buttonPause = document.querySelector("#pause");
  },
  pointersInit() {
    const pointers = document.createElement("div");
    pointers.setAttribute("class", "pointers");

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const point = document.createElement("span");
      point.setAttribute("class", i === 0 ? "pointer active" : "pointer");
      pointers.append(point);
    }
    this.container.append(pointers);
    this.pointers = document.querySelectorAll(".pointer");
  },
  listeners() {
    this.prev.addEventListener("click", this.prevHandler.bind(this));
    this.next.addEventListener("click", this.nextHandler.bind(this));
    this.buttonPause.addEventListener("click", this.pauseHandler.bind(this));
    this.pointers.forEach((pointer) => {
      pointer.addEventListener("click", this.pointersHandler.bind(this));
    });
    this.slides.addEventListener("mouseover", this.mouseHoverOver.bind(this));
    this.slides.addEventListener("mouseout", this.mouseHoverOut.bind(this));
    document.addEventListener("keydown", this.keyHandler.bind(this));
  },
  //move slide
  goSlide(n) {
    this.slide[this.countSlide].className = "wrap-item";
    this.countSlide = (this.SLIDES_COUNT + n) % this.SLIDES_COUNT;
    this.slide[this.countSlide].className = "wrap-item active";
    this.changeActive();
  },

  //pause button
  pauseHandler() {
    if (this.action) {
      this.pauseAction();
    } else {
      this.playAction();
    }
  },

  pauseAction() {
    this.buttonPause.innerHTML = "Play";
    clearInterval(this.action);
    this.action = false;
  },

  //next slide
  nextHandler() {
    this.nextAndPause();
  },

  nextSlide() {
    this.goSlide(this.countSlide + 1);
  },

  playAction() {
    this.buttonPause.innerHTML = "Pause";
    this.action = setInterval(this.nextSlide.bind(this), this.interaval);
  },

  //previous slide
  prevHandler() {
    this.prevAndPause();
  },

  prevSlide() {
    this.goSlide(this.countSlide - 1);
  },

  //next+prev+pause
  nextAndPause() {
    this.nextSlide();
    this.pauseAction();
  },

  prevAndPause() {
    this.prevSlide();
    this.pauseAction();
  },

  //logic of pointers
  pointersHandler(p) {
    const index = [...this.pointers].indexOf(p.target);
    this.goSlide(index);
    this.pauseAction();
  },

  //add+remove active class
  changeActive() {
    this.pointers.forEach((p) => p.classList.remove("active"));
    this.pointers[this.countSlide].classList.add("active");
  },

  //mouse hover
  mouseHoverOver() {
    this.mouseHover = true;
    this.pauseAction();
  },

  mouseHoverOut() {
    this.mouseHover = false;
    if (!this.action) {
      this.playAction();
    }
  },

  //manage keyboard
  keyHandler(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.prevAndPause();
        break;
      case "ArrowRight":
        this.nextAndPause();
        break;
      case " ":
        if (this.action || this.mouseHover) {
          //or && for 1 time slide after pause
          this.pauseAction();
        } else {
          this.playAction();
        }
        e.preventDefault();
    }
  },

  //set interval
  intervalSet() {
    setInterval(this.nextSlide.bind(this), this.interaval);
  },

  //initialize
  init() {
    this.property();
    this.controlsInit();
    this.pointersInit();
    this.listeners();
    this.intervalSet();
  },
};
