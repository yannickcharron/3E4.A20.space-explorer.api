import express from 'express';
import error from 'http-errors';
import _ from 'lodash';

import planetsService from '../services/planetsService.js';

const router = express.Router(); //Utilitaire d'express pour ajouter des routes

class PlanetsRoutes {

    constructor() {
        router.get('/', this.getAll); //Ajoute une route à notre serveur sur GET /planets
        router.get('/:idPlanet', this.getOne); //localhost:5000/planets/600
        router.post('/', this.post); //Ajoute une route à notre serveur sur POST /planets
        router.patch('/:idPlanet', this.patch); // Modification partielle d'un document
        router.delete('/:idPlanet', this.delete)  //Supprime un document 
        router.put('/:idPlanet', this.put);// Modification complète d'un document

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
    async post(req, res, next) {
       
        if(_.isEmpty(req.body)) {
            return next(error.BadRequest()); //Erreur 400
        }

        try {

            //1. Retrouver ce que le client veut ajouter
            const newPlanet = req.body;

            //2. Essayer de l'ajouter dans la base de données
            let planet = await planetsService.create(newPlanet);

            //3. Préparer la réponse(transformation) 
            //Transformer la réponse
            planet = planet.toObject({ getters: false, virtuals: false }); 
            planet = planetsService.transform(planet);

            //4. Envoyer une réponse
            res.status(201).json(planet);

        } catch(err) {
            return next(err);
        }

    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            //Trouver dans la base de données la planète avec idPlanet
            let planet = await planetsService.retrieveById(idPlanet);

            //La planète demandée n'existe pas
            if(!planet) {
                return next(error.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas.`));
            }

            //Transformer la réponse
            planet = planet.toObject({ getters: false, virtuals: false }); 
            planet = planetsService.transform(planet);

            //Envoyer une réponse
            res.status(200).json(planet);
        } catch(err) {
            return next(err);
        }

    }

    async getAll(req, res, next) { 

        //http://localhost:5000/planets?unit=c
        //http://localhost:5000/planets?explorer=Karim

        const criteria = {};
        const transformOptions = {};

        //Construction des critères de la requête à la base de données
        if(req.query.explorer) {
            criteria.discoveredBy = req.query.explorer;
        }

        //Construction des options de transformation
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(error.BadRequest('Le paramètre unit doit avoir la valeur c pour Celsius'));
            }
        }

        //Possibilité de plusieurs conditions à valider pour la transformation

        try {
            let planets = await planetsService.retrieveByCriteria(criteria);

            //Transformation de la réponse
            planets = planets.map(p => {
                p = p.toObject({ getters: false, virtuals: false }); 
                p = planetsService.transform(p, transformOptions);
                return p;
            });

            res.status(200).json(planets);
        } catch (err) {
            return next(err);
        }

    }

}

new PlanetsRoutes();

export default router; //Permet d'utiliser le routeur à l'extérieur du fichier
