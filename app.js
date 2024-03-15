//! Chargement des variables d'env
import 'dotenv/config';

//! Imports
import express from 'express';
import 'express-async-errors';
import mainRouter from './routes/index.js';
import morgan from 'morgan';

//! Variables d'env
const { NODE_ENV, PORT } = process.env;

//! Web API
//* Initialisation
const app = express();

//* Middlewares
app.use(express.json());
app.use(morgan('short'));

//* Routing
app.use('/api', mainRouter);

//* Démarrage de l'API
app.listen(PORT, () => {
    console.log(`Web API is running on ${PORT} (${NODE_ENV})`);
});