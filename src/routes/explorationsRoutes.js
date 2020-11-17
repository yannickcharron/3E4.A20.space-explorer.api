import express from 'express';
import paginate from 'express-paginate';
import httpError from 'http-errors';

import explorationsService from '../services/explorationsService.js';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', paginate.middleware(20, 50), this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    async getAll(req, res, next) {

        const retrieveOptions = {
            limit: req.query.limit,
            page: req.query.page,
            skip: req.skip
        }

        console.log(retrieveOptions);

        try {
            //Retrouver toutes les explorations
            const [explorations, itemCount] = await explorationsService.retrieveAll(retrieveOptions);

            const pageCount = Math.ceil(itemCount / req.query.limit);

            const responseBody = {
                _metadata: {
                    page:req.query.page,
                    limit:req.query.limit,
                    totalPages:pageCount,
                    totalDocument:itemCount
                },
                _links:{
                    prev:``,
                    self:``,
                    next:``
                },
                results:explorations
            }


            res.status(200).json(responseBody);

        } catch(err) {
            return next(err);
        }
    }

    getOne(req, res, next) {

    }

}

new ExplorationsRoutes();

export default router;

