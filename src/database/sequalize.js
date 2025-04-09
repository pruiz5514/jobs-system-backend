import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize (process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres'
}) 