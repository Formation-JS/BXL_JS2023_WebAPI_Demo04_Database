import { Sequelize, DataTypes } from 'sequelize';

/**
 * Genre model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {

    // Défine model "Genre"
    const Genre = sequelize.define('Genre', {
        // Attributes -> Column of table
        // ? Note : Si la clef primaire n'est pas définie, celle est auto-généré
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: 'UK_Genre__Name'
            }
        }
    }, {
        //? Permet de customiser le nom dans la DB
        tableName: 'Genre',
    });

    // Return du model "Genre"
    return Genre
}