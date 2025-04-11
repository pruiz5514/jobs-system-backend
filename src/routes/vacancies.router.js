import express from 'express';
import validatorHandler from "../middleware/validatorHandler.js";
import { vacanciesSchema } from '../schemas/vacancies.schema.js';
import VacanciesService from '../services/vacancies.service.js';


const router = express.Router();

const service = new VacanciesService()

router.post('/',
    validatorHandler(vacanciesSchema),
    async (req, res, next) => {
        try{
            const body = req.body;
            const newVacancy = await service.create(body)
            return res.status(201).json({message:'Vacancy succesfully created', newVacancy: newVacancy})
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
            const vacancies = await service.findAll(page, size);
            return res.status(200).json(vacancies)
        }catch(error){
            next(error)
        }
    }
)
router.get('/:id', 
    async (req, res, next) => {
        try{
            const {id} = req.params
            const vacancy = await service.findById(id)
            return res.status(200).json(vacancy)
        }catch(error){
            next(error)
        }
    }
)

router.put('/:id', 
    async(req, res, next) => {
        try{
            const {id} = req.params;
            const data = req.body
            const vacancyEdited = await service.update(id, data)
            return res.status(200).json(vacancyEdited)
        }catch(error){
            next(error)
        }
    }
)

router.delete('/:id', 
    async (req, res, next) => {
        try{
            const {id} = req.params;
            await service.delete(id)
            return res.status(200).json({message:"Deleted it"})
        }catch(error){
            next(error)
        }
    }
)

export default router