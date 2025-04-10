import express from 'express';
import companiesRouter from './companies.router.js'
import vacanciesRouter from './vacancies.router.js'

export function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/company', companiesRouter)
    router.use('/vacancy', vacanciesRouter)
}