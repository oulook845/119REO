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

  //footer

  // 커스텀 커서
  const cursor = document.getElementById("custom_cursor");
  const boxs = document.querySelectorAll(".cursor_area");
  
  window.addEventListener("mousemove", function (e) {
    let cursorX = e.clientX;
    let cursorY = e.clientY;

    setTimeout(() => {
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
    }, 120);
  });
  
  boxs.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      cursor.style.padding = "calc(200px / 2)";
      cursor.style.opacity = "1";
    });
    box.addEventListener("mouseleave", function () {
      cursor.style.padding = "0";
      cursor.style.opacity = "0";
    });
  });
}
