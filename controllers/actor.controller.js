import { NotFoundErrorResponse } from '../response-objects/error.response.js';
import { SuccessArrayResponse, SuccessObjectResponse } from '../response-objects/success.response.js';
import actorService from '../services/actor.service.js';

const actorController = {

    getOne: async (req, res) => {
        const actorId = parseInt(req.params.id);
        
        const actor = await actorService.getById(actorId);

        if(!actor) {
            res.status(404).json(new NotFoundErrorResponse('Acteur non trouvé'));
            return;
        }

        res.status(200)
           .json(new SuccessObjectResponse(actor));
    },

    getAll: async (req, res) => {
        const {offset, limit} = req.pagination;
        const data = await actorService.getAll(offset, limit);

        res.status(200)
            .json(new SuccessArrayResponse(data.actors, data.count));
    },
    
    create: async (req, res) => {
        const actor = await actorService.add(req.validateData);

        res.status(201)
           .location('/api/actor/'+actor.id)
           .json(new SuccessObjectResponse(actor, 201));
    }    
}
export default actorController;