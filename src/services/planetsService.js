import dayjs from 'dayjs';

import Planet from '../models/planet.js';

import explorationsService from './explorationsService.js';

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

    update(idPlanet, planet) {
        const filter = { _id: idPlanet }; //Équivalent de WHERE _id = idPlanet
        return Planet.findOneAndUpdate(filter, planet, { new: true }); //new=true retourne l'objet après la mise à jour
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

    retrieveById(idPlanet, options) {
        const retrieveQuery = Planet.findById(idPlanet);

        if (options.isExplorationsEmbed) {
            //Si je veux embed les explorations
            retrieveQuery.populate('explorations');
        }

        return retrieveQuery;
    }

    transform(planet, transformOption = {}, options) {
        if (transformOption) {
            if (transformOption.unit === 'c') {
                planet.temperature = this.convertToCelsius(planet.temperature); //Convertir en Celsius
            }
        }

        if (options.isExplorationsEmbed) {
            //La planète peut contenir ses explorations

            // const resultats = [];
            // planet.explorations.forEach(e => {
            //     e = explorationsService.transform(e, { isPlanetEmbed: false });
            //     resultats.push(e);
            // });
            // planet.explorations = resultats;

            planet.explorations = planet.explorations.map(e => {
                e = explorationsService.transform(e, { isPlanetEmbed: false }); 
                
                //delete e.planet; Permet de supprimer l'information en double de la planète

                return e;
            });
        }

        //Changer le format de la date de découverte
        //planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        //Coordonnées vitesse lumière
        // x en hex @ y en hex @ z en hex
        planet.lightspeed = `${planet.position.x.toString(16)}¤${planet.position.y.toString(16)}¤${planet.position.z.toString(16)}`;

        //const nombreEnEntier = parseInt("0x7AD", 16);
        //console.log(nombreEnEntier);

        //Linking générer un lien pour la ressource planète
        planet.href = `${process.env.BASE_URL}/planets/${planet._id}`;

        //Faire le ménage de la planète
        delete planet._id;
        //delete planet.id;
        delete planet.__v;

        return planet;
    }

    convertToCelsius(degreeKelvin) {
        return degreeKelvin + ZERO_KELVIN;
    }
}

export default new PlanetsService();
