import { Sequelize, DataTypes } from 'sequelize';

/**
 * Tag model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {

    // Défine model "Tag"
    const Tag = sequelize.define('tag', {
        // Attributes -> Column of table
        name : {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        //? Permet de customiser le nom dans la DB
        tableName: 'tag',
        timestamps: false
    });

    // Return du model "Tag"
    return Tag
}