function CarouselSlide() {
  Carousel.apply(this, arguments);
}
CarouselSlide.prototype = Object.create(Carousel.prototype);
CarouselSlide.prototype.constructor = CarouselSlide;

//event listeners
CarouselSlide.prototype.listeners = function () {
  Carousel.prototype.listeners.apply(this);
  this.container.addEventListener("touchstart", this.swipeStart.bind(this));
  this.container.addEventListener("touchend", this.swipeEnd.bind(this));
  this.container.addEventListener("mousedown", this.swipeStart.bind(this));
  this.container.addEventListener("mouseup", this.swipeEnd.bind(this));
};

  //slide mouse+finger
CarouselSlide.prototype.swipeStart = function (e) {
  this.xDown = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
};

CarouselSlide.prototype.swipeEnd = function (e) {
  this.xUp = e instanceof TouchEvent ? e.changedTouches[0].clientX : e.clientX;
  if (this.xDown - this.xUp > 100) this.prevAndPause();
  if (this.xDown - this.xUp < -100) this.nextAndPause();
};
