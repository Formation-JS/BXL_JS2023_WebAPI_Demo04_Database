import { Router } from 'express';
import actorController from '../controllers/actor.controller.js';


const actorRouter = Router();

actorRouter.route('/')
    .get(actorController.getAll)
    .post(actorController.create)
    .all((_, res) => res.sendStatus(405));

actorRouter.route('/:id([0-9]+)')
    .get(actorController.getOne)
    .all((_, res) => res.sendStatus(405));

export default actorRouter;