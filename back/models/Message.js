const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db/db')
const User = require('./User')
const Group = require('./Group')


class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Message'
    }
)

Group.hasOne(Message, { through: Message });
User.hasOne(Message , { through: Message });

module.exports = Message;

