const menuIcon = document.getElementById("menu-icon");
const nav = document.getElementById("navigation");
const firstLink = nav.querySelector("ul li:first-child");
const lastLink = nav.querySelector("ul li:last-child a");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  nav.classList.toggle("active");

  if (nav.classList.contains("active")) {
    nav.querySelector("a").focus();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    if (document.activeElement === lastLink && !e.shiftKey) {
      e.preventDefault();
      menuIcon.focus();
    }

    if (document.activeElement === firstLink && e.shiftKey) {
      e.preventDefault();
      menuIcon.focus();
    }

    // Check if focus is on the menu icon and Shift + Tab is pressed
    if (document.activeElement === menuIcon && e.shiftKey) {
      e.preventDefault();
      lastLink.focus();
    }
  }

  if (e.key === "Escape" && nav.classList.contains("active")) {
    menuIcon.click();
    menuIcon.focus();
  }
});
