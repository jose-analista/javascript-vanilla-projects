// ==========================================
// 02 - CONDICIONALES EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. if
// ------------------------------------------

// if permite ejecutar código cuando una condición es verdadera.

let edad = 25;

if (edad >= 18) {
    console.log("Es mayor de edad.");
}


// ------------------------------------------
// 2. if / else
// ------------------------------------------

let tieneDocumento = true;

if (tieneDocumento) {
    console.log("Puede ingresar.");
} else {
    console.log("No puede ingresar.");
}


// ------------------------------------------
// 3. if / else con comparación
// ------------------------------------------

let edadUsuario = 17;

if (edadUsuario >= 18) {
    console.log("Puede votar.");
} else {
    console.log("No puede votar.");
}


// ------------------------------------------
// 4. else if
// ------------------------------------------

let nota = 6;

if (nota >= 6) {
    console.log("Excelente.");
} else if (nota >= 4) {
    console.log("Aprobado.");
} else {
    console.log("Reprobado.");
}


// ------------------------------------------
// 5. Operadores de comparación
// ------------------------------------------

let numero = 10;

console.log(numero == 10);   // Igualdad de valor
console.log(numero === 10);  // Igualdad de valor y tipo
console.log(numero != 5);    // Diferente
console.log(numero !== 5);   // Diferente valor o tipo
console.log(numero > 5);     // Mayor que
console.log(numero < 20);    // Menor que
console.log(numero >= 10);   // Mayor o igual
console.log(numero <= 10);   // Menor o igual


// ------------------------------------------
// 6. Diferencia entre == y ===
// ------------------------------------------

let valor = "25";

console.log(valor == 25);   // true
console.log(valor === 25);  // false

// === es recomendable porque también compara el tipo de dato.


// ------------------------------------------
// 7. Operador AND (&&)
// ------------------------------------------

// Todas las condiciones deben cumplirse.

let edadCliente = 25;
let tieneLicencia = true;

if (edadCliente >= 18 && tieneLicencia) {
    console.log("Puede conducir.");
} else {
    console.log("No puede conducir.");
}


// ------------------------------------------
// 8. Operador OR (||)
// ------------------------------------------

// Al menos una condición debe cumplirse.

let tieneExperiencia = false;
let tieneTitulo = true;

if (tieneExperiencia || tieneTitulo) {
    console.log("Puede postular al cargo.");
} else {
    console.log("No cumple los requisitos.");
}


// ------------------------------------------
// 9. Operador NOT (!)
// ------------------------------------------

// Invierte un valor booleano.

let usuarioBloqueado = false;

if (!usuarioBloqueado) {
    console.log("El usuario puede acceder.");
}


// ------------------------------------------
// 10. Varias condiciones
// ------------------------------------------

let edadPostulante = 25;
let experiencia = 2;
let tieneTituloTecnico = true;

if (
    edadPostulante >= 18 &&
    experiencia >= 1 &&
    tieneTituloTecnico
) {
    console.log("El postulante cumple los requisitos.");
} else {
    console.log("El postulante no cumple los requisitos.");
}


// ------------------------------------------
// 11. Condiciones con strings
// ------------------------------------------

let lenguaje = "JavaScript";

if (lenguaje === "JavaScript") {
    console.log("Estás aprendiendo JavaScript.");
} else {
    console.log("Estás aprendiendo otro lenguaje.");
}


// ------------------------------------------
// 12. Condición ternaria
// ------------------------------------------

// La expresión ternaria permite escribir una condición
// sencilla en una sola línea.

let edadPersona = 20;

let resultado = edadPersona >= 18
    ? "Mayor de edad"
    : "Menor de edad";

console.log(resultado);


// ------------------------------------------
// 13. Valores truthy y falsy
// ------------------------------------------

// JavaScript considera algunos valores como falsos
// cuando se utilizan dentro de una condición.
//
// Valores falsy comunes:
// false
// 0
// ""
// null
// undefined
// NaN

let nombre = "";

if (nombre) {
    console.log("El nombre tiene contenido.");
} else {
    console.log("El nombre está vacío.");
}


// ------------------------------------------
// 14. Ejemplo práctico
// ------------------------------------------

let usuario = "José";
let contraseñaCorrecta = true;

if (usuario === "José" && contraseñaCorrecta) {
    console.log("Inicio de sesión exitoso.");
} else {
    console.log("Usuario o contraseña incorrectos.");
}


// ------------------------------------------
// 15. Ejemplo para reclutadores
// ------------------------------------------

let conocimientosJavaScript = true;
let conocimientosSQL = true;
let experienciaProyectos = true;

if (
    conocimientosJavaScript &&
    conocimientosSQL &&
    experienciaProyectos
) {
    console.log("Perfil técnico compatible.");
} else {
    console.log("El perfil necesita más conocimientos.");
}