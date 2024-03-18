import { Router } from 'express';
import actorController from '../controllers/actor.controller.js';
import { bodyValidatorMiddleware } from '../middlewares/body-validator.middleware.js';
import { actorValidator } from '../validators/actor.validator.js';
import { paginationMiddleware } from '../middlewares/pagination.middleware.js';


const actorRouter = Router();

actorRouter.route('/')
    .get(paginationMiddleware(), actorController.getAll)
    .post(bodyValidatorMiddleware(actorValidator), actorController.create)
    .all((_, res) => res.sendStatus(405));

actorRouter.route('/:id([0-9]+)')
    .get(actorController.getOne)
    .all((_, res) => res.sendStatus(405));

export default actorRouter;