export function index() {
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
    elements.forEach((element, index) => {
      const offsetTop = Math.floor($(`#${element}`).offset().top);
      window[`${element}_offsetTop`] = offsetTop;

      // conditions 배열에 새 객체 추가 ★
      conditions.push({
        name: element,
        threshold: offsetTop - scroll_gap,
      });
      // executionStates 객체에 초기 상태 설정
      executionStates[element] = false;
    });

    // 스크롤 이벤트 핸들러
    $(window).scroll(function () {
      let current_top = Math.floor($(this).scrollTop());

      // conditions 배열에 있는 요소의 위치와 비교
      conditions.forEach((condition, idx) => {
        if (current_top > condition.threshold && !executionStates[condition.name]) {
          executionStates[condition.name] = true;
          switch (condition.name) {
            case "visual":
              break;
            case "con1_3r":
              $("#con1_3r").addClass("on");
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
    /* ########################### */

    const visaulZoom = gsap.timeline();
    visaulZoom.to("#visual .visual_title", {
      // fontSize: "2.7777777777777777vh",
      fontSize: 30,
      duration: 1,
      margin: 0,
    });
    ScrollTrigger.create({
      animation: visaulZoom,
      trigger: "#visual",
      start: "top top",
      end: "+1200",
      anticipatePin: 1,
      pin: true,
      scrub: true,
      repeat: 0,
      yoyo: true,
      markers: true,
    });
    // const visualDesc = gsap.timeline();
    // visualDesc.to("#visual .visual_desc", {});
    const visualDesc = gsap.utils.toArray("#visual .visual_desc span");
    visualDesc.forEach((text) => {
      gsap.to(text, {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "center 90%",
          end: "center 30%",
          scrub: true,
        },
      });
    });

    /* ########################### */
    /* #con2_shop script */
    /* ########################### */
    const con2Shop = document.getElementById("con2_shop");
    const con2Shop_prodList = con2Shop.querySelector(".product_list");
    const con2Shop_ctgList = con2Shop.querySelector(".shopCtg_list");
    const con2Shop_ctgListItem = con2Shop.querySelectorAll(".shopCtg_list li");

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

    /* ########################### */
    /* #con3_makingFilm video script */
    /* ########################### */
    const video_sect = document.getElementById("con3_makingFilm");
    const video = document.querySelector("#bound-one video");

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

    // 페이지 언로드 시 애니메이션 프레임 취소
    window.addEventListener("beforeunload", () => {
      cancelAnimationFrame(rafId);
    });
  });
}
