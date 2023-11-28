// ES: Paquete que facilita el manejo de variables de entorno
// EN: It Loads environment variables from a .env file into process.env
require('dotenv').config();

// ES: Funciones asíncronas de interfaz con el usuario
// EN: Async functions as interface with the user
const { leerInput,
        inquirerMenu,
        pausa } = require("./helpers/inquirers"); 

// ES: La clase que maneja la busqueda de la info de la ciudad
// EN: The class that handle searching the related info of the city
const Busquedas = require('./models/busquedas');

// ES: El código principal estará en main y es una función asíncrona
// EN: The main code implemented with an asyncronic function
const main = async() => {

    const busquedas = new Busquedas();
    let opt;
 
// ES: Mostramos el menu de manera repetitiva hasta que el usuario finalice.
// EN: The menu is shown until the user exits.
    do {
        // ES: Mostrar el menú y obtener la opción seleccionada por el usuario.
        // EN: Show up the menu and get the selected option from the user.
        opt = await inquirerMenu();
        
        switch (opt) {
            // ES: Opción 1 -> Buscar una ciudad.
            // EN: Option 1 -> Search for a city name.
            case 1:
                // ES: Solicitar la ciudad a consultar
                // EN: Request the city to gather the info
                const lugar = await leerInput('Ciudad?: ')
                // ES: Método de la clase para hacer el request al endpoint
                // EN: Requesting de info to the endpoint via this class method
                const result = await busquedas.ciudad(lugar);
                
                if (result) {
                    // ES: Cada resultado exitoso se guarda en el arreglo de persistencia
                    // EN: Each good result is appended to the persistence array
                    busquedas.agregarHistorial(lugar)

                    // ES: Se muestra la info en diferentes colores dependiendo de la temperatura
                    // EN: Showing the info depending on the temperature value
                    console.log(`\nInformación de la ciudad de ${lugar}\n`.brightGreen);
                    if (result.temp >= 25) {
                        console.log(`Temperatura: ${result.temp}`.magenta);
                    } else {
                        console.log(`Temperatura: ${result.temp}`.brightWhite);
                    }
                    if (result.min >= 25) {
                        console.log(`Temperatura: ${result.min}`.magenta);
                    } else {
                        console.log(`Temperatura: ${result.min}`.brightWhite);
                    }
                    if (result.min >= 25) {
                        console.log(`Temperatura: ${result.max}`.magenta);
                    } else {
                        console.log(`Temperatura: ${result.max}`.brightWhite);
                    }
                    console.log(`El clima: ` + `${result.desc}`.brightYellow.bold);
                } else {
                    console.log('\nCiudad errada o no existe\n'.brightRed);
                }
            break;
            // ES: Opción 2 -> Mostrar el historial de búsquedas.
            // EN: Option 2 -> To list the history of recent searches.
            case 2:
                console.log('\n');
                busquedas.historialCapitalizado.forEach ((ciudad, index) => {
                    const idx = `${index + 1}. `.brightYellow;
                    console.log(`${idx} ${ciudad}`);
                })
            break;
        }
        if (opt !== 0) await pausa();

    } while (opt != 0);
    console.log('\n');
}

main();