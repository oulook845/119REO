/* visual */
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

/* aramidas */
const aramidas_sect = document.getElementById("aramidas");
const aramidas_slide = document.querySelector("ul.slide_list");
const aramidas_slideList = document.querySelectorAll("ul.slide_list li");
const aramidas_slide_total = aramidas_slideList.length;

aramidas_sect.style.height = `${100 * aramidas_slide_total}vh`;

const aramidas_tl = gsap.timeline({
  scrollTrigger: {
    trigger: aramidas_sect,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

aramidas_tl.to(aramidas_slide, { x: "-65%" });
