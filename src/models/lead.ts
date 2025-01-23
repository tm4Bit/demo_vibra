import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface LeadAttributes {
  id: number;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<LeadAttributes, 'id' | 'status'> {}

class Lead extends Model<LeadAttributes, TaskCreationAttributes> implements LeadAttributes {
  public id!: number;
  public name!: string;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'leads',
  }
);

export default Lead;
