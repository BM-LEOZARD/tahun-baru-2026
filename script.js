/* ================== NAMA PENGUNJUNG (BEDA TIAP TAB) ================== */
let visitorName = sessionStorage.getItem("visitorName");

if (!visitorName) {
    visitorName = prompt("Masukkan nama kamu 😊");
    if (!visitorName || visitorName.trim() === "") {
        visitorName = "Tamu";
    }
    sessionStorage.setItem("visitorName", visitorName);
}

document.addEventListener("DOMContentLoaded", () => {
    const nameEl = document.getElementById("visitorName");
    if (nameEl) nameEl.innerText = visitorName;
});

/* ================== MUSIK (FIX HP & TABLET) ================== */
const music = document.getElementById("music");
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        music.volume = 0.7;
        music
            .play()
            .then(() => {
                musicStarted = true;
            })
            .catch(() => { });
    }
}

window.addEventListener("touchstart", startMusic, { once: true });
window.addEventListener("click", startMusic, { once: true });

/* ================== COUNTDOWN ================== */
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

setInterval(() => {
    const now = Date.now();
    const diff = targetDate - now;

    document.getElementById("days").innerText = Math.floor(
        diff / (1000 * 60 * 60 * 24)
    );
    document.getElementById("hours").innerText = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
    );
    document.getElementById("minutes").innerText = Math.floor(
        (diff / (1000 * 60)) % 60
    );
    document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}, 1000);

/* ================== UCAPAN ================== */
const messages = [
    `Semoga 2026 penuh kebahagiaan, ${visitorName} 🌟`,
    `Tahun baru, semangat baru ya ${visitorName} ✨`,
    `Semoga semua impian ${visitorName} tercapai 🎯`,
    `Kesehatan, sukses, dan kebahagiaan untukmu ${visitorName} 🎊`,
];

let index = 0;
function changeMessage() {
    document.getElementById(
        "message"
    ).innerHTML = `Selamat datang, <strong>${visitorName}</strong> ✨<br />${messages[index]}`;
    index = (index + 1) % messages.length;
}

/* ================== FIREWORKS ================== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = (Math.random() * canvas.height) / 2;
    const color = `hsl(${Math.random() * 360},100%,60%)`;

    for (let i = 0; i < 60; i++) {
        particles.push({
            x,
            y,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 6 - 3,
            life: 70,
            color,
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

setInterval(createFirework, 700);
animate();
