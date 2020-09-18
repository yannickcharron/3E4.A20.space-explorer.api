import express from 'express';

import planetsRoutes from './routes/planetsRoutes.js';

const app = express();

app.use(express.json());

app.get('/premiere', (req, res, next) => {
    console.log('Ma première route');
    res.status(200); //Code HTTP 200 = OK
    res.set('Content-Type', 'text/html');
    res.send('<html><strong>Notre première route avec express</strong></html>');
});

/*app.get('/somme', (req, res, next) => {
    //http://localhost:5000/difference?a=5&b=9

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    const somme = a + b;

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(somme.toString());

});*/

//#region Device

/*app.get('/:operation', (req, res, next) => {

    const operation = req.params.operation;
    console.log(operation);

    let resultat = 0;

    switch (operation) {
        case 'somme':
            result = a + b;
            break;
        case 'difference':
            result = a - b;
            break;
        case 'produit':
            result = a * b;
            break;
        case 'quotient':
            result = a / b;
            break;
        case 'reste':
            result = a % b;
            break;
    }

    //Operation = somme (+)
    //            difference (-)    
    //            produit (*)
    //            quotient (/)
    //            reste (%)

    //TODO: switch sur operation ou plusieurs if/else

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(resultat.toString());

});*/

//#endregion

app.use('/planets', planetsRoutes);

//TODO: Formatif 1

//Route global pour la gestion des erreurs
app.use((err, req, res, next) => {
    res.status(err.statusCode).json(err);
});

export default app;