import express from 'express';
import { sequelize } from './database/sequalize.js';

import './database/models/companies.model.js'
import './database/models/vacancies.model.js'

const app = express()
const PORT  = process.env.PORT || 3000;

app.use(express.json())

const main = () =>{
    try{
        app.listen(PORT, async ()=>{
            await sequelize.sync({alter: true});
            console.log('Database connected');
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

main();