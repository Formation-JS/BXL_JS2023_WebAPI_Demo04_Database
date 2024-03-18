import { Sequelize, DataTypes } from 'sequelize';

/**
 * Movie model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {

    const Movie = sequelize.define('movie', {
        // Attributes
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        hasSubtitle: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        } 
    }, {
        // Model options
        tableName: 'movie',
        timestamps: true
    });

    return Movie;
}