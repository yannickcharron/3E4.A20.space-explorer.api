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
            skip: req.skip,
        };

        //TODO: Est-ce que la planète doit être populée?
        //TODO:?embed=planet

        //console.log(retrieveOptions);

        try {
            //Retrouver toutes les explorations
            const [explorations, documentsCount] = await explorationsService.retrieveAll(retrieveOptions);

            const pageCount = Math.ceil(documentsCount / req.query.limit);
            const functionPages = paginate.getArrayPages(req); //Retourne une fonction
            const pageArray = functionPages(3, pageCount, req.query.page); //Tableau de liens vers les 3 pages
            const hasNextPage = paginate.hasNextPages(req)(pageCount);

           
            if(req.query.page > pageCount) {
                return next(httpError.BadRequest());
            }

            //console.log(pageArray);
            /*[
               0 { number: 1, url: '/explorations?page=1&limit=30' },
               1 { number: 2, url: '/explorations?page=2&limit=30' },
               2 { number: 3, url: '/explorations?page=3&limit=30' },  
            ]*/

            //Transformation
            //1 ou plusieurs explorations à transformer?
            const transformExplorations = explorations.map(e => {
                e = e.toObject({ getters: false, virtuals: false });
                e = explorationsService.transform(e);

                return e;
            });

            const responseBody = {
                _metadata: {
                    hasNextPage: hasNextPage,
                    page: req.query.page,
                    limit: req.query.limit,
                    totalPages: pageCount,
                    totalDocument: documentsCount,
                },
                _links: {
                    prev: `${process.env.BASE_URL}${pageArray[0].url}`,
                    self: `${process.env.BASE_URL}${pageArray[1].url}`,
                    next: `${process.env.BASE_URL}${pageArray[2].url}`,
                },
                results: transformExplorations,
            };

            //Cas d'exception 1ère page
            if (req.query.page === 1) {
                responseBody._links.next = responseBody._links.self;
                responseBody._links.self = responseBody._links.prev;
                delete responseBody._links.prev;

                /*responseBody._links.next = `${process.env.BASE_URL}${pageArray[1].url}`;
                responseBody._links.self = `${process.env.BASE_URL}${pageArray[0].url}`;
                delete responseBody._links.prev;*/
            }

            //Cas dernière page
            if (!hasNextPage) {
                //req.query.page === pageCount
                responseBody._links.prev = responseBody._links.self;
                responseBody._links.self = responseBody._links.next;
                delete responseBody._links.next;
            }

            res.status(200).json(responseBody);
        } catch (err) {
            return next(err);
        }
    }

    getOne(req, res, next) {}
}

new ExplorationsRoutes();

export default router;
