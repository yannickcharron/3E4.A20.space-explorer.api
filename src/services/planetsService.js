import dayjs from 'dayjs';

import Planet from '../models/planet.js';

const ZERO_KELVIN = -273.15;

class PlanetsService {
    //C => Create
    //R => Retrieve
    //U => Update
    //D => Delete

    create(planet) {
        return Planet.create(planet);
    }

    delete(idPlanet) {
        return Planet.findByIdAndDelete(idPlanet);
    }

    update(idPLanet, planet) {
        //return Planet.findByIdAndUpdate()
    }

    retrieveByCriteria(criteria) {

        // Les critères sont ajoutés avec un ET
        /*const testCriteria = {
            discoveredBy: 'Skadex',
            temperature: { $gt: 240 },
            'position.y': { $lt: 500 }
        }*/

        /*const testCriteria = {
            $or: [{ discoveredBy: 'Skadex' }, { temperature: { $gt: 240 } }]
        }*/

        return Planet.find(criteria); //SELECT * FROM Planets <WHERE discoveredBy = 'Yannick'>
        //return Planet.find(testCriteria, 'temperature position');
    }

    retrieveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    transform(planet, transformOption = {}) {

        if (transformOption) {
            if (transformOption.unit === 'c') {
                planet.temperature = this.convertToCelsius(planet.temperature); //Convertir en Celsius
            }
        }

        //Changer le format de la date de découverte
        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        //Coordonnées vitesse lumière
        // x en hex @ y en hex @ z en hex            
        planet.lightspeed = `${planet.position.x.toString(16)}¤${planet.position.y.toString(16)}¤${planet.position.z.toString(16)}`;
        
        //const nombreEnEntier = parseInt("0x7AD", 16);
        //console.log(nombreEnEntier);
        

        //Faire le ménage de la planète
        delete planet.__v;

        return planet;

    }

    convertToCelsius(degreeKelvin) {
        return degreeKelvin + ZERO_KELVIN;
    }
}

export default new PlanetsService();