let toggleImage = false;
const a = 5;
const b = 6;


function changeDivColor(id) {
    const colors = ['#FFD700', '#FF69B4', '#00FA9A', '#1E90FF', '#FF4500'];
    document.getElementById(id).style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}

function showMessage(id) {
    document.getElementById(id).classList.remove('hidden');
}

function toggleMessage(id, btnId) {
    const msg = document.getElementById(id);
    const btn = document.getElementById(btnId);
    msg.classList.toggle('hidden');
    btn.textContent = msg.classList.contains('hidden') ? "Show Message" : "Hide Message";
}

function changeImage(id) {
    const img = document.getElementById(id);
    img.src = toggleImage ? "/Users/nishant/Downloads/PGSLOGO.png" : "/Users/nishant/Downloads/LOGO.png";
    toggleImage = !toggleImage;
}

function changeBackground() {
    const colors = ['#fffacd', '#d1f7ff', '#f0fff0', '#f5f5dc', '#ffefd5'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}


function showSum() {
    document.getElementById("mathResult").textContent = `The sum of ${a} + ${b} = ${a + b}`;
}

function showSub() {
    document.getElementById("mathResult").textContent = `The subtraction of ${a} - ${b} = ${a - b}`;
}

function showMul() {
    document.getElementById("mathResult").textContent = `The multiplication of ${a} × ${b} = ${a * b}`;
}