import { common } from "./common.js";


// lenis 중지
const notLenis_elem = document.querySelectorAll(".notLenis");

notLenis_elem.forEach((notLenis)=>{
  notLenis.addEventListener("wheel",function(){
    lenis.stop();
  })
  notLenis.addEventListener('mouseleave', () => {
    lenis.start(); // Lenis 스크롤 재개
  });
})

// js import
common();
