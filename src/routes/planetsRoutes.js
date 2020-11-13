import express from 'express';
import error from 'http-errors';
import _ from 'lodash';
import planet from '../models/planet.js';

import planetsService from '../services/planetsService.js';
import planetsRoutesValidators from '../validators/planetsRoutesValidators.js';

import validator from '../helpers/validator.js';


const router = express.Router(); //Utilitaire d'express pour ajouter des routes

class PlanetsRoutes {

    constructor() {
        router.get('/', this.getAll); //Ajoute une route à notre serveur sur GET /planets
        router.get('/:idPlanet', this.getOne); //localhost:5000/planets/600
        router.post('/', this.post); //Ajoute une route à notre serveur sur POST /planets
        router.patch('/:idPlanet', this.patch); // Modification partielle d'un document
        router.delete('/:idPlanet', this.delete)  //Supprime un document 
        router.put('/:idPlanet', planetsRoutesValidators.putValidator(), validator ,this.put);// Modification complète d'un document

    }

    async put(req, res, next) {
        
        //TODO: Validation
        try {

            //Trouver la planète et Faire la modification dans la base de données
            let planetMod = await planetsService.update(req.params.idPlanet, req.body);

            //La planète n'existe pas donc la mise ne peut pas de faire.
            if(!planetMod) {
                return next(error.NotFound(`La planète ${req.params.idPlanet} n'existe pas.`));
            }

            //Transformation de la réponse
            planetMod = planetMod.toObject({ getters: false, virtuals: false }); 
            planetMod = planetsService.transform(planetMod);

            //Envoyer une réponse
            res.status(200).json(planetMod);

        } catch(err) {
            return next(err);
        }
        
    }

    async delete(req, res, next) {
        
        try {
            //1. Trouver si la planète existe
            //2. Supprimer la planète
            const deleteResult = await planetsService.delete(req.params.idPlanet);
            if(deleteResult) {
                //3.Envoyer une réponse
                res.status(204).end(); //No Content
            } else {
               //La planète n'existe pas 
               return next(error.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`)); 
            }
    
        } catch(err) {
            return next(err);
        }

    }

    async patch(req, res, next) {

        // Mise à jour complète d'une planète --> En SQL UPDATE
        if(_.isEmpty(req.body)) {
            return next(error.BadRequest()); //Erreur 400
        }

        //TODO: Validation
        try {

            //Trouver la planète et Faire la modification dans la base de données
            let planetMod = await planetsService.update(req.params.idPlanet, req.body);

            //La planète n'existe pas donc la mise ne peut pas de faire.
            if(!planetMod) {
                return next(error.NotFound(`La planète ${req.params.idPlanet} n'existe pas.`));
            }

            //Transformation de la réponse
            planetMod = planetMod.toObject({ getters: false, virtuals: false }); 
            planetMod = planetsService.transform(planetMod);

            //Envoyer une réponse
            res.status(200).json(planetMod);

        } catch(err) {
            return next(err);
        }
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
            res.header('Location', planet.href);
            if(req.query._body === 'false') {
                res.status(201).end();
            } else {
                res.status(201).json(planet);
            }

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
