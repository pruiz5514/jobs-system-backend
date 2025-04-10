import express from 'express';
import validatorHandler from "../middleware/validatorHandler.js";
import { companiesSchema } from "../schemas/companies.schema.js";
import CompaniesService from "../services/companies.service.js";


const router = express.Router();

const service = new CompaniesService()

router.post('/',
    validatorHandler(companiesSchema),
    async (req, res, next) => {
        try{
            const body = req.body;
            const newCompany = await service.create(body)
            return res.status(201).json({message:'Company succesfully created', newCompany: newCompany})
        }catch(error){
            next(error)
        }
    }
)

router.get('/', 
    async (req, res, next) => {
        try{
            const companies = await service.find();
            return res.status(200).json(companies)
        }catch(error){
            next(error)
        }
    }
)

export default router