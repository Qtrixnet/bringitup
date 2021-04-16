import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  // метод показа слайдов
  showSlides(n) {
    // если дошли до последней страницы - то показываем 1й слайд
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    // если листаем назад, то показываем последний слайд
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    // отображение блока на 3й странице слайдера
    try {
      this.hanson.style.opacity = "0";
      if (n === 3) {
        this.hanson.classList.add("animated");
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
        }, 1000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch (e) {}

    // скрываем все страницы и показываем только активую
    this.slides.forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  bindButtons() {
    window.addEventListener("keyup", (e) => {
      if (e.which === 40) {
        this.plusSlides(1);
      }
      if (e.which === 38) {
        this.plusSlides(-1);
      }
    });
  }

  bindTriggers() {
    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });

      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    document.querySelectorAll(".prevmodule").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });

    document.querySelectorAll(".nextmodule").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  // навешиваем событие переключения на кнопку и на логотип сайта
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (e) {}

      this.showSlides(this.slideIndex);
      this.bindTriggers();
      this.bindButtons();
    }
  }
}
