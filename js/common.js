export function common() {
  const notLink = document.querySelectorAll("a[href='#']");
  notLink.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  // #header
  const logoElem = document.getElementById("logo");
  const topBtn = document.getElementById("topBtn");
  const header_menuBtn = document.getElementById("header_menu");
  const gnb = document.getElementById("gnb");
  const gnb_closeBtn = gnb.querySelector(".gnb_closeBtn");

  logoElem.addEventListener("click", function () {
    scrollTop();
  });
  topBtn.addEventListener("click", function () {
    scrollTop();
  });
  window.onbeforeunload = function () {
    scrollTop();
  };

  function scrollTop() {
    lenis.stop();
    window.scrollTo(0, 0);
    navReset(); // nav 초기화 (안보이게 숨김)
    lenis.start();
  }
  function navReset() {
    gnb.classList.remove("on"); // nav#gnb 숨기기
    header_menuBtn.style.opacity = 1;
    setTimeout(function () {
      navClass = false;
    }, 750);
  }

  let navClass = false;
  header_menuBtn.addEventListener("click", function () {
    gnb.classList.add("on"); // nav#gnb 보이기
    this.style.opacity = 0;
    setTimeout(function () {
      navClass = true;
    }, 750);
  });

  gnb_closeBtn.addEventListener("click", function () {
    navReset();
  });
  
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      if (navClass !== false) {
        navReset();
      }
    }
  });

  //footer

}
