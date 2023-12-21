document.addEventListener('DOMContentLoaded', function() {
    var signupTab = document.querySelector('.signup');
    var loginTab = document.querySelector('.login');
    var signupForm = document.getElementById('signup-form');
    var loginForm = document.getElementById('login-form');

    signupTab.addEventListener('click', function() {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        signupTab.style.backgroundColor = "rgb(238, 255, 0,0.3)";
        loginTab.style.backgroundColor = "rgb(238, 255, 0, 0)";

    });

    loginTab.addEventListener('click', function() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginTab.style.backgroundColor = "rgb(238, 255, 0,0.3)";
        signupTab.style.backgroundColor = "rgb(238, 255, 0, 0)";
    });
});