function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if (confirmpassword !== password) {
        showDialog("Failed", "Password and Confirm Password do not match.");
    } else {
        if (name && email && password && username) {
            saveDataLocally(name, email, username, password);
            showDialog("Successful", "Congrats! Your account has been created.");
            window.location.href = "login.html";
        } else {
            showDialog("Failed", "Please fill in all the required fields.");
        }
    }
}

function saveDataLocally(name, email, username, password) {
    const registrationData = {
        name: name,
        email: email,
        username: username,
        password: password,
    };
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
}

function showDialog(title, message) {
    alert(message);
}