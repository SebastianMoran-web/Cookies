console.log("CookieLab iniciado");

document.cookie = "usuario=; max-age=0; path=/";

function guardarCookie(nombre, valor) {
    const maxAge = 30 * 24 * 60 * 60; 
    document.cookie = `${nombre}=${encodeURIComponent(valor)}; max-age=${maxAge}; path=/; SameSite=Lax`;
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

function aplicarTema(tema) {
    document.body.classList.toggle("oscuro", tema === "oscuro");
}

function mostrarSaludo(idioma, nombre, primeraVisita) {
    const saludo = document.getElementById("saludo");
    if (idioma === "en") {
        saludo.textContent = primeraVisita
            ? `Welcome, ${nombre}!`
            : `Welcome back, ${nombre}`;
    } else {
        saludo.textContent = primeraVisita
            ? `¡Bienvenido/a, ${nombre}!`
            : `Hola de nuevo, ${nombre}`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const selectTema = document.getElementById("select-tema");
    const selectIdioma = document.getElementById("select-idioma");

    const tema = obtenerCookie("tema") || "claro";
    const idioma = obtenerCookie("idioma") || "es";
    selectTema.value = tema;
    selectIdioma.value = idioma;
    aplicarTema(tema);

    const usuario = obtenerCookie("usuario");

    if (usuario) {
        mostrarSaludo(idioma, usuario, false);
    } else {
        const nombre = prompt("Introduce tu nombre:");

        if (nombre && nombre.trim() !== "") {
            guardarCookie("usuario", nombre.trim());
            alert(`¡Bienvenido/a, ${nombre.trim()}!`);
            mostrarSaludo(idioma, nombre.trim(), true);
        }
    }

    selectTema.addEventListener("change", (e) => {
        guardarCookie("tema", e.target.value);
        aplicarTema(e.target.value);
    });

    selectIdioma.addEventListener("change", (e) => {
        guardarCookie("idioma", e.target.value);
        const nombreActual = obtenerCookie("usuario");
        if (nombreActual) {
            mostrarSaludo(e.target.value, nombreActual, false);
        }
    });
});