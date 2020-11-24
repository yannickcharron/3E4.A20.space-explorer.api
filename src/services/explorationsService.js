import Exploration from '../models/exploration.js';

import planetsService from './planetsService.js';

class ExplorationsService {

    retrieveAll(retrieveOptions, options) {

        const retrieveQuery = Exploration.find().limit(retrieveOptions.limit)
                                 .skip(retrieveOptions.skip)
                                 .sort('-explorationDate'); //- Décroissant
                                

        //isPlanetEmbed est vrai, on veut populer la planète
        if(options.isPlanetEmbed) {
            retrieveQuery.populate('planet');  //Équivalent de INNER JOIN
        }

        const countQuery = Exploration.countDocuments();

        return Promise.all([retrieveQuery, countQuery]);

    }

    transform(exploration, options) {

        //Transformation de la planète
        if(options.isPlanetEmbed) { //Planète complète dans la réponse
            //exploration.planet un objet planet complet
            exploration.planet = planetsService.transform(exploration.planet);
        } else { //Seulement le href dans la réponse
            //exploration.planet seulement un id
            exploration.planet = { href: `${process.env.BASE_URL}/planets/${exploration.planet}`};
        }

        //Transformation de l'exploration
        exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        delete exploration._id;

        return exploration;

    }
}

export default new ExplorationsService();