export function customCursor() {
  // 커스텀 커서
  const cursor = document.getElementById("custom_cursor");
  const boxs = document.querySelectorAll(".cursor_area");

  boxs.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      cursor.style.padding = "calc(200px / 2)";
      cursor.style.opacity = "1";

      window.addEventListener("mousemove", function (e) {
        let cursorX = e.clientX;
        let cursorY = e.clientY;

        setTimeout(() => {
          cursor.style.left = cursorX + "px";
          cursor.style.top = cursorY + "px";
        }, 120);
      });
    });
    box.addEventListener("mouseleave", function () {
      cursor.style.padding = "0";
      cursor.style.opacity = "0";
    });
  });
}
