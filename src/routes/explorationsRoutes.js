import express from 'express';
import error from 'http-errors';

const router = express.Router(); 

class ExplorationsRoutes {
    
    constructor() {
        router.get('/', this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    getAll(req, res, next) {

    }

    getOne(req, res, next) {

    }

}

new ExplorationsRoutes();

export default router; //Permet d'utiliser le routeur à l'extérieur du fichier