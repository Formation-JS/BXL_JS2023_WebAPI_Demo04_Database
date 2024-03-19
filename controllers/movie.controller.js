import movieService from '../services/movie.service.js';

const movieController = {

    getOne: async (req, res) => {
        const movieId = parseInt(req.params.id);

        const movie = await movieService.getById(movieId);

        if(!movie) {
            res.sendStatus(404);
            return;
        }

        res.status(200)
            .json(movie);
    },

    getAll: async (req, res) => {
        const { offset, limit } = req.pagination;

        const data = await movieService.getAll(offset, limit);

        res.status(200)
            .json({
                count: data.count,
                results: data.movies
            });
    },

    create: async (req, res) => {
        const movie = await movieService.add(req.validateData);

        res.status(201)
            .location('/api/movie/' + movie.id)
            .json(movie);
    },

    update: async (req, res) => {
        res.sendStatus(501);
    },

    delete: async (req, res) => {
        const movieId = parseInt(req.params.id);

        const isDeleted = await movieService.delete(movieId);

        if(!isDeleted) {
            res.sendStatus(400);
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
        res.sendStatus(501);
    },
}
export default movieController;