import { Model, DataTypes, QueryInterface,  } from 'sequelize';

import { ITeams } from '../../Interfaces/ITeams';

const up = (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<ITeams>>('teams',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: { type: DataTypes.STRING, allowNull: false, field: 'team_name' },
    });

}

const down = (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
}

export default {
    up,
    down,
}