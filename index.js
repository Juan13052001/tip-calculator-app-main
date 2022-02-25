const factura = document.querySelector("#monto"),
    custom = document.querySelector("#custom-input"),
    numeroPersonas = document.querySelector("#personas"),
    cantidadTotal = document.querySelector("#cantidad-total"),
    montoTotal = document.querySelector("#monto-total"),
    botonReset = document.querySelector(".reset"),
    propinas = document.querySelectorAll(".propina"),
    mensajeError = document.querySelector(".hidden");
montoTotal.innerHTML = `${(0.0).toFixed(2)}`;
cantidadTotal.innerHTML = `${(0.0).toFixed(2)}`;

factura.addEventListener("input", facturaInput);

numeroPersonas.addEventListener("input", numeroPersonasInput);

propinas.forEach((val) => {
    val.addEventListener("click", calcularPorcentaje);
});

botonReset.addEventListener("click", reset);

custom.addEventListener("input", customInput);

factura.value = "0.0";

numeroPersonas.value = "1";

cantidadTotal.innerHTML = `$${(0.0).toFixed(2)}`;

montoTotal.innerHTML = `$${(0.0).toFixed(2)}`;

let facturaValor = 0.0;

let personasValor = 1;

let propinaValor = 0.15;

function facturaInput() {
    facturaValor = parseFloat(factura.value);
    calcularPropina();
}
function customInput() {
    propinaValor = parseFloat(custom.value / 100);
    propinas.forEach((val) => {
        val.classList.remove("active");
    });
    calcularPropina();
}

function numeroPersonasInput() {
    personasValor = parseFloat(numeroPersonas.value);
    if (personasValor < 1) {
        mensajeError.classList.add("hidden-active");
        numeroPersonas.classList.add("error");
    } else {
        mensajeError.classList.remove("hidden-active");
        numeroPersonas.classList.remove("error");
        calcularPropina();
    }
}

function calcularPorcentaje(event) {
    propinas.forEach(function (val) {
        val.classList.remove("active");
        if (event.target.innerHTML == val.innerHTML) {
            val.classList.add("active");
            propinaValor = parseFloat(val.innerHTML) / 100;
        }
    });
    calcularPropina();
}

function calcularPropina() {
    if (personasValor >= 1) {
        let tipAmount = (facturaValor * propinaValor) / personasValor;
        let total = (facturaValor + tipAmount) / personasValor;
        montoTotal.innerHTML = "$" + tipAmount.toFixed(2);
        cantidadTotal.innerHTML = "$" + total.toFixed(2);
    }
}

function reset() {
    factura.value = "0.0";
    facturaInput();
    numeroPersonas.value = "1";
    numeroPersonasInput();
    custom.value = "";
}
