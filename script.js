"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const menuIcon = document.querySelector("#menu-icon");
const nav = document.querySelector("#navigation");
const firstLink = nav.querySelector("ul li:first-child");
const lastLink = nav.querySelector("ul li:last-child a");
const mobileIcon = document.querySelector("#mobile-icon");
const listeningList = document.querySelector("#news__listening-list");
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    nav.classList.toggle("active");
    const isExpanded = nav.classList.contains("active");
    menuIcon.setAttribute("aria-expanded", isExpanded.toString());
    mobileIcon.textContent = isExpanded ? "Close mobile navigation" : "Expand mobile navigation";
    if (nav.classList.contains("active")) {
        firstLink.focus();
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
const lastFMData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Bst0ne&api_key=9e439f0d37e16052f0d437ddcaa8c46f&format=json");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = yield response.json();
    const tracks = data.recenttracks.track.slice(0, 15).map((track) => ({
        artist: track.artist["#text"],
        album: track.album["#text"],
        name: track.name,
        date: track.date["#text"],
        image: track.image[1]["#text"],
    }));
    return tracks;
});
/*
const renderLastFm = async () => {
  const tracks = await lastFMData();

  tracks.forEach((el) => {
    const track = document.createElement("li");
    track.classList.add("news__listening-item");
    track.innerHTML = `
      <img src="${el.image}" alt="${el.album} cover" class="news__listening-image" />
      <div class="news__listening-content">
        <p class="news__listening-title">${el.name}</p>
        <p class="news__listening-artist">${el.artist}</p>
        <p class="news__listening-album">${el.album}</p>
        <p class="news__listening-date">${el.date}</p>
      </div>
    `;
    listeningList.appendChild(track);
  });
};

renderLastFm();
*/
