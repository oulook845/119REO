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
          switch (condition.name){
            case "visual" :
              console.log(`${condition.name} : ${idx}`)
              break;
            case "con1_3r" :
              console.log(`${condition.name} : ${idx}`)
              break;
            case "con2_shop" :
              console.log(`${condition.name} : ${idx}`)
              break;
            case "con3_makingFilm" :
              console.log(`${condition.name} : ${idx}`)
              break;
            default : return;
          }
        }
      });
    });

    /* ########################### */
    /* #con3_makingFilm video script */
    /* ########################### */
    const video_sect = document.getElementById("con3_makingFilm");
    const video = document.querySelector("#bound-one video");

    let video_sect_top;
    let video_sect_height;

    // 비디오 메타데이터 로드 후 높이 계산
    video.addEventListener("loadedmetadata", () => {
      const heightPerSecond = 100; // 조절 가능
      video_sect_height = video.duration * heightPerSecond;

      // 추가 여유 공간 확보
      const extraHeight = window.innerHeight; // 화면 한 높이만큼 추가
      video_sect.style.height = `${video_sect_height + extraHeight}px`;

      video_sect_top = video_sect.offsetTop;
    });

    // 스크롤에 따라 비디오 재생 시간 업데이트
    function updateVideoPlayback() {
      const scrollPosition = window.scrollY;

      if (!video_sect_top || !video_sect_height) return;

      const relativeScroll = scrollPosition - video_sect_top;

      if (relativeScroll >= 0 && relativeScroll <= video_sect_height) {
        const progress = Math.min(relativeScroll / video_sect_height, 1); // 최대값 제한
        video.currentTime = video.duration * progress;
        video.style.opacity = 1;
      } else if (relativeScroll >= 0 && relativeScroll > video_sect_height) {
        video.style.opacity = 0;
      }
    }
    // 스크롤 이벤트 등록
    window.addEventListener("scroll", updateVideoPlayback);
  });
}
