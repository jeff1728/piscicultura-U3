window.onload = function() {
    const elements = document.querySelectorAll('.logo-section, .login-section, h1, .form, button');

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }, index * 200);
    });
};
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío del formulario por defecto

    // Obtén los valores de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Define los usuarios y contraseñas válidos con sus respectivas redirecciones
    const users = {
        'admin': { password: 'adminpass', redirect: 'peces.html' },
        'manager': { password: 'managerpass', redirect: 'manager-dashboard.html' },
        'employee': { password: 'employeepass', redirect: 'employee-dashboard.html' }
    };

    // Verifica las credenciales
    if (users[username] && users[username].password === password) {
        // Redirige al usuario según su rol
        window.location.href = users[username].redirect;
    } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
        alert('Nombre de usuario o contraseña incorrectos');
    }
});

