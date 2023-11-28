// ES: Todas las funciones de interacción consola-usuario
// EN: All functions that interacts with the user at the console
const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices:  [
            {
                value: 1,
                name: `${'1'.brightYellow}. Buscar una Ciudad`
            },
            {
                value: 2,
                name: `${'2'.brightYellow}. Historial de Búsquedas`
            },
            {
                value: 0,
                name: `${'0'.brightYellow}. Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('============================='.brightGreen);
    console.log('    Seleccione una opción'.brightYellow);
    console.log('=============================\n'.brightGreen);   

    const { opcion } = await inquirer.prompt(preguntas);

    return(opcion);

}

const pausa = async() => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.brightYellow} para continuar`
    }];

    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if (value.length === 0) {
                    return `\n${'Por favor ingrese un valor'.brightRed}`;
                }
                return true;
            }
        }
]
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

        console.clear();

        const choices = tareas.map ( (tarea, i) => {
            
            const idx = `${i + 1}.`.brightYellow;

            return {
                value: tarea.id,
                name: `${idx} ${tarea.desc}`,
            }
        })

        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: '\nSeleccione la tarea a borrar',
                choices
            }
        ]

        const { id } = await inquirer.prompt(preguntas);
        return ( id );
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

    console.clear();

    const choices = tareas.map ( (tarea, i) => {
        
        const idx = `${i + 1}.`.brightYellow;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '\nSeleccione la(s) tarea(s) a completar',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ( ids );
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}