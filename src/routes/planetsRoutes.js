import express from 'express';


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
        router.get('/planets', this.getAll); //Ajoute un route à notre serveur
        router.get('/planets/:idPlanet', this.getOne); //localhost:5000/planets/600
        
    }

    getOne(req, res, next) {
        console.log('get one');
        res.status(200);
        res.end();
    }

    getAll(req, res, next) {
        console.log('Obtenir toutes les planètes'); //Écrit dans le terminal

        res.status(200); // Code de status HTTP de notre réponse
        //res.set('Content-Type', 'application/json'); Pour informer le client que nous envoyons du JSON

        res.json(planets);
        
    }

}

new PlanetsRoutes();

export default router; //Permet d'utiliser le routeur à l'extérieur du fichier