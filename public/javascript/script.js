window.onload = function() {
    const elements = document.querySelectorAll('.logo-section, .login-section, h1, .form, button');

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }, index * 200);
    });
};


