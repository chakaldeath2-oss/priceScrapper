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

const margen = 80;

const ancho = 900 - margen * 2;

const alto = 350 - margen * 2;

const precios = lista.map(x => x.vale);

const max = Math.max(...precios);

const min = Math.min(...precios);

let puntos = "";

// Calcular puntos del gráfico
for (let i = 0; i < lista.length; i++) {

    const x =
        margen +
        (lista.length > 1 ? i * (ancho / (lista.length - 1)) : ancho / 2);

    const y =
        margen +
        (max > min ? (max - lista[i].vale) * alto / (max - min) : alto / 2);

    puntos += x + "," + y + " ";

}

// Dibujar ejes
// Eje X (horizontal)
svg.innerHTML +=
`<line
    x1="${margen}"
    y1="${margen + alto}"
    x2="${margen + ancho}"
    y2="${margen + alto}"
    stroke="black"
    stroke-width="2"/>`;

// Eje Y (vertical)
svg.innerHTML +=
`<line
    x1="${margen}"
    y1="${margen}"
    x2="${margen}"
    y2="${margen + alto}"
    stroke="black"
    stroke-width="2"/>`;

// Etiquetas del eje Y (precios)
const numIntervalos = 5;
for (let i = 0; i <= numIntervalos; i++) {
    const precio = min + (max - min) * (numIntervalos - i) / numIntervalos;
    const y = margen + i * (alto / numIntervalos);
    
    svg.innerHTML +=
    `<text
        x="${margen - 10}"
        y="${y + 4}"
        text-anchor="end"
        font-size="12"
        fill="black">
        ${precio.toFixed(0)}€
    </text>`;
    
    // Línea de rejilla horizontal
    svg.innerHTML +=
    `<line
        x1="${margen}"
        y1="${y}"
        x2="${margen + ancho}"
        y2="${y}"
        stroke="#e0e0e0"
        stroke-width="1"
        stroke-dasharray="5,5"/>`;
}

// Etiquetas del eje X (fechas)
for (let i = 0; i < lista.length; i++) {
    const x = margen + (lista.length > 1 ? i * (ancho / (lista.length - 1)) : ancho / 2);
    const fecha = lista[i].fecha;
    const fechaCorta = fecha.split(" ")[0]; // YYYY-MM-DD
    
    svg.innerHTML +=
    `<text
        x="${x}"
        y="${margen + alto + 25}"
        text-anchor="middle"
        font-size="11"
        fill="black">
        ${fechaCorta}
    </text>`;
}

// Etiqueta del eje Y
svg.innerHTML +=
`<text
    x="${20}"
    y="${margen + alto / 2}"
    text-anchor="middle"
    font-size="14"
    fill="black"
    transform="rotate(-90 20 ${margen + alto / 2})">
    Precio (€)
</text>`;

// Dibujar la línea del gráfico
if (lista.length > 1) {
    svg.innerHTML +=
    `<polyline
    fill="none"
    stroke="orange"
    stroke-width="3"
    points="${puntos}"/>`;
}

// Dibujar los puntos
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
