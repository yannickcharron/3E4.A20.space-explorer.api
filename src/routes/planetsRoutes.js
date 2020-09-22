import express from 'express';
import error from 'http-errors';

import Planet from '../models/planet.js';

const router = express.Router(); //Utilitaire d'express pour ajouter des routes

class PlanetsRoutes {

    constructor() {
        router.get('/', this.getAll); //Ajoute une route à notre serveur sur GET /planets
        router.get('/:idPlanet', this.getOne); //localhost:5000/planets/600
        router.post('/', this.post); //Ajoute une route à notre serveur sur POST /planets
        router.patch('/:idPlanet', this.patch); // Modification partielle d'un document
        router.delete('/:idPlanet', this.delete)  //Supprime un document 
        router.put('/:idPlanet',this.put);// Modification complète d'un document

    }

    put(req, res, next) {
        console.log(`put - ${req.params.idPlanet}`);
        return next(error.NotImplemented());
    }

    delete(req, res, next) {
        const index = planets.findIndex(p => p.id === parseInt(req.params.idPlanet));
        if (index === -1) {
            return next(error[404](`La planet avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
            //return next(error.NotFound(`La planet avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
        }
        planets.splice(index, 1);
        res.status(204).end();

    }

    patch(req, res, next) {
        console.log(`patch - ${req.params.idPlanet}`);
        return next(error.NotImplemented());
    }

    /**
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    */
    post(req, res, next) {
        //Ajouter une planète

        const newPlanet = req.body;

        const index = planets.findIndex(p => p.id === newPlanet.id);
        if (index === -1) {
            planets.push(newPlanet);
            res.status(201).json(newPlanet);
        } else {
            return next(error.Conflict(`Une planète avec l'identifiant ${newPlanet.id} existe déjà.`));
        }

    }

    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        //Utilisation de la fonction find pour retrouver notre planète
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const planet = planets.find(p => p.id === parseInt(idPlanet, 10));
        if (planet) {
            res.status(200).json(planet); //Envoie de la réponse avec le status 200
        } else {
            //Retourner un code 404 - Not Found
            return next(error.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas.`));
        }
    }

    async getAll(req, res, next) {
        console.log('Obtenir toutes les planètes'); //Écrit dans le terminal

        try {
            const planets = await Planet.find();
            res.status(200).json(planets);
        } catch(err) {
            return next(error.InternalServerError(err));
        }
        
    }

}

new PlanetsRoutes();

export default router; //Permet d'utiliser le routeur à l'extérieur du fichier