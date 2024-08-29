// Modificación para desplegar el menú lateral con animación
document.getElementById('menu-icon').addEventListener('click', function () {
    var sideMenu = document.getElementById('side-menu');
    var isVisible = sideMenu.style.display === 'block';
    sideMenu.style.display = isVisible ? 'none' : 'block';
    
    // Agregar clase para animar el menú lateral
    sideMenu.classList.toggle('animate');
    
    // Cambiar el fondo de la sección principal
    document.querySelector('main').classList.toggle('dimmed', !isVisible);
});

window.onload = function() {
    const elements = document.querySelectorAll('.header, .side-menu a, .intro h2, .intro img, .features , .footer-section, .footer-politicas a');

    elements.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transform = "translateY(-20px)";
        
        setTimeout(() => {
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }, index * 150);
    });
};
