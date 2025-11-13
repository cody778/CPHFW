// pin data
const mapPinsData = [
  { id: 1, top: "35%", left: "60%", title: "Main Runway Hall", desc: "Nørregade 14, 1165", img: "/map/runway.png" },
  { id: 2, top: "65%", left: "30%", title: "TikTok Creator Hub", desc: "Vesterbrogade 72, 1620", img: "/map/tiktok.png" },
  { id: 3, top: "85%", left: "80%", title: "Exhibition", desc: "Gothersgade 105, 1123", img: "/map/exhibition.png" },
  { id: 4, top: "45%", left: "85%", title: "Food Lounge", desc: "Læderstræde 18, 1201", img: "/map/food.png" },
  { id: 5, top: "37%", left: "35%", title: "CIFF", desc: "Studiestræde 45, 1554", img: "/map/ciff.png" }
];

// confirm URL params
const urlParams = new URLSearchParams(window.location.search);
const highlightPinId = parseInt(urlParams.get("pin"), 10);


const mapPinsContainer = document.querySelector(".map-pins");

// to create pin
mapPinsData.forEach((pin) => {
  const pinEl = document.createElement("div");
  pinEl.classList.add("map-pin");
  pinEl.style.top = pin.top;
  pinEl.style.left = pin.left;

  pinEl.innerHTML = `
    <div class="map-pin-icon">
      <img src="/map/pin.svg" alt="${pin.title}">
    </div>
    <div class="map-pin-title">${pin.title}</div>
    <div class="map-popup">
    <img class="map-popup-img" src="${pin.img}" alt="${pin.title}">
    <p>${pin.desc}</p>
      
    </div>
  `;

  mapPinsContainer.appendChild(pinEl);

  //declare to call popup div 
  const popup = pinEl.querySelector(".map-popup");

  // toggle the popup
  pinEl.addEventListener("click", (e) => {
    e.stopPropagation();
    // to close other popup when clicking new popup
    document.querySelectorAll(".map-popup.active").forEach(p => {
      if (p !== popup) p.classList.remove("active");
    });
    popup.classList.toggle("active");
  });

  // to highlight CIFF pin (id:5)
  if (highlightPinId === pin.id) {
    pinEl.classList.add("highlight");
    setTimeout(() => popup.classList.add("active"), 400);
  }
});

// make it close the popup when click anywhere in the map 
document.addEventListener("click", () => {
  document.querySelectorAll(".map-popup.active").forEach(p => p.classList.remove("active"));
});
