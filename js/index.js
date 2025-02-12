// scroll

const scroll_gap = 400;
const visual = $("#visual").offset().top;
const con1_r3Top = $("#con1_3r").offset().top - scroll_gap;
const con2_shopTop = $("#con2_shop").offset().top - scroll_gap;
const con3_mFlimTop = $("#con3_makingFilm").offset().top - scroll_gap;

$(window).scroll(function () {
  let current_top = Math.floor($(this).scrollTop());

  if (current_top > con1_r3Top && current_top > 0) {
    console.log("con1");
    $("#con1_3r .bg_img li").eq(0).addClass("on");
  } else if (current_top > con2_shopTop && current_top > 0) {
    console.log("con2");
  } else if (current_top > con3_mFlimTop && current_top > 0) {
    console.log("con3");
  }
});
