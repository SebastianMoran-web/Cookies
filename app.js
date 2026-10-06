console.log("CookieLab iniciado");

const nombre = prompt("Introduce tu nombre:");

if (nombre && nombre.trim() !== "") {
    const maxAge = 30 * 24 * 60 * 60;
    
    document.cookie = `usuario=${encodeURIComponent(nombre.trim())}; max-age=${maxAge}; path=/; SameSite=Lax`;

    alert(`¡Bienvenido/a, ${nombre.trim()}!`);
}

function obtenerCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [clave, valor] = cookie.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

function guardarCookie(nombre, valor) {
    const maxAge = 30 * 24 * 60 * 60; 
    document.cookie = `${nombre}=${encodeURIComponent(valor)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

window.addEventListener("DOMContentLoaded", () => {
    const contenedorSaludo = document.getElementById("saludo");
    const usuarioExistente = obtenerCookie("usuario");

    if (usuarioExistente) {

        contenedorSaludo.textContent = `Hola de nuevo, ${usuarioExistente}`;
    } else {

        const nuevoNombre = prompt("Introduce tu nombre:");
        
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            const nombreLimpio = nuevoNombre.trim();
            guardarCookie("usuario", nombreLimpio);
            contenedorSaludo.textContent = `¡Bienvenido/a, ${nombreLimpio}!`;
        } else {
            contenedorSaludo.textContent = "Bienvenido/a, visitante anónimo";
        }
    }
});
