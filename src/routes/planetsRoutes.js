import express from 'express';
import error from 'http-errors';

const router = express.Router(); //Utilitaire d'express pour ajouter des routes

const planets = [{ id:1, name: 'Postraigantu' }, { id:2, name: 'Goceohiri' }, { id:3, name: 'Pulreshan' }, { id:4, name: 'Hondarvis' }, 
                    { id:10, name: 'Xatov' }, { id:20, name: 'Kaomia' }, { id:30, name: 'Verizuno' }, { id:40, name: 'Phapitis' },
                    { id:100, name: 'Griuq 6ZML' }, { id:200, name: 'Brion 8GW' }, { id:300, name: 'Chelmaestea' }, { id:400, name: 'Pualia' }, 
                    { id:1000, name: 'Chelmaestea' }, { id:2000, name: 'Gilveanides' }, { id:3000, name: 'Ucarvis' }, { id:4000, name: 'Inzinda' },
                    { id:5, name: 'Ninia' }, { id:6, name: 'Ualia' }, { id:7, name: 'Becipra' }, { id:8, name: 'Stretelara' }, 
                    { id:50, name: 'Zides BGG' }, { id:60, name: 'Phiuq SIV' }, { id:70, name: 'Kucruigawa' }, { id:80, name: 'Edionope' },
                    { id:500, name: 'Chanruna' }, { id:600, name: 'Mutrides' }, { id:700, name: 'Thaepra' }, { id:800, name: 'Soivis' }, 
                    { id:5000, name: 'Cuilara' }, { id:6000, name: 'Sigonides' }, { id:7000, name: 'Phillon HZZK' }, { id:8000, name: 'Neon 5' }];

class PlanetsRoutes {

    constructor() {
        router.get('/planets', this.getAll); //Ajoute une route à notre serveur sur GET /planets
        router.get('/planets/:idPlanet', this.getOne); //localhost:5000/planets/600
        router.post('/planets', this.post); //Ajoute une route à notre serveur sur POST /planets
        
    }

    /**
    *
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    */
    post(req, res, next) {
        //Ajouter une planète
        
        const newPlanet = req.body;

        const index = planets.findIndex(p => p.id === newPlanet.id);
        if(index === -1) {
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
        if(planet) {
            res.status(200).json(planet); //Envoie de la réponse avec le status 200
        } else {
            //Retourner un code 404 - Not Found
            return next(error.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas.`));
        }
    }

    getAll(req, res, next) {
        console.log('Obtenir toutes les planètes'); //Écrit dans le terminal

        res.status(200); // Code de status HTTP de notre réponse
        //res.set('Content-Type', 'application/json'); Pour informer le client que nous envoyons du JSON plus nécessaire avec .json()

        res.json(planets);
        
    }

}

new PlanetsRoutes();

export default router; //Permet d'utiliser le routeur à l'extérieur du fichier