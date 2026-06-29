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

if (!lista || lista.length < 1)
    throw "Sin historial";

const margen = 40;

const ancho = 900 - margen * 2;

const alto = 350 - margen * 2;

const precios = lista.map(x => x.vale);

const max = Math.max(...precios);

const min = Math.min(...precios);

let puntos = "";

for (let i = 0; i < lista.length; i++) {

    const x =
        margen +
        (lista.length > 1 ? i * (ancho / (lista.length - 1)) : ancho / 2);

    const y =
        margen +
        (max > min ? (max - lista[i].vale) * alto / (max - min) : alto / 2);

    puntos += x + "," + y + " ";

}

if (lista.length > 1) {
    svg.innerHTML +=
    `<polyline
    fill="none"
    stroke="orange"
    stroke-width="3"
    points="${puntos}"/>`;
}

for (let i = 0; i < lista.length; i++) {

    const x =
        margen +
        (lista.length > 1 ? i * (ancho / (lista.length - 1)) : ancho / 2);

    const y =
        margen +
        (max > min ? (max - lista[i].vale) * alto / (max - min) : alto / 2);

    svg.innerHTML +=

    `<circle
        cx="${x}"
        cy="${y}"
        r="5"
        fill="red">
    </circle>`;

}

// Generar tabla de historial
const tabla = document.getElementById("tabla-historial");
let htmlTabla = `
    <table>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Vale (€)</th>
                <th>Efectivo (€)</th>
            </tr>
        </thead>
        <tbody>
`;

for (const entrada of lista) {
    htmlTabla += `
            <tr>
                <td>${entrada.fecha}</td>
                <td>${entrada.vale}</td>
                <td>${entrada.efectivo}</td>
            </tr>
    `;
}

htmlTabla += `
        </tbody>
    </table>
`;

tabla.innerHTML = htmlTabla;
