//=========== Read Username data from local ==========================
const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    // show username 
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}