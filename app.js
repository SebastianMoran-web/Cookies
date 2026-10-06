console.log("CookieLab iniciado");

const nombre = prompt("Introduce tu nombre:");

if (nombre && nombre.trim() !== "") {
    const maxAge = 30 * 24 * 60 * 60;
    
    document.cookie = `usuario=${encodeURIComponent(nombre.trim())}; max-age=${maxAge}; path=/; SameSite=Lax`;

    alert(`¡Bienvenido/a, ${nombre.trim()}!`);
}
