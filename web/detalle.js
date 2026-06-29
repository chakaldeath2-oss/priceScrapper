const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const juego = juegos.find(g => g.id == id);

document.getElementById("titulo").textContent =
    juego.nombre;

document.getElementById("precio").textContent =
    juego.precioVale + " €";

document.getElementById("imagen").src =
    juego.imagen;

const svg = document.getElementById("grafico");

const datos = historial.find(h => h.id == id);

if (!datos) {

    alert("No hay historial.");

    throw "";

}

const lista = datos.historial;

if (!datos || lista.length < 2)
    throw "Sin historial";

const margen = 40;

const ancho = 900 - margen * 2;

const alto = 350 - margen * 2;

const precios = datos.map(x => x.precio);

const max = Math.max(...precios);

const min = Math.min(...precios);

let puntos = "";

for (let i = 0; i < lista.length; i++) {

    const x =
        margen +
        i * (ancho / (lista.length - 1));

    const y =
        margen +
        (max - lista[i].vale)
        * alto
        / (max - min || 1);

    puntos += x + "," + y + " ";

}

svg.innerHTML +=
`<polyline
fill="none"
stroke="orange"
stroke-width="3"
points="${puntos}"/>`;

for (let i = 0; i < lista.length; i++) {

    const x =
        margen +
        i * (ancho / (lista.length - 1));

    const y =
        margen +
        (max - lista[i].vale)
        * alto
        / (max - min || 1);

    svg.innerHTML +=

    `<circle
        cx="${x}"
        cy="${y}"
        r="5"
        fill="red">
    </circle>`;

}