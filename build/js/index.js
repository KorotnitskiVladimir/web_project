/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
// menu burger
const menuBurger = document.querySelector(".burger-icon");
const header = document.querySelector(".header");

menuBurger.addEventListener("click", () => {
  header.classList.toggle("menu-active");
});

// tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.dataset.tab;

    tabButtons.forEach((button) => {
      button.classList.toggle("active", button === btn);
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabId);
    });
  });
});

//header

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-white");
  } else {
    header.classList.remove("header-white");
  }
});

//progress

document.addEventListener("DOMContentLoaded", function () {
  const progressElements = document.querySelectorAll(".progress");
  const section = document.querySelector(".skills-section");

  const animateProgress = () => {
    progressElements.forEach((progress) => {
      const progressText = progress.querySelector(".progress-text");
      const progressCircle = progress.querySelector(".progress-circle-prog");

      const percentage = parseInt(progressText.getAttribute("data-progress"));
      const circleCircumference = 2 * Math.PI * 74; // 2 * π * radius

      const dashArrayValue = (percentage / 100) * circleCircumference;

      progressCircle.style.strokeDasharray = `${dashArrayValue} ${circleCircumference}`;
    });
  };

  const options = {
    root: null,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgress();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    perView: 3,
    autoplay: 3000,
    breakpoints: { 990: { perView: 1 } },
  }).mount();
});

document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.querySelectorAll(".modal-open");
  contactButton.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      modal.classList.add("show");
      document.body.classList.add("no-scroll");
    });
  });
});

const closeButton = document.querySelector("#closeModal");
closeButton.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
  document.body.classList.remove("no-scroll");
});

window.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal");
  if (event.target == modal) {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
});

/******/ })()
;
//# sourceMappingURL=index.js.map