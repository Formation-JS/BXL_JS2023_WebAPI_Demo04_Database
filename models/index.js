import { Sequelize } from 'sequelize';
import genreBuilder from './genre.model.js';
import actorBuilder from './actor.model.js';
import movieBuilder from './movie.model.js';
import tagBuilder from './tag.model.js';

// Variable d'env pour la DB
const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

// Initialisation de l'instance de sequelize
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host:DB_HOST,
    port:DB_PORT,
    dialect: DB_DIALECT
});

// L'objet "db"
//* Initialisation
const db = {};

//* Injection de l'instance de sequelize
db.sequelize = sequelize;

//* Ajouter les modeles
db.Genre = genreBuilder(sequelize);
db.Actor = actorBuilder(sequelize);
db.Movie = movieBuilder(sequelize);
db.Tag = tagBuilder(sequelize);

//* Ajouter les relations
//? [One to Many] Movie - Genre
db.Genre.hasMany(db.Movie, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});
db.Movie.belongsTo(db.Genre);

//? [Many to Many] Actor - Movie
db.Movie.belongsToMany(db.Actor, { through: 'movie_actor' });
db.Actor.belongsToMany(db.Movie, { through: 'movie_actor' });

//? [One to Many] Tag - Movie
db.Movie.hasMany(db.Tag);
db.Tag.belongsTo(db.Movie);

//* Export de l'objet DB
export default db;