import { Model, DataTypes, QueryInterface,  } from 'sequelize';

import { IMatch } from '../../interfaces/IMatch';

const up = (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IMatch>>('matches',{
      homeTeamId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false, field: 'home_team_goals' },
      awayTeamId: {
        type: DataTypes.INTEGER, allowNull: false, field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false, field: 'away_team_goals' },
      inProgress: { type: DataTypes.BOOLEAN, allowNull: false, field: 'in_progress' },
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    });

}

const down = (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('matches');
}

export default {
    up,
    down,
}