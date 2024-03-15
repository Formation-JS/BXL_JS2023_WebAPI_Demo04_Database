import { Sequelize } from 'sequelize';
import genreBuilder from './genre.model.js';
import actorBuilder from './actor.model.js';
import movieBuilder from './movie.model.js';


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

//* Ajouter les relations
//? [One to Many] Genre - Movie
db.Movie.hasMany(db.Genre, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});
db.Genre.belongsTo(db.Movie);

//? [Many to Many] Actor - Movie
db.Movie.belongsToMany(db.Actor, { through: 'Movie_Actor' });
db.Actor.belongsToMany(db.Movie, { through: 'Movie_Actor' });

//* Export de l'objet DB
export default db;