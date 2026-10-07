// ==========================================
// 05 - ARRAYS EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. Crear un array
// ------------------------------------------

// Un array permite almacenar varios valores
// dentro de una misma variable.

let lenguajes = [
    "JavaScript",
    "Python",
    "PHP",
    "Java"
];

console.log(lenguajes);


// ------------------------------------------
// 2. Acceder a elementos
// ------------------------------------------

// Los índices comienzan desde 0.

console.log(lenguajes[0]);
console.log(lenguajes[1]);
console.log(lenguajes[2]);


// ------------------------------------------
// 3. Modificar elementos
// ------------------------------------------

lenguajes[2] = "C#";

console.log(lenguajes);


// ------------------------------------------
// 4. Propiedad length
// ------------------------------------------

console.log(`Cantidad de lenguajes: ${lenguajes.length}`);


// ------------------------------------------
// 5. Agregar elementos con push
// ------------------------------------------

// push agrega elementos al final.

lenguajes.push("C++");

console.log(lenguajes);


// ------------------------------------------
// 6. Agregar elementos con unshift
// ------------------------------------------

// unshift agrega elementos al principio.

lenguajes.unshift("TypeScript");

console.log(lenguajes);


// ------------------------------------------
// 7. Eliminar con pop
// ------------------------------------------

// pop elimina el último elemento.

lenguajes.pop();

console.log(lenguajes);


// ------------------------------------------
// 8. Eliminar con shift
// ------------------------------------------

// shift elimina el primer elemento.

lenguajes.shift();

console.log(lenguajes);


// ------------------------------------------
// 9. Recorrer un array con for
// ------------------------------------------

for (let i = 0; i < lenguajes.length; i++) {
    console.log(`Lenguaje: ${lenguajes[i]}`);
}


// ------------------------------------------
// 10. Recorrer con for...of
// ------------------------------------------

for (let lenguaje of lenguajes) {
    console.log(`Tecnología: ${lenguaje}`);
}


// ------------------------------------------
// 11. forEach
// ------------------------------------------

// forEach ejecuta una función para cada elemento.

lenguajes.forEach((lenguaje) => {
    console.log(`forEach: ${lenguaje}`);
});


// ------------------------------------------
// 12. includes
// ------------------------------------------

// Permite comprobar si existe un elemento.

console.log(
    lenguajes.includes("Python")
);

console.log(
    lenguajes.includes("Ruby")
);


// ------------------------------------------
// 13. indexOf
// ------------------------------------------

// Devuelve la posición de un elemento.
// Si no existe, devuelve -1.

console.log(
    lenguajes.indexOf("PHP")
);

console.log(
    lenguajes.indexOf("Ruby")
);


// ------------------------------------------
// 14. join
// ------------------------------------------

// Convierte los elementos del array en texto.

console.log(
    lenguajes.join(", ")
);


// ------------------------------------------
// 15. slice
// ------------------------------------------

// slice permite obtener una parte del array
// sin modificar el array original.

let lenguajesSeleccionados = lenguajes.slice(0, 2);

console.log(lenguajesSeleccionados);
console.log(lenguajes);


// ------------------------------------------
// 16. splice
// ------------------------------------------

// splice permite eliminar o agregar elementos.

let tecnologias = [
    "JavaScript",
    "Python",
    "PHP",
    "Java"
];

tecnologias.splice(2, 1);

console.log(tecnologias);


// ------------------------------------------
// 17. map
// ------------------------------------------

// map crea un nuevo array transformando
// cada elemento.

let numeros = [1, 2, 3, 4, 5];

let cuadrados = numeros.map((numero) => {
    return numero * numero;
});

console.log(cuadrados);


// ------------------------------------------
// 18. map simplificado
// ------------------------------------------

let dobles = numeros.map(numero => numero * 2);

console.log(dobles);


// ------------------------------------------
// 19. filter
// ------------------------------------------

// filter crea un nuevo array solamente con
// los elementos que cumplen una condición.

let edades = [15, 18, 21, 25, 30];

let mayoresDeEdad = edades.filter(
    edad => edad >= 18
);

console.log(mayoresDeEdad);


// ------------------------------------------
// 20. find
// ------------------------------------------

// find devuelve el primer elemento que
// cumple una condición.

let edadEncontrada = edades.find(
    edad => edad >= 18
);

console.log(edadEncontrada);


// ------------------------------------------
// 21. findIndex
// ------------------------------------------

let posicion = edades.findIndex(
    edad => edad >= 18
);

console.log(posicion);


// ------------------------------------------
// 22. some
// ------------------------------------------

