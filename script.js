console.log("script loaded");
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 12; // 12월
const WEDDING_DAY = 26;

const WEDDING_HOUR = 11;
const WEDDING_MINUTE = 0;
const WEDDING_DATE = new Date(
  WEDDING_YEAR,
  WEDDING_MONTH - 1,
  WEDDING_DAY,
  WEDDING_HOUR,
  WEDDING_MINUTE,
  0
).getTime();
document.addEventListener("DOMContentLoaded", function () {
  renderCalendar();
  startCountdown();
});

function renderCalendar() {
  const monthTitle = document.getElementById("calendar-month");
  const calendarDays = document.getElementById("calendar-days");
  if (!monthTitle || !calendarDays) return;
  monthTitle.innerText = `${WEDDING_YEAR}. ${String(WEDDING_MONTH).padStart(2, "0")}`;
  calendarDays.innerHTML = "";
  const firstDay = new Date(WEDDING_YEAR, WEDDING_MONTH - 1, 1).getDay();
  const lastDate = new Date(WEDDING_YEAR, WEDDING_MONTH, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    const emptySpan = document.createElement("span");
    calendarDays.appendChild(emptySpan);
  }
  for (let day = 1; day <= lastDate; day++) {
    const daySpan = document.createElement("span");
    daySpan.innerText = day;
    if (day === WEDDING_DAY) {
      daySpan.classList.add("wedding-day");
    }
    calendarDays.appendChild(daySpan);
  }
}

function openEnvelope() {
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("main-content");
  const bgm = document.getElementById("bgm");
  if (!overlay || !mainContent) return;
  overlay.style.transition = "opacity 0.8s ease";
  overlay.style.opacity = "0";
  setTimeout(function () {
  overlay.style.display = "none";
  mainContent.style.display = "block";
  window.scrollTo(0, 0);

  if (bgm) {
    bgm.play().catch(function () {});
  }
}, 800);
}
function toggleBgm() {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("bgm-btn");
  if (!bgm || !btn) return;
  if (bgm.paused) {
    bgm.play().catch(function () {});
    btn.innerText = "🎵 Music On";
  } else {
    bgm.pause();
    btn.innerText = "🔇 Music Off";
  }
}
function startCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
function updateCountdown() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE - now;
  const ddayBadge = document.getElementById("dday-counter");
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minEl = document.getElementById("timer-min");
  const secEl = document.getElementById("timer-sec");
  if (!ddayBadge || !daysEl || !hoursEl || !minEl || !secEl) return;
  if (distance < 0) {
    ddayBadge.innerText = "D-DAY ♡ 축하해주셔서 감사합니다";
    daysEl.innerText = "00";
    hoursEl.innerText = "00";
    minEl.innerText = "00";
    secEl.innerText = "00";
    return;
  }
  const today = new Date();
const todayDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

const weddingDateOnly = new Date(
  WEDDING_YEAR,
  WEDDING_MONTH - 1,
  WEDDING_DAY
);

const days = Math.ceil(
  (weddingDateOnly - todayDate) / (1000 * 60 * 60 * 24)
);

const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((distance / (1000 * 60)) % 60);
const seconds = Math.floor((distance / 1000) % 60);

// D-Day 표시
if (days === 0) {
  ddayBadge.innerText = "D-DAY";
} else {
  ddayBadge.innerText = `D-${days}`;
}

daysEl.innerText = String(days).padStart(2, "0");
hoursEl.innerText = String(hours).padStart(2, "0");
minEl.innerText = String(minutes).padStart(2, "0");
secEl.innerText = String(seconds).padStart(2, "0");
}
function openModal(src) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  if (!modal || !modalImg) return;
  modal.style.display = "flex";
  modalImg.src = src;
}
function closeModal() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.style.display = "none";
  }
}
function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const arrow = button.querySelector(".arrow");
  if (!content || !arrow) return;
  const isOpen = content.style.display === "block";
  content.style.display = isOpen ? "none" : "block";
  arrow.innerText = isOpen ? "▼" : "▲";
  if (isOpen) {
    button.classList.remove("active");
  } else {
    button.classList.add("active");
  }
}
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(function () {
      alert("계좌번호가 클립보드에 복사되었습니다.");
    })
    .catch(function () {
      alert("복사 실패! 계좌번호를 길게 눌러 직접 복사해주세요.");
    });
}
let kakaoMapRendered = false;
function renderKakaoMap() {
  if (kakaoMapRendered) return;
  if (typeof daum === "undefined" || !daum.roughmap || !daum.roughmap.Lander) return;
  new daum.roughmap.Lander({
    timestamp: "1785757439114",
    key: "rxtcefzxtar",
    mapWidth: "100%",
    mapHeight: "280"
  }).render();
  kakaoMapRendered = true;
}

document.addEventListener("DOMContentLoaded", function () {
  renderKakaoMap();
});
const GUESTBOOK_URL = "https://script.google.com/macros/s/AKfycbzlISnqSJ4OxWlXBvMuaHMxjfkJP_BMLp6I3CYy6r0SS53ixbctAjTbScp7hf90z09AWg/exec";


function submitGuestbook(){

  const name = document.getElementById("guest-name").value.trim();
  const message = document.getElementById("guest-message").value.trim();


  if(!name || !message){
    alert("이름과 축하 메시지를 입력해주세요.");
    return;
  }


  const formData = new FormData();

  formData.append("name", name);
  formData.append("message", message);


  fetch(GUESTBOOK_URL,{
    method:"POST",
    body:formData
  })
  .then(()=>{

    alert("축하 메시지가 전달되었습니다.\n확인 후 등록됩니다.");

    document.getElementById("guest-name").value="";
    document.getElementById("guest-message").value="";

  })
  .catch(error=>{

    console.log(error);
    alert("등록 중 오류가 발생했습니다.");

  });

}
// 승인된 방명록 불러오기
function loadGuestbook(){

  const list = document.getElementById("guestbook-list");

  if(!list) return;


  fetch(GUESTBOOK_URL)
  .then(response => response.json())
  .then(data => {

    list.innerHTML = "";


    if(data.length === 0){

      list.innerHTML = `
        <div style="padding:30px;color:#999;text-align:center;">
          💌<br><br>
          첫번째 축하 메세지를 남겨주세요.
        </div>
      `;

      return;
    }


    data.forEach(item=>{

      const div = document.createElement("div");

      div.className = "guestbook-card";


      div.innerHTML = `
        <p class="guest-name">${item.name}</p>
        <p class="guest-message">${item.message}</p>
      `;


      list.appendChild(div);

    });

  })
  .catch(error=>{
    console.log(error);
  });

}


document.addEventListener("DOMContentLoaded", function(){

  loadGuestbook();

});
