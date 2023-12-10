const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}