// ==========================================
// 04 - FUNCIONES EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. Función básica
// ------------------------------------------

// Una función permite agrupar código que puede
// ejecutarse varias veces.

function saludar() {
    console.log("Hola, bienvenido a JavaScript.");
}

saludar();


// ------------------------------------------
// 2. Función con parámetro
// ------------------------------------------

// Los parámetros permiten recibir información.

function saludarUsuario(nombre) {
    console.log(`Hola, ${nombre}.`);
}

saludarUsuario("José");
saludarUsuario("Ana");


// ------------------------------------------
// 3. Varios parámetros
// ------------------------------------------

function presentar(nombre, profesion) {
    console.log(`${nombre} es ${profesion}.`);
}

presentar("José", "Analista Programador");
presentar("Ana", "Diseñadora");


// ------------------------------------------
// 4. return
// ------------------------------------------

// return permite devolver un resultado.

function sumar(a, b) {
    return a + b;
}

let resultado = sumar(10, 5);

console.log(`Resultado: ${resultado}`);


// ------------------------------------------
// 5. Utilizar el resultado de una función
// ------------------------------------------

function multiplicar(a, b) {
    return a * b;
}

let precio = 5000;
let cantidad = 3;

let total = multiplicar(precio, cantidad);

console.log(`Total: $${total}`);


// ------------------------------------------
// 6. Parámetros por defecto
// ------------------------------------------

function saludarConIdioma(nombre, idioma = "español") {

    console.log(
        `Hola ${nombre}. Idioma: ${idioma}.`
    );
}

saludarConIdioma("José");
saludarConIdioma("John", "inglés");


// ------------------------------------------
// 7. Funciones con condiciones
// ------------------------------------------

function verificarEdad(edad) {

    if (edad >= 18) {
        return "Mayor de edad";
    }

    return "Menor de edad";
}

console.log(verificarEdad(25));
console.log(verificarEdad(16));


// ------------------------------------------
// 8. Función que devuelve un booleano
// ------------------------------------------

function esMayorDeEdad(edad) {
    return edad >= 18;
}

console.log(esMayorDeEdad(25));
console.log(esMayorDeEdad(15));


// ------------------------------------------
// 9. Función para calcular IVA
// ------------------------------------------

function calcularIVA(precio) {

    const IVA = 0.19;

    return precio * IVA;
}

let precioProducto = 10000;
let impuesto = calcularIVA(precioProducto);

console.log(`IVA: $${impuesto}`);


// ------------------------------------------
// 10. Función para calcular precio final
// ------------------------------------------

function calcularPrecioFinal(precio) {

    const IVA = 0.19;

    return precio + (precio * IVA);
}

console.log(
    `Precio final: $${calcularPrecioFinal(10000)}`
);


// ------------------------------------------
// 11. Función que trabaja con arrays
// ------------------------------------------

function mostrarLenguajes(lenguajes) {

    for (let lenguaje of lenguajes) {
        console.log(`Lenguaje: ${lenguaje}`);
    }
}

let lenguajes = [
    "JavaScript",
    "Python",
    "PHP",
    "Java"
];

mostrarLenguajes(lenguajes);


// ------------------------------------------
// 12. Función para calcular un total
// ------------------------------------------

function calcularTotal(precios) {

    let total = 0;

    for (let precio of precios) {
        total += precio;
    }

    return total;
}

let precios = [5000, 10000, 15000];

console.log(
    `Total: $${calcularTotal(precios)}`
);


// ------------------------------------------
// 13. Función anónima
// ------------------------------------------

// Una función también puede almacenarse
// dentro de una variable.

const despedir = function () {
    console.log("Hasta luego.");
};

despedir();


// ------------------------------------------
// 14. Función flecha
// ------------------------------------------

// Las funciones flecha permiten escribir funciones
// de una forma más corta.

const saludarFlecha = () => {
    console.log("Hola desde una función flecha.");
};

saludarFlecha();


// ------------------------------------------
// 15. Función flecha con parámetros
// ------------------------------------------

const sumarFlecha = (a, b) => {
    return a + b;
};

console.log(
    sumarFlecha(20, 10)
);


// ------------------------------------------
// 16. Función flecha simplificada
// ------------------------------------------

// Cuando solo existe una expresión,
// se puede eliminar return y las llaves.

const restar = (a, b) => a - b;

console.log(
    restar(20, 5)
);


// ------------------------------------------
// 17. Función con un solo parámetro
// ------------------------------------------

// Con un solo parámetro se pueden omitir
// los paréntesis.

const duplicar = numero => numero * 2;

console.log(
    duplicar(10)
);


// ------------------------------------------
// 18. Funciones como argumentos
// ------------------------------------------

// Una función puede recibir otra función
// como parámetro.

function ejecutarOperacion(a, b, operacion) {
    return operacion(a, b);
}

const suma = (a, b) => a + b;

const resta = (a, b) => a - b;

console.log(
    ejecutarOperacion(10, 5, suma)
);

console.log(
    ejecutarOperacion(10, 5, resta)
);


// ------------------------------------------
// 19. Callback
// ------------------------------------------

// Una función que se entrega como argumento
// a otra función se conoce como callback.

function procesarUsuario(nombre, callback) {

    console.log(`Procesando usuario: ${nombre}`);

    callback();
}

procesarUsuario("José", () => {
    console.log("Usuario procesado correctamente.");
});


// ------------------------------------------
// 20. Ejemplo práctico
// ------------------------------------------

function evaluarPostulante(
    conocimientosJavaScript,
    conocimientosSQL,
    experiencia
) {

    if (
        conocimientosJavaScript &&
        conocimientosSQL &&
        experiencia >= 1
    ) {
        return "Postulante compatible";
    }

    return "Postulante requiere más experiencia";
}

console.log(
    evaluarPostulante(true, true, 2)
);

console.log(
    evaluarPostulante(true, false, 0)
);