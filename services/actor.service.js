import { ActorDTO, ActorListDTO } from '../dto/actor.dto.js';
import db from '../models/index.js';

const actorService = {

    add: async (actorData) => {
        const actor = await db.Actor.create(actorData);
        return new ActorDTO(actor);
    },

    getById: async (actorId) => {
        const actor = await db.Actor.findByPk(actorId)
        return !!actor ? new ActorDTO(actor) : null;
    },

    getAll: async (offset, limit) => {

        const { rows, count } =  await db.Actor.findAndCountAll({
            offset,
            limit
        });

        return {
            count,
            actors: rows.map(r => new ActorListDTO(r))
        };
    }


};

export default actorService;