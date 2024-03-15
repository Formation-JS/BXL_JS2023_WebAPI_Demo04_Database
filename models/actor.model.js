import { Sequelize, DataTypes } from 'sequelize';

/**
 * Actor model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {

    const Actor = sequelize.define('Actor', {
        // Attributes
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        // Model options
        tableName: 'Actor',
        timestamps: true
    });

    return Actor;
}