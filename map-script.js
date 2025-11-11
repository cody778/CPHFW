// 핀 데이터
const mapPinsData = [
  { id: 1, top: "35%", left: "60%", title: "Main Runway Hall", desc: "Nørregade 14, 1165 København K", img: "/map/runway.png" },
  { id: 2, top: "65%", left: "30%", title: "TikTok Creator Hub", desc: "Vesterbrogade 72, 1620 København", img: "/map/tiktok.png" },
  { id: 3, top: "85%", left: "80%", title: "Exhibition", desc: "Gothersgade 105, 1123 København K", img: "/map/exhibition.png" },
  { id: 4, top: "45%", left: "85%", title: "Food Lounge", desc: "Læderstræde 18, 1201 København K", img: "/map/food.png" },
  { id: 5, top: "27%", left: "20%", title: "CIFF", desc: "Studiestræde 45, 1554 København", img: "/map/ciff.png" }
];

// URL 파라미터 확인 (예: ?pin=5)
const urlParams = new URLSearchParams(window.location.search);
const highlightPinId = parseInt(urlParams.get("pin"), 10);

const mapPinsContainer = document.querySelector(".map-pins");

// 핀 생성
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

  const popup = pinEl.querySelector(".map-popup");

  // 핀 클릭 시 팝업 토글
  pinEl.addEventListener("click", (e) => {
    e.stopPropagation();
    // 다른 모든 팝업 닫기
    document.querySelectorAll(".map-popup.active").forEach(p => {
      if (p !== popup) p.classList.remove("active");
    });
    popup.classList.toggle("active");
  });

  // 특정 핀 하이라이트 (예: ?pin=5)
  if (highlightPinId === pin.id) {
    pinEl.classList.add("highlight");
    setTimeout(() => popup.classList.add("active"), 400);
  }
});

// 외부 클릭 시 팝업 닫기
document.addEventListener("click", () => {
  document.querySelectorAll(".map-popup.active").forEach(p => p.classList.remove("active"));
});
