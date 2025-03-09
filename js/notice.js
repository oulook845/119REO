$(document).ready(function () {
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
      //   pin: true, // 스크롤 영역 고정 (필요시)
      markers: true, // 디버깅용 마커 (필요시 주석 해제)
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

  // mk_desc 애니메이션 추가 (mk_opaContents 이후 실행)
  makingStory_tl.fromTo(
    mk_desc,
    { opacity: 0, x: 100 }, // 시작 상태
    { opacity: 1, x: 0, duration: 1 } // 종료 상태
  );
  makingStory_tl.to({}, { duration: 2 });
});
