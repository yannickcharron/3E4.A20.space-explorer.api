import Exploration from '../models/exploration.js';

class ExplorationsService {

    retrieveAll(retrieveOptions) {

        const retrieveQuery = Exploration.find().limit(retrieveOptions.limit)
                                 .skip(retrieveOptions.skip)
                                 .sort('-explorationDate');

        const countQuery = Exploration.countDocuments();

        return Promise.all([retrieveQuery, countQuery]);

    }
}

export default new ExplorationsService();