import { ActorListDTO } from '../dto/actor.dto.js';
import { MovieDataDTO, MovieDetailDTO, MovieListDTO } from '../dto/movie.dto.js';
import { TagDTO } from '../dto/tag.dto.js';
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
            genreId: genreSelected.id,
            tags: movieData.tags.map(tag => ({ name: tag }))
        }, {
            include: [db.Tag]
        });

        console.log(movieCreated);
        // Mapping des données avec le DTO
        return new MovieDataDTO({ 
            ...movieCreated.dataValues, 
            genre: genreSelected.name, 
            tags: movieCreated.tags.map(tag => new TagDTO(tag))
        });
    },

    getById : async (movieId) => {

        // Rechercher le film en DB avec les informations du genre et d'acteur (Jointure)
        const movie = await db.Movie.findByPk(movieId, {
            include: [
                { model: db.Genre },
                { model: db.Actor },
                { model: db.Tag }
            ]
        });

        // Si aucun film trouvé -> null
        if(!movie) {
            return null;
        }

        // Mapping du resultat vers le DTO
        return new MovieDetailDTO({
            id: movie.id,
            title: movie.title,
            releaseYear: movie.releaseYear,
            duration: movie.duration,
            hasSubtitle: movie.hasSubtitle,
            genre: movie.genre?.name,
            actors: movie.actors.map(a => new ActorListDTO(a)),
            tags: movie.tags.map(t => new TagDTO(t))
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

        // Ajouter la relation entre l'acteur et le film
        //? - La méthode "addActor" / "addActors" permet d'ajouter les données dans la ManyToMany
        //? - Cette méthode est automatiquement généré par sequelize
        //? - Elle prend en parametres (object ou array) : L'entité, l'id de l'entité
        await movie.addActor(actor);
    },

    removeActor: async (movieId, actorId) => {

        // Récuperation du film
        const movie = await db.Movie.findByPk(movieId);
        if(!movie) {
            throw new Error('Movie not found');
        }

        // Supprimer la relation entre l'acteur et le film
        //? - La méthode "removeActor" / "removeActors" permet d'ajouter les données dans la ManyToMany
        //? - Cette méthode est automatiquement généré par sequelize
        //? - Elle prend en parametres (object ou array) : L'entité, l'id de l'entité
        await movie.removeActor(actorId);
    }
};

export default movieService;