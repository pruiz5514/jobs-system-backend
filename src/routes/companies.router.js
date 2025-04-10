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
            const page = parseInt(req.query.page) || 0;
            const size = parseInt(req.query.size) || 10;
            const companies = await service.findAll(page, size);
            return res.status(200).json(companies)
        }catch(error){
            next(error)
        }
    }
)

router.get('/:id', 
    async(req, res, next) => {
        try{
            const {id} = req.params
            const company = await service.findOne(id) 
            return res.status(200).json(company)
        }catch(error){
            next(error)
        }
    }
)

export default router