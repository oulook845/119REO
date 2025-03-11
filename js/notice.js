$(document).ready(function () {
  /* ########################################## */
  /* making story pop-up */
  /* ########################################## */
  const makingStory = document.getElementById("makingStory");
  const mk_opaContents = document.querySelectorAll("#makingStory .opacityTrans");
  const mk_desc = document.querySelector("#makingStory .desc");
  
  //   const mk_height = makingStory.getBoundingClientRect().height;
  const mk_ttLength = mk_opaContents.length;
  const mk_delay = 200;
  
  makingStory.style.height = `${mk_delay * (mk_ttLength + 3)}px`;
  


  // GSAP 타임라인 생성
  const makingStory_tl = gsap.timeline({
    scrollTrigger: {
      trigger: makingStory,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      //   pin: true,
    },
  });

  // mk_opaContents 애니메이션 추가
  mk_opaContents.forEach((opaContent, index) => {
    makingStory_tl.fromTo(
      opaContent,
      { opacity: 0 }, // 시작 상태
      { opacity: 1, duration: 1 }, // 종료 상태
      index * 0.5 // 각 요소마다 0.5초 간격으로 시작
    );
  });

  makingStory_tl.fromTo(
    mk_desc,
    { opacity: 0, x: 100 }, // 시작 상태
    { opacity: 1, x: 0, duration: 1 } // 종료 상태
  );
//   makingStory_tl.to({}, { duration: 2 });

  /* ########################################## */
  /* donation */
  /* ########################################## */
  const donationSect = document.getElementById("donation");
  const dona_title = donationSect.querySelector(".title");
  const dona_listWrap = document.getElementById("donationList");
  const dona_Lists = document.querySelectorAll("#donationList li");

  const dona_delay = 2500;

  /* donation title */
  const typeSplit = new SplitType(dona_title, { types: "chars", tagName: "span" });

  gsap.from(".char", {
    opacity: 0,
    duration: 0.5,
    ease: "circ.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: dona_title,
      start: "top top",
      end: `+=${dona_delay} bottom`,
      scrub: true,
    },
  });

  /* donation image list */
  dona_listWrap.style.marginTop = `${dona_delay / 2}px`;
  const donation_tl = gsap.timeline({
    scrollTrigger: {
      trigger: donationSect,
      start: `+=${dona_delay / 2} center`,
      end: "bottom bottom",
      scrub: true,
    },
  });

  donation_tl.to(dona_Lists, {
    opacity: 1,
    stagger: 0.1,
  });
});
