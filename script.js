"use strict";
const mobileBtn = document.querySelector("#mobile-btn");
const nav = document.querySelector("#navigation");
const firstLink = nav.querySelector("ul li:first-child a");
const lastLink = nav.querySelector("ul li:last-child a");
const mobileBtnText = document.querySelector("#mobile-btn-text");
mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    nav.classList.toggle("active");
    const isExpanded = nav.classList.contains("active");
    mobileBtn.setAttribute("aria-expanded", isExpanded.toString());
    mobileBtnText.textContent = isExpanded ? "Close mobile navigation" : "Expand mobile navigation";
    if (isExpanded)
        firstLink.focus();
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        const isExpanded = nav.classList.contains("active");
        if (document.activeElement === lastLink && isExpanded && !e.shiftKey) {
            e.preventDefault();
            mobileBtn.focus();
        }
        if (document.activeElement === mobileBtn && e.shiftKey) {
            e.preventDefault();
            lastLink.focus();
        }
        if (document.activeElement === firstLink && e.shiftKey) {
            e.preventDefault();
            mobileBtn.focus();
        }
    }
    if (e.key === "Escape" && nav.classList.contains("active")) {
        mobileBtn.click();
        mobileBtn.focus();
    }
});
