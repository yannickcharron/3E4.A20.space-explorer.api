import express from 'express';

const app = express();

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

app.get('/:operation', (req, res, next) => {

    const operation = req.params.operation;
    console.log(operation);

    let resultat = 0;

    //Operation = somme (+)
    //            difference (-)    
    //            produit (*)
    //            quotient (/)
    //            reste (%)

    //TODO: switch sur operation ou plusieur if/else
    
    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(resultat.toString());

});

export default app;