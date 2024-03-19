import { ErrorResponse, NotFoundErrorResponse } from '../response-objects/error.response.js';
import { SuccessArrayResponse, SuccessObjectResponse } from '../response-objects/success.response.js';
import movieService from '../services/movie.service.js';

const movieController = {

    getOne: async (req, res) => {
        const movieId = parseInt(req.params.id);

        const movie = await movieService.getById(movieId);

        if(!movie) {
            res.status(404).json(new NotFoundErrorResponse('Film non trouvé'));
            return;
        }

        res.status(200).json(new SuccessObjectResponse(movie));
    },

    getAll: async (req, res) => {
        const { offset, limit } = req.pagination;

        const data = await movieService.getAll(offset, limit);

        res.status(200)
            .json(new SuccessArrayResponse(data.movies, data.count));
    },

    create: async (req, res) => {
        const movie = await movieService.add(req.validateData);

        res.status(201)
            .location('/api/movie/' + movie.id)
            .json(new SuccessObjectResponse(movie, 201));
    },

    update: async (req, res) => {
        res.sendStatus(501);
    },

    delete: async (req, res) => {
        const movieId = parseInt(req.params.id);

        const isDeleted = await movieService.delete(movieId);

        if(!isDeleted) {
            res.status(400).json(new ErrorResponse('Une erreur s\'est produite lors de la suppression !'))
            return;
        }

        res.sendStatus(204);
    },

    addActor: async (req, res) => {
        // /:id([0-9]+)/addActor/:actorId([0-9]+)
        const movieId = parseInt(req.params.id);
        const actorId = parseInt(req.params.actorId);

        try {
            await movieService.addActor(movieId, actorId);
            res.sendStatus(204);
        }
        catch (error) {
            res.sendStatus(400);
        }
    },

    removeActor: async (req, res) => {
        // /:id([0-9]+)/removeActor/:actorId([0-9]+)
        const movieId =parseInt(req.params.id);
        const actorId =parseInt(req.params.actorId);

        try {
            await movieService.removeActor(movieId, actorId);
            res.sendStatus(204)
        }
        catch (error) {
            res.sendStatus(400);
        }
    },
}
export default movieController;