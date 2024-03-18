import actorService from '../services/actor.service.js';

const actorController = {

    getOne: async (req, res) => {
        const actorId = parseInt(req.params.id);
        
        const actor = await actorService.getById(actorId);

        if(!actor) {
            res.sendStatus(404);
            return;
        }

        res.status(200)
           .json(actor);
    },

    getAll: async (req, res) => {
        const {offset, limit} = req.pagination;
        const data = await actorService.getAll(offset, limit);

        res.status(200)
            .json({
                count: data.count,
                results: data.actors
            });
    },
    
    create: async (req, res) => {
        const actor = await actorService.add(req.validateData);

        res.status(201)
           .location('/api/actor/'+actor.id)
           .json(actor);
    }    
}
export default actorController;