import actorService from '../services/actor.service.js';

const actorController = {

    getOne: async (req, res) => {
        // TODO Récuperer l'id via l'url
        const actorId = 1;
        
        const actor = await actorService.getById(actorId);

        if(!actor) {
            res.sendStatus(404);
            return;
        }

        res.status(200)
           .json(actor);
    },

    getAll: async (req, res) => {
        res.sendStatus(501);
    },
    
    create: async (req, res) => {
        // TODO Récuperer des données via le body de la requete
        const data = { firstname: 'Della', lastname: 'Duck', birthdate: '1988-12-03' }

        const actor = await actorService.add(data);

        res.status(201)
           .location('/api/actor/'+actor.id)
           .json(actor);
    }    
}
export default actorController;