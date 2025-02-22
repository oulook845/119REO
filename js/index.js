// read.me //
// ■ content 추가시 elements에 배열 추가

// 전역 변수로 conditions와 executionStates 정의
const conditions = [];
const executionStates = {};
const scroll_gap = 250;

$(document).ready(function () {
  const elements = ["visual", "con1_3r", "con2_shop", "con3_makingFilm"];

  elements.forEach((element, index) => {
    const offsetTop = $(`#${element}`).offset().top;
    window[`${element}_offsetTop`] = offsetTop;

    // conditions 배열에 새 객체 추가
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

    conditions.forEach((condition) => {
      if (current_top > condition.threshold && !executionStates[condition.name]) {
        console.log(condition.name);
        executionStates[condition.name] = true;
      }
    });
  });
  
});
