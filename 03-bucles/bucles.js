// ==========================================
// 03 - BUCLES EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. Bucle for
// ------------------------------------------

// for permite repetir un bloque de código
// mientras se cumpla una condición.

for (let i = 1; i <= 5; i++) {
    console.log(`Número: ${i}`);
}


// ------------------------------------------
// 2. Contar hacia atrás
// ------------------------------------------

for (let i = 5; i >= 1; i--) {
    console.log(`Cuenta regresiva: ${i}`);
}


// ------------------------------------------
// 3. Incrementar de 2 en 2
// ------------------------------------------

for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}


// ------------------------------------------
// 4. Bucle while
// ------------------------------------------

// while ejecuta el código mientras la condición
// sea verdadera.

let contador = 1;

while (contador <= 5) {
    console.log(`Contador: ${contador}`);

    contador++;
}


// ------------------------------------------
// 5. Bucle while con condición
// ------------------------------------------

let numero = 10;

while (numero > 0) {
    console.log(`Número: ${numero}`);

    numero -= 2;
}


// ------------------------------------------
// 6. Bucle do...while
// ------------------------------------------

// do...while ejecuta el código al menos una vez,
// incluso si la condición inicialmente es falsa.

let edad = 20;

do {
    console.log(`Edad: ${edad}`);

    edad++;
} while (edad < 23);


// ------------------------------------------
// 7. break
// ------------------------------------------

// break detiene completamente el bucle.

for (let i = 1; i <= 10; i++) {

    if (i === 6) {
        break;
    }

    console.log(i);
}


// ------------------------------------------
// 8. continue
// ------------------------------------------

// continue salta la iteración actual
// y continúa con la siguiente.

for (let i = 1; i <= 10; i++) {

    if (i === 5) {
        continue;
    }

    console.log(i);
}


// ------------------------------------------
// 9. Recorrer un array con for
// ------------------------------------------

let lenguajes = [
    "JavaScript",
    "Python",
    "PHP",
    "Java"
];

for (let i = 0; i < lenguajes.length; i++) {
    console.log(lenguajes[i]);
}


// ------------------------------------------
// 10. Recorrer un array con for...of
// ------------------------------------------

// for...of permite obtener directamente
// cada elemento del array.

for (let lenguaje of lenguajes) {
    console.log(`Lenguaje: ${lenguaje}`);
}


// ------------------------------------------
// 11. Recorrer un objeto con for...in
// ------------------------------------------

// for...in permite recorrer las propiedades
// de un objeto.

let desarrollador = {
    nombre: "José",
    profesion: "Analista Programador",
    experiencia: 2
};

for (let propiedad in desarrollador) {
    console.log(`${propiedad}: ${desarrollador[propiedad]}`);
}


// ------------------------------------------
// 12. Bucle dentro de otro bucle
// ------------------------------------------

// Los bucles pueden estar anidados.

for (let fila = 1; fila <= 3; fila++) {

    for (let columna = 1; columna <= 3; columna++) {
        console.log(`Fila: ${fila} - Columna: ${columna}`);
    }
}


// ------------------------------------------
// 13. Ejemplo práctico: números pares
// ------------------------------------------

for (let i = 1; i <= 20; i++) {

    if (i % 2 === 0) {
        console.log(`Número par: ${i}`);
    }
}


// ------------------------------------------
// 14. Ejemplo práctico: buscar un elemento
// ------------------------------------------

let usuarios = [
    "José",
    "Pedro",
    "Ana",
    "Carlos"
];

let usuarioBuscado = "Ana";

for (let usuario of usuarios) {

    if (usuario === usuarioBuscado) {
        console.log(`Usuario encontrado: ${usuario}`);
        break;
    }
}


// ------------------------------------------
// 15. Ejemplo práctico: calcular total
// ------------------------------------------

let precios = [
    5000,
    10000,
    15000,
    20000
];

let total = 0;

for (let precio of precios) {
    total += precio;
}

console.log(`Total: $${total}`);


// ------------------------------------------
// 16. Ejemplo práctico para Analista Programador
// ------------------------------------------

let proyectos = [
    "Sistema Laravel",
    "API REST",
    "Aplicación Android",
    "Automatización Python"
];

for (let i = 0; i < proyectos.length; i++) {

    console.log(
        `Proyecto ${i + 1}: ${proyectos[i]}`
    );
}