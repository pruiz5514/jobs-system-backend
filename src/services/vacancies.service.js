import { ValidationError } from "sequelize";
import { Op } from 'sequelize';
import BaseService from "./base.service.js";
import { Vacancies } from "../database/models/vacancies.model.js";
import { Companies } from "../database/models/companies.model.js";

class VacanciesService extends BaseService{
    constructor(){
        super(Vacancies)
    }

    async create(data){
        const existingVacancy = await this.model.findOne({where: {title: data.title, company_id: data.company_id}})

        if(existingVacancy){
            throw new ValidationError('La vancante ya se encuentra registrada')
        }

        const newVancancy = {
            title: data.title,
            description: data.description,
            status: data.status,
            company_id: data.company_id
        }

        return super.create(newVancancy)
    }

    async findAll(page, size, name){
        const offset = page * size;

        const whereClause = name
            ? {
                title: {
                    [Op.iLike]: `%${name}%` 
                }
            }
            : {};

        const {count, rows} = await this.model.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ['company_id'] },
            include: [
                    {
                    model: Companies,
                    as: 'company',
                }
            ],
            offset,
            limit: size
        });

        const totalPages = Math.ceil(count / size);
        
        return {
            content: rows,
            pageable: {
                pageNumber: page,
                pageSize: size,
                sort: {
                    sorted: false,
                    unsorted: true,
                    empty: true
                },
                offset,
                paged: true,
                unpaged: false
            },
            totalPages,
            totalElements: count,
            last: page === totalPages - 1,
            numberOfElements: rows.length,
            size,
            number: page,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            first: page === 0,
            empty: rows.length === 0
        }
    }

    async findById(id){
        const vacancy = await this.model.findByPk(id,{
            attributes: { exclude: ['company_id'] },
            include:[
                {
                    model: Companies,
                    as: 'company',
                }
            ]
        })

        return vacancy
    }
}

export default VacanciesService