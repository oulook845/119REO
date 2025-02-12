export function common() {
  const notLink = document.querySelectorAll("a[href='#']");
  notLink.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  // #header
  const header = document.getElementById("header");
  const header_menuBtn = document.getElementById("header_menu");
  const gnb = document.getElementById("gnb");
  const gnb_closeBtn = gnb.querySelector(".gnb_closeBtn");

  header_menuBtn.addEventListener("click", function () {
    gnb.classList.add("on"); // nav#gnb 보이기
    this.style.opacity = 0;
  });
  gnb_closeBtn.addEventListener("click", function () {
    gnb.classList.remove("on"); // nav#gnb 숨기기
    header_menuBtn.style.opacity = 1;
  });

  // scroll
  $(window).scroll(function () {
    $(this).scrollTop();
  });

  // 커스텀 커서 
  const cursor = document.getElementById("custom_cursor");
  //   const box = document.querySelector(".txt_box");

  window.addEventListener("mousemove", function (e) {
    let cursorX = e.clientX;
    let cursorY = e.clientY;
    console.log('object')
    setTimeout(() => {
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
    }, 120);
  });
  //   box.addEventListener("mouseenter",function(){
  //     cursor.style.padding = "calc(200px / 2)";
  //   })
  //   box.addEventListener("mouseleave",function(){
  //     cursor.style.padding = "calc(100px / 2)";
  //   })
}
