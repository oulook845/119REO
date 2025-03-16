import { scrollMotion } from "./scrollMotion.js";
scrollMotion(); // 스크롤 유도 애니메이션

$(document).ready(function () {
  /* #visual ***********/
  const visualSec = document.getElementById("visual");
  const visualCont_Ani = document.querySelectorAll(".vs_opc");

  const visual_tl = gsap.timeline({
    scrollTrigger: {
      trigger: visualSec,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  visualCont_Ani.forEach((visualCont) => {
    visual_tl.fromTo(visualCont, { opacity: 0, marginBottom: "-100px" }, { opacity: 1, marginBottom: "0px" });
  });

  /* #aramidas ***********/
  const aramidas_sect = document.getElementById("aramidas");
  const aramidas_ani = document.querySelectorAll(".aramidas_ani");
  const aramidas_slide = document.querySelector("ul.slide_list");
  const aramidas_slideList = document.querySelectorAll("ul.slide_list li");
  const aramidas_slide_total = aramidas_slideList.length;

  aramidas_sect.style.height = `${100 * aramidas_slide_total}vh`;

  // 순차적 올라오는 애니메이션
  const sequential_tl = gsap.timeline({
    scrollTrigger: {
      trigger: aramidas_sect,
      start: "top center",
      end: "center center",
      toggleActions: "play none none reverse",
    },
  });

  // aramidas_ani 요소들을 순차적으로 애니메이션
  aramidas_ani.forEach((ani_cont, index) => {
    sequential_tl.fromTo(
      ani_cont,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      index * 0.2 // 0.2초 간격으로 재생
    );
  });

  // 슬라이드 애니메이션
  const slide_tl = gsap.timeline({
    scrollTrigger: {
      trigger: aramidas_sect,
      start: "center center",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    },
  });

  // 슬라이드 애니메이션 추가
  slide_tl.to(aramidas_slide, { x: "-65%" });

  /* #inquiry ***********/
  const inquiry_sect = document.getElementById("inquiry");
  const inquiry_form = document.getElementById("formWrap");

  const inquiryFrom_tl = gsap.timeline({
    scrollTrigger: {
      trigger: inquiry_sect,
      start: "top center",
      end: "center center",
      scrub: false,
    },
  });

  inquiryFrom_tl.fromTo(
    inquiry_form,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0, 
    }
  );

  // 국가번호 선택 click event
  $("#countryCode h3").click(() => {
    $("#countryCode h3").toggleClass("active");
    $("#countryCode .options").stop().slideToggle();
  });
});
