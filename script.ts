const menuIcon = document.querySelector<HTMLElement>("#menu-icon")!;
const nav = document.querySelector<HTMLElement>("#navigation")!;
const firstLink = nav.querySelector<HTMLElement>("ul li:first-child")!;
const lastLink = nav.querySelector<HTMLElement>("ul li:last-child a")!;
const mobileIcon = document.querySelector<HTMLElement>("#mobile-icon")!;
const listeningList = document.querySelector<HTMLElement>("#news__listening-list")!;

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

interface LastFm {
  artist: string;
  album: string;
  name: string;
  date: string;
  image: string;
}

const lastFMData = async (): Promise<LastFm[]> => {
  const response = await fetch(
    "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Bst0ne&api_key=9e439f0d37e16052f0d437ddcaa8c46f&format=json"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const tracks: LastFm[] = data.recenttracks.track.slice(0, 15).map((track: any) => ({
    artist: track.artist["#text"],
    album: track.album["#text"],
    name: track.name,
    date: track.date["#text"],
    image: track.image[1]["#text"],
  }));

  return tracks;
};

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
