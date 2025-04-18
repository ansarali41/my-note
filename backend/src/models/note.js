const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define(
    'Note',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'card',
            validate: {
                isIn: [['card']], // Currently only supporting 'card' format, can be extended later
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Note;
