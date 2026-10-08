const targetDate = new Date("October 23, 2026 08:00:00").getTime();

let countdownTimer = null;

function updateCountdown() {

    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;

    const now = new Date().getTime();
    const distance = targetDate - now;

    // Selepas masa tamat: hentikan pemasa dan sembunyikan ruang countdown
    if (distance <= 0) {

        clearInterval(countdownTimer);
        countdownEl.innerHTML = "";
        countdownEl.style.display = "none";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    countdownEl.innerHTML = `

    <div class="countdown-box">
        <h2>${days}</h2>
        <span>Hari</span>
    </div>

    <div class="countdown-box">
        <h2>${hours}</h2>
        <span>Jam</span>
    </div>

    <div class="countdown-box">
        <h2>${minutes}</h2>
        <span>Minit</span>
    </div>

    <div class="countdown-box">
        <h2>${seconds}</h2>
        <span>Saat</span>
    </div>

    `;
}

updateCountdown();

if (new Date().getTime() < targetDate) {
    countdownTimer = setInterval(updateCountdown, 1000);
}

/* =========================
   MUAT SEMULA LIVE SCORE / JADUAL
========================= */

document.querySelectorAll("[data-reload]").forEach(function (btn) {

    btn.addEventListener("click", function () {

        const frame = document.getElementById(btn.dataset.reload);
        if (!frame) return;

        btn.classList.add("is-loading");

        frame.addEventListener("load", function done() {
            btn.classList.remove("is-loading");
            frame.removeEventListener("load", done);
        });

        // Tetapkan semula src untuk paksa iframe dimuat semula
        const src = frame.getAttribute("src");
        frame.setAttribute("src", src);
    });
});

/* =========================
   KAUNTER PELAWAT
   (sekali bagi setiap browser; guna Abacus counting API)
========================= */

(function () {

    const el = document.getElementById("visitorCount");
    if (!el) return;

    const API       = "https://abacus.jasoncameron.dev";
    const NAMESPACE = "sukan-muhibbah-ilkbs-2026";
    const KEY       = "pelawat";
    const FLAG      = "sm2026_sudah_dikira";

    // Ujian setempat (Live Server / Wi-Fi sendiri) hanya BACA kiraan, tidak menambah
    const host = location.hostname;
    const isLocal = host === "" || host === "localhost" || host === "127.0.0.1" ||
        host === "[::1]" || /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);

    function show(value) {
        const n = Number(value);
        el.textContent = Number.isFinite(n) ? n.toLocaleString("en-US") : "-";
    }

    function request(action) {
        return fetch(API + "/" + action + "/" + NAMESPACE + "/" + KEY)
            .then(function (res) {
                return res.ok ? res.json() : Promise.reject(res.status);
            });
    }

    let alreadyCounted = false;
    try { alreadyCounted = localStorage.getItem(FLAG) === "1"; } catch (e) {}

    const action = (isLocal || alreadyCounted) ? "get" : "hit";

    request(action)
        .then(function (data) {
            show(data.value);
            if (action === "hit") {
                try { localStorage.setItem(FLAG, "1"); } catch (e) {}
            }
        })
        .catch(function () {
            show("-");
        });

})();

/* =========================
   MENU TELEFON: TUTUP AUTOMATIK
   (klik pautan, klik di luar, kursor keluar, atau tekan Esc)
========================= */

(function () {

    const nav     = document.querySelector(".custom-navbar");
    const menu    = document.getElementById("menu");
    const toggler = document.querySelector(".navbar-toggler");

    if (!nav || !menu || !toggler || typeof bootstrap === "undefined") return;

    const mobileMenu = window.matchMedia("(max-width: 1199.98px)");
    let leaveTimer = null;

    function isOpen() {
        return menu.classList.contains("show");
    }

    function closeMenu() {
        clearTimeout(leaveTimer);
        if (!isOpen() || !mobileMenu.matches) return;
        bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    }

    // 1) Klik pada pautan menu atau logo -> tutup serta-merta
    nav.querySelectorAll(".nav-link, .navbar-brand").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // 2) Klik / sentuh di luar menu -> tutup
    document.addEventListener("pointerdown", function (e) {
        if (isOpen() && !nav.contains(e.target)) closeMenu();
    });

    // 3) Kursor (tetikus) keluar dari kawasan menu -> tutup selepas jeda pendek
    nav.addEventListener("mouseleave", function () {
        if (!isOpen()) return;
        clearTimeout(leaveTimer);
        leaveTimer = setTimeout(closeMenu, 300);
    });

    nav.addEventListener("mouseenter", function () {
        clearTimeout(leaveTimer);
    });

    // 4) Tekan Esc -> tutup
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
    });

})();
