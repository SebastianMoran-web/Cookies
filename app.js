console.log("CookieLab iniciado");

document.cookie = "prueba=hola; max-age=3600; path=/";
console.log(document.cookie);

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

function mostrarVisitas(idioma, visitas) {
    const parrafo = document.getElementById("visitas");
    parrafo.textContent = idioma === "en"
        ? `You have visited this page ${visitas} times`
        : `Has visitado esta página ${visitas} veces`;
}

    let visitas = obtenerCookie("visitas");

    if(visitas === null) {
        visitas = 1;
    }else{
        visitas = Number(visitas) + 1;

    }

    guardarCookie("visitas", visitas);
    mostrarVisitas(idioma, visitas);

function borrarCookie(nombre) {
    document.cookie = `${nombre}=; max-age=0; path=/`;
}

        document.getElementById("btn-cambiar").addEventListener("click", () => {
        const nuevoNombre = prompt("Introduce tu nuevo nombre:");

        if (nuevoNombre && nuevoNombre.trim() !== "") {
            guardarCookie("usuario", nuevoNombre.trim());
            mostrarSaludo(selectIdioma.value, nuevoNombre.trim(), false);
        }
    });

        document.getElementById("btn-olvidar").addEventListener("click", () => {
        if(confirm("¿Seguro que quieres borrar todos tus datos?")) {
            borrarCookie("usuario");
            borrarCookie("tema");
            borrarCookie("idioma");
            borrarCookie("visitas");
            location.reload();
        }
        
    });
});

