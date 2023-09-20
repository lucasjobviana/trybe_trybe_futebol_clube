import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';

class SequelizeMatchModel extends Model<InferAttributes<SequelizeMatchModel>,
InferCreationAttributes<SequelizeMatchModel>> {
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchModel.init({
  homeTeamId:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams', key: 'id',
    },
  },
  homeTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  awayTeamId:
  {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams', key: 'id',
    },
  },
  awayTeamGoals: { type: DataTypes.INTEGER, allowNull: false },
  inProgress: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

export default SequelizeMatchModel;