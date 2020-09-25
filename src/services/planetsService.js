
import Planet from '../models/planet.js';

const ZERO_KELVIN = -273.15;

class PlanetsService {
    //C => Create
    //R => Retrieve
    //U => Update
    //D => Delete

    retrieveByCriteria(criteria) {
        return Planet.find(criteria); //SELECT * FROM Planets <WHERE discoveredBy = 'Karim'>
    }

    retrieveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    transform(planet, transformOption = {}) {

        if(transformOption) {
            if(transformOption.unit === 'c') {
                planet.temperature = this.convertToCelsius(planet.temperature); //Convertir en Celsius
            }
        }

        return planet;

    }

    convertToCelsius(degreeKelvin) {
        return degreeKelvin + ZERO_KELVIN;
    }
}

export default new PlanetsService();