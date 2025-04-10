import express from 'express';
import cors from 'cors';
import { sequelize } from './database/sequalize.js';
import { routerApi } from './routes/index.js';
import errorHandler from './middleware/error.handler.js';

import './database/models/companies.model.js'
import './database/models/vacancies.model.js'
import './database/models/index.js'


const app = express()
const PORT  = process.env.PORT;

app.use(express.json())

app.use(cors());

routerApi(app)
app.use(errorHandler);

const main = () =>{
    try{
        app.listen(PORT, async ()=>{
            await sequelize.sync({alter: true});
            console.log('Database connected');
            // console.log(`Server is running on ${process.env.BACK_HOST}`)
        })
    }catch(error){
        console.log(error)
    }
}

main();