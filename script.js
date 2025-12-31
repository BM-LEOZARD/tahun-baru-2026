/* ================== MUSIK OTOMATIS ================== */
const music = document.getElementById("music");

function playMusic() {
    music.play().catch(() => {});
    document.removeEventListener("click", playMusic);
    document.removeEventListener("touchstart", playMusic);
}

document.addEventListener("click", playMusic);
document.addEventListener("touchstart", playMusic);

/* ================== COUNTDOWN ================== */
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

/* ================== UCAPAN ================== */
const messages = [
    "Semoga 2026 penuh kebahagiaan 🌟",
    "Tahun baru, semangat baru ✨",
    "Semoga semua impian tercapai 🎯",
    "Kesehatan, sukses, dan kebahagiaan 🎊"
];

let index = 0;
function changeMessage() {
    document.getElementById("message").innerText = messages[index];
    index = (index + 1) % messages.length;
}

/* ================== KEMBANG API ================== */
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
    const y = Math.random() * canvas.height / 2;
    const color = `hsl(${Math.random() * 360},100%,60%)`;

    for (let i = 0; i < 60; i++) {
        particles.push({
            x,
            y,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 6 - 3,
            life: 70,
            color
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