// Devuelve true si al menos un elemento
// cumple la condición.

let tieneMenor = edades.some(
    edad => edad < 18
);

console.log(tieneMenor);


// ------------------------------------------
// 23. every
// ------------------------------------------

// Devuelve true si todos los elementos
// cumplen la condición.

let todosMayores = edades.every(
    edad => edad >= 18
);

console.log(todosMayores);


// ------------------------------------------
// 24. reduce
// ------------------------------------------

// reduce permite transformar un array
// en un único resultado.

let precios = [
    5000,
    10000,
    15000,
    20000
];

let total = precios.reduce(
    (acumulador, precio) => acumulador + precio,
    0
);

console.log(`Total: $${total}`);


// ------------------------------------------
// 25. sort
// ------------------------------------------

// sort permite ordenar elementos.

let nombres = [
    "Carlos",
    "José",
    "Ana",
    "Pedro"
];

nombres.sort();

console.log(nombres);


// ------------------------------------------
// 26. Ordenar números
// ------------------------------------------

// Por defecto sort trabaja como texto,
// por eso debemos indicar cómo comparar.

let numerosDesordenados = [
    10,
    2,
    30,
    5,
    1
];

numerosDesordenados.sort(
    (a, b) => a - b
);

console.log(numerosDesordenados);


// ------------------------------------------
// 27. reverse
// ------------------------------------------

let ordenados = [1, 2, 3, 4, 5];

ordenados.reverse();

console.log(ordenados);


// ------------------------------------------
// 28. Copiar un array con spread
// ------------------------------------------

let tecnologiasOriginales = [
    "JavaScript",
    "Python",
    "PHP"
];

let tecnologiasCopia = [
    ...tecnologiasOriginales
];

tecnologiasCopia.push("Java");

console.log(tecnologiasOriginales);
console.log(tecnologiasCopia);


// ------------------------------------------
// 29. Combinar arrays
// ------------------------------------------

let frontend = [
    "HTML",
    "CSS",
    "JavaScript"
];

let backend = [
    "PHP",
    "Laravel",
    "Python"
];

let tecnologiasFullStack = [
    ...frontend,
    ...backend
];

console.log(tecnologiasFullStack);


// ------------------------------------------
// 30. Arrays de objetos
// ------------------------------------------

// Los arrays pueden almacenar objetos.

let desarrolladores = [
    {
        nombre: "José",
        lenguaje: "JavaScript"
    },
    {
        nombre: "Ana",
        lenguaje: "Python"
    },
    {
        nombre: "Carlos",
        lenguaje: "PHP"
    }
];

console.log(desarrolladores);


// ------------------------------------------
// 31. Recorrer arrays de objetos
// ------------------------------------------

desarrolladores.forEach((desarrollador) => {

    console.log(
        `${desarrollador.nombre} - ${desarrollador.lenguaje}`
    );

});


// ------------------------------------------
// 32. filter con objetos
// ------------------------------------------

let desarrolladoresJavaScript =
    desarrolladores.filter(
        desarrollador =>
            desarrollador.lenguaje === "JavaScript"
    );

console.log(desarrolladoresJavaScript);


// ------------------------------------------
// 33. map con objetos
// ------------------------------------------

let nombresDesarrolladores =
    desarrolladores.map(
        desarrollador => desarrollador.nombre
    );

console.log(nombresDesarrolladores);


// ------------------------------------------
// 34. Ejemplo práctico
// ------------------------------------------

let proyectos = [
    {
        nombre: "Sistema de gestión",
        tecnologia: "Laravel",
        completado: true
    },
    {
        nombre: "Aplicación Android",
        tecnologia: "Java",
        completado: false
    },
    {
        nombre: "API REST",
        tecnologia: "Python",
        completado: true
    }
];

let proyectosCompletados =
    proyectos.filter(
        proyecto => proyecto.completado
    );

console.log("Proyectos completados:");

proyectosCompletados.forEach((proyecto) => {

    console.log(
        `${proyecto.nombre} - ${proyecto.tecnologia}`
    );

});


// ------------------------------------------
// 35. Ejemplo para Analista Programador
// ------------------------------------------

let ventas = [
    15000,
    25000,
    10000,
    30000,
    20000
];

let totalVentas = ventas.reduce(
    (total, venta) => total + venta,
    0
);

let ventasSobre20Mil = ventas.filter(
    venta => venta > 20000
);

console.log(`Total de ventas: $${totalVentas}`);

console.log(
    `Ventas sobre $20.000: ${ventasSobre20Mil}`
);