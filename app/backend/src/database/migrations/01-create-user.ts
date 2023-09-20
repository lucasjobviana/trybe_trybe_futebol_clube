import { Model, DataTypes, QueryInterface } from 'sequelize';

import { IUser } from '../../interfaces/IUser';

const up = (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IUser>>('users',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    });

}

const down = (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
}

export default {
    up,
    down,
}