import { MovieDataDTO } from '../dto/movie.dto.js';
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
    }
};

export default movieService;