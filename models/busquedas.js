const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbpath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado () {
        return this.historial.map( ciudad => {
            let palabras = ciudad.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }

    get paramOpenWheter () {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad (lugar = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${lugar}`,
                params: this.paramOpenWheter
            });

            const resp = await instance.get();

            if (resp) {
                return {
                    'desc': resp.data.weather[0].description,
                    'min':  resp.data.main.temp_min,
                    'max':  resp.data.main.temp_max,
                    'temp': resp.data.main.temp
                };
            } else return false;
        } catch (error) {
            return false;
        }

    }

    agregarHistorial (lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbpath, JSON.stringify(payload));
    }

    leerDB = () => {
        if (!fs.existsSync(this.dbpath)) return;
        
        const info = fs.readFileSync(this.dbpath, { encoding: 'utf-8'});
        const data = JSON.parse( info );
        
        this.historial = data.historial;
    }


}


module.exports = Busquedas;