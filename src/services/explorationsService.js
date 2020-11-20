import Exploration from '../models/exploration.js';

class ExplorationsService {

    retrieveAll(retrieveOptions) {

        const retrieveQuery = Exploration.find().limit(retrieveOptions.limit)
                                 .skip(retrieveOptions.skip)
                                 .sort('-explorationDate')
                                 .populate('planet'); //Équivalent de INNER JOIN

        const countQuery = Exploration.countDocuments();

        return Promise.all([retrieveQuery, countQuery]);

    }

    transform(exploration) {

        //Transformation de la planète
        //exploration.planet = { href: `${process.env.BASE_URL}/planets/${exploration.planet}`};

        //Transformation de l'exploration
        exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        delete exploration._id;

        return exploration;

    }
}

export default new ExplorationsService();