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