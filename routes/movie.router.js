import { Router } from 'express';
import movieController from '../controllers/movie.controller.js';
import { bodyValidatorMiddleware } from '../middlewares/body-validator.middleware.js';
import { movieValidator } from '../validators/movie.validator.js';
import { paginationMiddleware } from '../middlewares/pagination.middleware.js';


const movieRouter = Router();

movieRouter.route('/')
    .get(paginationMiddleware(), movieController.getAll)
    .post(bodyValidatorMiddleware(movieValidator), movieController.create)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)')
    .get(movieController.getOne)
    .put(bodyValidatorMiddleware(movieValidator), movieController.update)
    .delete(movieController.delete)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)/addActor/:actorId([0-9]+)')
    .patch(movieController.addActor)
    .all((_, res) => res.sendStatus(405));

movieRouter.route('/:id([0-9]+)/removeActor/:actorId([0-9]+)')
    .patch(movieController.removeActor)
    .all((_, res) => res.sendStatus(405));

export default movieRouter;