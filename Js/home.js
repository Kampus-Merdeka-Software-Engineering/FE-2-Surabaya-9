document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('registrationData'));

    const userNameElement = document.getElementById('userName');
    const profileIcon = document.getElementById('profileIcon');
    const logoutOptions = document.getElementById('logoutOptions');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');


    if (userData && userData.name) {
        userNameElement.textContent = userData.username;

        profileIcon.addEventListener('click', function() {
            logoutOptions.classList.toggle('show');
        });

        if (logoutButton) {
            logoutButton.style.display = 'block';

            logoutButton.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
        if (loginButton) {
            loginButton.style.display = 'none';
        }
    } else {
        userNameElement.textContent = 'Guest';

        if (loginButton) {
            loginButton.style.display = 'block';

            loginButton.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});