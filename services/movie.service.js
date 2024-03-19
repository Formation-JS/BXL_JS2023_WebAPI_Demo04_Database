import { ActorListDTO } from '../dto/actor.dto.js';
import { MovieDataDTO, MovieDetailDTO, MovieListDTO } from '../dto/movie.dto.js';
import db from '../models/index.js';

const movieService = {

    add: async (movieData) => {
        // Obtenir le genre
        let genreSelected = await db.Genre.findOne({
            where: {
                name: movieData.genre
            }
        });

        // Si le genre n'exist pas, on créer le genre dans la DB
        if (!genreSelected) {
            genreSelected = await db.Genre.create({ name: movieData.genre });
        }

        // Alternative (Get or Create) ↓
        /*
        const [genreSelected, isCreated] = await db.Genre.findOrCreate({
            where: {
                name: movieData.genre
            }
        });
        */

        // Création du film en DB
        const movieCreated = await db.Movie.create({
            title: movieData.title,
            releaseYear: movieData.releaseYear,
            duration: movieData.duration,
            hasSubtitle: movieData.hasSubtitle,
            genreId: genreSelected.id
        });

        // Mapping des données avec le DTO
        return new MovieDataDTO({ ...movieCreated.dataValues, genre: genreSelected.name})
    },

    getById : async (movieId) => {

        const movie = await db.Movie.findByPk(movieId, {
            include: [
                { model: db.Genre },
                { model: db.Actor }
            ]
        });

        // Mapping du resultat vers le DTO
        return new MovieDetailDTO({
            id: movie.id,
            title: movie.title,
            releaseYear: movie.releaseYear,
            duration: movie.duration,
            hasSubtitle: movie.hasSubtitle,
            genre: movie.genre?.name,
            actors: movie.actors.map(a => new ActorListDTO(a))
        });
    },

    getAll: async (offset, limit) => {

        const { rows, count } = await db.Movie.findAndCountAll({
            offset,
            limit,
            include: [
                { model: db.Genre }
            ],
            attributes: ['id', 'title']
        });

        return {
            count,
            movies: rows.map(row => new MovieListDTO({...row.dataValues, genre: row.genre?.name}))
        };
    },

    delete: async (movieId) => {

        // Initialiser une transaction (Déactivation des auto-commit en DB)
        const transaction = await db.sequelize.transaction();

        // Delete en DB (fait partie de la transaction)
        const nbRowDeleted = await db.Movie.destroy({
            where: { id: movieId },
            transaction
        });

        // Si le nombre d'élément supprimer ne correspond pas -> Annuler la transaction
        if(nbRowDeleted !== 1) {
            await transaction.rollback();
            return false;
        }

        // Sinon -> Validation de la transaction
        await transaction.commit();
        return true;
    },

    addActor : async (movieId, actorId) => {

        // Récuperation du film
        const movie = await db.Movie.findOne({
            where: { id: movieId }
        });
        if(!movie) {
            throw new Error('Movie not found');
        }

        // Récuperation de l'acteur
        const actor = await db.Actor.findOne({
            where: { id : actorId }
        });
        if(!actor) {
            throw new Error('Actor not found');
        }

        // Ajout du lien "Many to Many" entre les 2 entitès
        await movie.addActor(actor);
    }
};

export default movieService;