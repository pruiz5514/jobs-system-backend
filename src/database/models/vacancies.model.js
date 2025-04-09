import { DataTypes } from "sequelize";
import { sequelize } from '../sequalize.js'
import { Companies } from "./companies.model.js";

export const Vacancies = sequelize.define('vacancies', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    }, 
    description:{
        allowNull: false,
        type: DataTypes.TEXT,
    },
    status:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Companies,
            key: 'id'
        }
    }
},{
    timestamps: false
}
)