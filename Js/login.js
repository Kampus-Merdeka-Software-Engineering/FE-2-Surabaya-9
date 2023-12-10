function loginUser() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const registrationDataString = localStorage.getItem('registrationData');
    if (!registrationDataString) {
        showDialog("Error", "No registration data found. Please register first.");
        return;
    }

    const registrationData = JSON.parse(registrationDataString);

    if (loginUsername === registrationData.username && loginPassword === registrationData.password) {
        showDialog("Success", "Login successful!");
        window.location.href = "home.html";
    } else {
        showDialog("Error", "Invalid username or password.");
    }
}

function showDialog(title, message) {
    alert(message);
    document.getElementById('loginMessage').innerText = message;
}