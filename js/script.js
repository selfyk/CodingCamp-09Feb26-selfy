welcomeMessage();

// Welcome Message Function
function welcomeMessage() {
    // Show Popup
    let name = prompt("Welcome to Selfy's Company! What is your name?");

    // validate input
    if (name == null || name.trim() === "") {
        // If user cancels or enters an empty name, use "Guest" as default
        name = "Guest";
    }

    // Display Welcome Message
    document.getElementById('welcome-speech').innerHTML = `Hello, ${name}! Welcome to Selfy's Company.`;
}

// Setting up the form submission and output

const inputForm = document.getElementById('inputForm');
const outputDisplay = document.getElementById('outputBox');

inputForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Getting the form data
    let nameForm = document.getElementById('name').value;

    // Display the date format like 01/11/1995
    // 1. Get the raw date value
    let birthRaw = new Date(document.getElementById('birthdate').value);
    // 2. Extract parts and force 2 digits with padStart
    let day = String(birthRaw.getDate()).padStart(2, '0');
    let month = String(birthRaw.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let year = birthRaw.getFullYear();
    // 3. Combine them into the final format
    let birthForm = `${day}/${month}/${year}`;

    // Take the gender radio option's value
    let genderForm = document.querySelector('input[name="gender"]:checked').value;

    let messageForm = document.getElementById('message').value;

    const currentTime = new Date().toString().split(' (')[0];
    // Output: "Fri Feb 13 2026 00:01:38 GMT+0700"

    // Display the output from form in the textarea
    outputDisplay.innerHTML = `<div style="width: 100%;"><b>Current time</b> : ${currentTime}

<b>Nama</b> : ${nameForm}
<b>Tanggal Lahir</b> : ${birthForm}
<b>Jenis Kelamin</b> : ${genderForm}
<b>Pesan</b> : ${messageForm}</div>`;
});

// MODAL FEATURE
let scale = 1;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let isDragging = false;
let hasMoved = false;

const modalImg = document.getElementById("popupImage");

// --- 1. THE "PINNED" ZOOM ENGINE ---
modalImg.onwheel = function (e) {
    e.preventDefault();

    // 1. Determine the zoom direction and speed
    const delta = e.deltaY / -1000;
    const nextScale = Math.min(Math.max(1, scale + delta), 4);

    // 2. Calculate where the mouse is relative to the image center
    // We use getBoundingClientRect to get the absolute position of the image on screen
    const rect = modalImg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 3. The Math: Adjust pointX and pointY so the point under the mouse stays still
    if (nextScale !== scale) {
        const ratio = 1 - nextScale / scale;
        pointX += (mouseX - rect.width / 2) * ratio;
        pointY += (mouseY - rect.height / 2) * ratio;
        scale = nextScale;
    }

    // 4. Reset to center if zoomed all the way out
    if (scale <= 1) {
        scale = 1;
        pointX = 0;
        pointY = 0;
    }

    updateTransform();
};

// --- 2. CLICK & DRAG LOGIC ---
modalImg.onmousedown = function (e) {
    e.preventDefault();
    isDragging = true;
    hasMoved = false;
    // Record where the mouse started relative to the image position
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
};

window.onmousemove = function (e) {
    if (!isDragging) return;
    hasMoved = true;

    if (scale > 1) {
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        updateTransform();
    }
};

window.onmouseup = function (e) {
    // CLICK TO TOGGLE (Only if we didn't drag)
    if (!hasMoved && isDragging) {
        if (scale > 1) {
            scale = 1;
            pointX = 0;
            pointY = 0;
        } else {
            scale = 2;
            // When clicking to zoom, we zoom toward the mouse click
            pointX = e.clientX - (e.clientX - pointX) * 2 / scale;
            pointY = e.clientY - (e.clientY - pointY) * 2 / scale;
        }
        updateTransform();
    }
    isDragging = false;
    updateTransform(); // Refresh cursor
};

// --- 3. THE TRANSFORM & CURSOR ENGINE ---
function updateTransform() {
    // Apply the scale and the translation together
    // Note: order matters in CSS transforms, but here we use translate then scale
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;

    // Cursor feedback
    if (scale === 1) {
        modalImg.style.cursor = "zoom-in";
    } else {
        modalImg.style.cursor = isDragging ? "grabbing" : "grab";
    }
}

// --- 4. MODAL WRAPPERS ---
function openPopup(imageSrc, title) {
    document.getElementById("imageModal").style.display = "block";
    modalImg.src = imageSrc;
    document.getElementById("modal-caption").innerHTML = title;

    // Reset image to original state on every open
    scale = 1;
    pointX = 0;
    pointY = 0;
    updateTransform();
}

function closePopup() {
    document.getElementById("imageModal").style.display = "none";
}

// Close when clicking the dark background (the modal div, not the image)
document.getElementById("imageModal").onclick = function (e) {
    if (e.target === this) {
        closePopup();
    }
};

// Double Tap Zoom Feature for Mobile UX
let lastTap = 0;
modalImg.addEventListener('touchend', function (e) {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        // Double Tap Detected
        modalImg.classList.toggle("zoomed");
        e.preventDefault();
    }
    lastTap = currentTime;
});