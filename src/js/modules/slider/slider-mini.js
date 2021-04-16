import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, autoplay, animate) {
    super(container, next, prev, activeClass, autoplay, animate);
    this.contentSide = document.querySelector('.showup__content-side');
    this.showUpContent = document.querySelector('.showup__content');
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    if (!this.slides[0].closest("button")) {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  showMoreContent() {
    this.contentSide.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showUpContent.style.width = "100%";
      this.container.style.width = "75%";
      this.contentSide.style.display = "none";
      this.container.classList.add('animated', 'fadeIn');
    });
  }

  //! Самостоятельное задание - избавиться от присваивания класса кнопкам в слайдере с отзывами
  nextSlide() {
    if (
      this.slides[1].tagName === "BUTTON" &&
      this.slides[2].tagName === "BUTTON"
    ) {
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[1]);
      this.container.appendChild(this.slides[2]);
      this.decorizeSlides();
    } else if (this.slides[1].tagName === "BUTTON") {
      this.container.appendChild(this.slides[0]);
      this.container.appendChild(this.slides[1]);
      this.decorizeSlides();
    } else {
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides();
    }
  }

  bindButtons() {
    window.addEventListener("keyup", (e) => {
      if (e.which === 39) {
        this.nextSlide();
      }
      if (e.which === 37) {
        for (let i = this.slides.length - 1; i > 0; i--) {
          if (this.slides[i].tagName !== "BUTTON") {
            let active = this.slides[i];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
            break;
          }
        }
      }
    });
  }

  bindTriggers() {
    this.next.addEventListener("click", () => this.nextSlide());

    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }

  init() {
    try {
      this.container.style.cssText = `
display: flex;
flex-wrap: wrap;
overflow: hidden;
align-items: flex-start;
`;
      this.bindTriggers();
      this.decorizeSlides();
      this.bindButtons();
      this.showMoreContent();

      //! Самостоятельное задание - избавиться автопереключения при наведении - в конструктор добавить this.paused = false;
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 3000);
      }
    } catch (e) {}
  }
}
