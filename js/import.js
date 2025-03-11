import { common } from "./common.js";


const scrollSect = document.querySelector(".scrollMotion");
const scroll_icon = document.querySelector(".scrollMotion .doScroll");

gsap.to(scroll_icon, {
  opacity: 0,
  scrollTrigger: {
    trigger: scrollSect,
    start: "top top",
    end: "+=10",
    scrub: true,
  },
});

// js import
common();
