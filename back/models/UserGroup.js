const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db/db')
const User = require('./User')
const Group = require('./Group')


class UserGroup extends Model {}

UserGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },{
        sequelize,
        modelName: 'UserGroup'
    }
)

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

module.exports = UserGroup;
