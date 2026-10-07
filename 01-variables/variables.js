// ==========================================
// 01 - VARIABLES EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. let
// ------------------------------------------

// let permite declarar una variable cuyo valor puede cambiar.

let nombre = "José";

console.log(nombre);

nombre = "Carlos";

console.log(nombre);


// ------------------------------------------
// 2. const
// ------------------------------------------

// const permite declarar una variable cuyo valor no puede ser reasignado.

const edad = 25;

console.log(edad);

// Esto produciría un error:
// edad = 30;


// ------------------------------------------
// 3. Tipos de datos básicos
// ------------------------------------------

// String
let lenguaje = "JavaScript";

// Number
let experiencia = 2;

// Boolean
let trabaja = false;

// Undefined
let proyecto;

// Null
let cliente = null;

console.log(lenguaje);
console.log(experiencia);
console.log(trabaja);
console.log(proyecto);
console.log(cliente);


// ------------------------------------------
// 4. typeof
// ------------------------------------------

// typeof permite conocer el tipo de dato.

console.log(typeof lenguaje);    // string
console.log(typeof experiencia); // number
console.log(typeof trabaja);     // boolean
console.log(typeof proyecto);    // undefined
console.log(typeof cliente);     // object


// ------------------------------------------
// 5. Variables relacionadas
// ------------------------------------------

let nombreDesarrollador = "José";
let profesion = "Analista Programador";
let ciudad = "Santiago";
let disponible = true;

console.log(nombreDesarrollador);
console.log(profesion);
console.log(ciudad);
console.log(disponible);


// ------------------------------------------
// 6. Template literals
// ------------------------------------------

// Permiten insertar variables dentro de un texto.

console.log(
    `Mi nombre es ${nombreDesarrollador} y soy ${profesion}.`
);

console.log(
    `Vivo en ${ciudad} y estoy disponible: ${disponible}.`
);


// ------------------------------------------
// 7. Operaciones con variables
// ------------------------------------------

let precio = 15000;
let cantidad = 3;

let total = precio * cantidad;

console.log(`Total: $${total}`);


// ------------------------------------------
// 8. Constantes para configuración
// ------------------------------------------

const IVA = 0.19;
const precioProducto = 10000;

const impuesto = precioProducto * IVA;
const precioFinal = precioProducto + impuesto;

console.log(`Impuesto: $${impuesto}`);
console.log(`Precio final: $${precioFinal}`);


// ------------------------------------------
// 9. Buenas prácticas
// ------------------------------------------

// Usa nombres descriptivos.

let nombreCliente = "Empresa ABC";
let cantidadProductos = 5;
let totalCompra = 50000;

// Evita nombres poco descriptivos como:

// let x = 5;
// let a = "José";

console.log(nombreCliente);
console.log(cantidadProductos);
console.log(totalCompra);