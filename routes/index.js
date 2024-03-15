import { Router } from 'express';
import actorRouter from './actor.router.js';
import movieRouter from './movie.router.js';


const mainRouter = Router();

mainRouter.use('/actor', actorRouter);
mainRouter.use('/movie', movieRouter);

export default mainRouter;