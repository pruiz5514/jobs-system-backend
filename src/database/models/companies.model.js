import { DataTypes } from "sequelize";
import { sequelize } from '../sequalize.js'

export const Companies = sequelize.define('companies', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    }, 
    location:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    contact:{
        allowNull: false,
        type: DataTypes.STRING,
    }
},{
    timestamps: false
}
)