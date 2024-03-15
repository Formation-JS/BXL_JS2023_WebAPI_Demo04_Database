import { Router } from 'express';
import movieController from '../controllers/movie.controller.js';


const movieRouter = Router();

movieRouter.route('/')
    .get(movieController.getAll)
    .post(movieController.create)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)')
    .get(movieController.getOne)
    .put(movieController.update)
    .delete(movieController.delete)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)/addActor/:actorId([0-9]+)')
    .patch(movieController.addActor)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)/removeActor/:actorId([0-9]+)')
    .patch(movieController.removeActor)
    .all((_, res) => res.sendStatus(405));

export default movieRouter;