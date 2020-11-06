import express from 'express';

import database from './helpers/database.js';
import errors from './helpers/errors.js';

import planetsRoutes from './routes/planetsRoutes.js';
import explorationsRoutes from './routes/explorationsRoutes.js';

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
app.use('/explorations',explorationsRoutes);

//Route global pour la gestion des erreurs
app.use('*', errors);

export default app;