import { customCursor } from "./customCursor.js";

// read.me //
// ■ content 추가시 elements에 배열 추가
// 전역 변수로 conditions와 executionStates 정의
const conditions = [];
const executionStates = {};
const scroll_gap = 250;

$(document).ready(function () {
  /* ########################### */
  /* section 공통 script*/
  /* ########################### */

  // 모든 section의 위치를 객체로 저장
  const elements = ["visual", "con1_3r", "con2_shop", "con3_makingFilm"]; // 추가시 저장하고 싶은 이름으로 설정(이름보다 순서가 중요)
  let sect_totalHeight = 0;

  function sectHeight_grant() {
    elements.forEach((element, index) => {
      let sectHeight = document.querySelector(`#${element}`).getBoundingClientRect().height;

      const offsetTop = sect_totalHeight;
      sect_totalHeight = sect_totalHeight + sectHeight;

      // conditions 배열에 새 객체 추가 ★
      conditions.push({
        name: element,
        threshold: offsetTop - scroll_gap,
      });
      // executionStates 객체에 초기 상태 설정
      executionStates[element] = false;
    });
  }

  // 스크롤 이벤트 핸들러
  $(window).scroll(function () {
    let current_top = Math.floor($(this).scrollTop());

    con1_scrollSlide(current_top);

    // conditions 배열에 있는 요소의 위치와 비교
    conditions.forEach((condition, idx) => {
      if (current_top > condition.threshold && !executionStates[condition.name]) {
        executionStates[condition.name] = true;
        switch (condition.name) {
          case "visual":
            break;
          case "con1_3r":
            $("#con1_3r .bg_img_List li").css({ transform: "scale(100%)" });
            customCursor();
            break;
          case "con2_shop":
            setInterval(con2Ctg_ani, 3000);
            break;
          case "con3_makingFilm":
            requestAnimationFrame(updateVideoPlayback);
            break;
          default:
            return;
        }
      }
    });
  });

  /* ########################### */
  /* #visual script */
  /* 
      gsap animation
      title의 크기가 줄어들며 왼쪽으로 붙고
      desc에 색상이 채워짐
      다음 section으로 바로 넘어가지 않도록 빈 구역 추가
     */
  /* ########################### */
  const visual = document.querySelector("#visual");
  const visualTitle = visual.querySelector(".visual_title");
  const visualDescSpans = visual.querySelectorAll(".visual_desc span");

  const visualTl = gsap.timeline({
    scrollTrigger: {
      trigger: visual,
      start: "top top",
      end: "bottom bottom", // 애니메이션 지속 시간 조절
      scrub: true,
    },
  });

  visualTl.to(visualTitle, {
    fontSize: 30,
    padding: 0,
    margin: 0,
    x: 0,
    duration: 3,
    ease: "power1.inOut" /* 선형에 가까운 부드러운 효과 */,
  });

  visualDescSpans.forEach((span, index) => {
    visualTl.to(span, {
      backgroundSize: "100%",
      duration: 2,
    });
  });
  visualTl.to({}, { duration: 2 });

  /* ########################### */
  /* #con1_3r script */
  /* 
      desc 마지막 콘텐츠를 복사해 슬라이드 맨 앞에 복사
      #con_3r의 높이를 나누어 구간지정
      구간마다 슬라이드가 marginLeft로 움직임
      con1_idx라는 변수에 자릿값을 지정해 현재 활성화 된 슬라이드 지정
      활성화 된 슬라이드에 클래스를 주어 스타일 변화
    */
  /* ########################### */

  const bgImg_list = document.querySelectorAll("#con1_3r .bg_img li");
  const desc_list = document.querySelectorAll("#con1_3r .desc_list li");

  const firstContent = $("#con1_3r .desc_list li").first().clone().html();
  const lastContent = $("#con1_3r .desc_list li").last().clone().html();
  $("#con1_3r ul.desc_list").prepend(`<li class="swiper-slide">${lastContent}</li>`);
  $("#con1_3r ul.desc_list").append(`<li class="swiper-slide">${firstContent}</li>`);

  let con1_idx = 0;
  const con1_3r = document.querySelector("#con1_3r");
  const con1_3r_top = con1_3r.offsetTop;
  const slider = document.querySelector(".desc_list");
  const sliderLi = document.querySelector(".desc_list li").offsetWidth;
  const con1_nextSlide = Math.floor(con1_3r.getBoundingClientRect().height / 3.5);

  function con1_classList() {
    bgImg_list.forEach((list) => {
      list.classList.remove("on");
    });
    desc_list.forEach((list) => {
      list.classList.remove("on");
    });
    bgImg_list[con1_idx].classList.add("on");
    desc_list[con1_idx].classList.add("on");

    slider.style.marginLeft = -(sliderLi * con1_idx) + "px";
  }
  con1_classList(); // 초기 class 적용

  function con1_scrollSlide(current_top) {
    if (current_top >= con1_3r_top && current_top < con1_3r_top + con1_nextSlide) {
      con1_idx = 0;
      con1_classList();
    } else if (current_top >= con1_3r_top + con1_nextSlide && current_top < con1_3r_top + con1_nextSlide * 2) {
      con1_idx = 1;
      con1_classList();
    } else if (current_top >= con1_3r_top + con1_nextSlide * 2) {
      con1_idx = 2;
      con1_classList();
    }
  }

  /* ########################### */
  /* #con2_shop script */
  /*
      styicky를 위해 .product_list의 높이를 받아 #con2_shop에 높이를 지정
      jQuery 콜백함수를 사용해 .shopCtg_list에 올라가는 slide 구현 
    */
  /* ########################### */
  const con2Shop = document.getElementById("con2_shop");
  const con2Shop_prodList = con2Shop.querySelector(".product_list");
  const con2Shop_ctgList = con2Shop.querySelector(".shopCtg_list");
  const con2Shop_ctgListItem = con2Shop_ctgList.querySelectorAll(".shopCtg_list li");
  const con2_DescKor_span = con2Shop.querySelectorAll(".desc_kor span");

  /* sticky를 위해 product 높이를 받아서 con2에게 전달 */
  let shopList_height = con2Shop_prodList.clientHeight;
  con2Shop.style.height = `${shopList_height}px`;

  let ctdList_height = con2Shop_ctgListItem[0].clientHeight;

  function con2Ctg_ani() {
    $(".shopCtg_list")
      .stop()
      .animate({ top: `-${ctdList_height}px` }, 1000, function () {
        $(".shopCtg_list li:first-child").appendTo(".shopCtg_list");
        $(".shopCtg_list").css({ top: 0 });
      });
  }

  const con2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: con2Shop,
      start: "top top",
      end: "90% bottom",
      scrub: true,
    },
  });

  con2_DescKor_span.forEach((span, index) => {
    con2Tl.to(span, {
      backgroundSize: "100%",
      duration: 2,
    });
  });

  /* ########################### */
  /* #con3_makingFilm video script */
  /* ########################### */
  const video_sect = document.getElementById("con3_makingFilm");
  const video = document.querySelector("#bound-one video");
  const video_skipBtn = document.getElementById("video_skip");

  let video_sect_top;
  let video_sect_height;

  // 비디오 메타데이터 로드 후 높이 계산
  function setVideoHeight() {
    const heightPerSecond = 3000;
    video_sect_height = video.duration * heightPerSecond;
    const extraHeight = window.innerHeight;
    video_sect.style.height = `${video_sect_height + extraHeight}px`;
    video_sect_top = video_sect.offsetTop;
  }

  if (video.readyState >= 2) {
    // 메타데이터가 이미 로드된 경우
    setVideoHeight();
  } else {
    // 메타데이터가 아직 로드되지 않은 경우
    video.addEventListener("loadedmetadata", setVideoHeight);
  }
  // 스크롤에 따라 비디오 재생 시간 업데이트
  let rafId;
  let lastScrollPosition = -1;
  let lastProgress = -1;

  function updateVideoPlayback() {
    const scrollPosition = window.scrollY;

    // 스크롤 위치가 변경되지 않았다면 업데이트 건너뛰기
    if (scrollPosition === lastScrollPosition) {
      rafId = requestAnimationFrame(updateVideoPlayback);
      return;
    }

    if (!video_sect_top || !video_sect_height) {
      rafId = requestAnimationFrame(updateVideoPlayback);
      return;
    }

    const relativeScroll = scrollPosition - video_sect_top;

    if (relativeScroll >= 0 && relativeScroll <= video_sect_height) {
      const progress = Math.min(relativeScroll / video_sect_height, 1); // 1로 수정 (100%를 나타내는 값)

      // 진행도가 크게 변경된 경우에만 업데이트
      if (Math.abs(progress - lastProgress) > 0.001) {
        video.currentTime = video.duration * progress;
        lastProgress = progress;
      }

      if (video.style.opacity !== "1") {
        video.style.opacity = "1";
      }
    } else if (relativeScroll > video_sect_height && video.style.opacity !== "0") {
      video.style.opacity = "0";
    }

    lastScrollPosition = scrollPosition;
    rafId = requestAnimationFrame(updateVideoPlayback);
  }

  // 초기 호출
  rafId = requestAnimationFrame(updateVideoPlayback);
  sectHeight_grant(); // 비디오 준비 후 모든 section 높이 저장

  // 페이지 언로드 시 애니메이션 프레임 취소
  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(rafId);
  });

  const footerElem = document.getElementById("footer");
  const footerTop = Math.floor(footerElem.offsetTop);
  console.log(footerTop);
  // 비디오 스킵 버튼
  video_skipBtn.addEventListener("click", function () {
    lenis.stop();
    window.scrollTo({
      top: footerTop,
      behavior: "auto",
    });
    setTimeout(function () {
      lenis.start();
    }, 500);
  });

  // 화면이 끝나면 스킵 버튼 숨기기
  const skipBtn_tl = gsap.timeline({
    scrollTrigger: {
      trigger: video_sect,
      start: "bottom bottom",
      end: `bottom bottom`,
      margkers: true,
      scrub: true,
    },
  });

  skipBtn_tl.fromTo(
    video_skipBtn,
    {
      opacity: 1,
      display: "block",
    },
    {
      opacity: 0,
      display: "none",
    }
  );
});
