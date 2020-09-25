import express from 'express';

import database from './helpers/database.js';

import planetsRoutes from './routes/planetsRoutes.js';

const app = express();

database(app);

app.use(express.json());

app.get('/premiere', (req, res, next) => {
    console.log('Ma première route');
    res.status(200); //Code HTTP 200 = OK
    res.set('Content-Type', 'text/html');
    res.send('<html><strong>Notre première route avec express</strong></html>');
});

app.use('/planets', planetsRoutes);
//TODO: Formatif 1

//Route global pour la gestion des erreurs
app.use((err, req, res, next) => {
    res.status(err.statusCode).json(err);
});

export default app;