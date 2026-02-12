welcomeMessage();

// Welcome Message Function
function welcomeMessage() {
    // Show Popup
    let name = prompt("Welcome to Yama Company! What is your name?");

    // validate input
    if (name == null || name.trim() === "") {
        // If user cancels or enters an empty name, use "Guest" as default
        name = "Guest";
    }

    // Display Welcome Message
    document.getElementById('welcome-speech').innerHTML = `Hello, ${name}! Welcome to Yama Company.`;
}

function validateForm() { }