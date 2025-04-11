import { ValidationError } from "sequelize";
import { Op } from 'sequelize';
import { Companies } from "../database/models/companies.model.js";
import BaseService from "./base.service.js";
import { Vacancies } from "../database/models/vacancies.model.js";

class CompaniesService extends BaseService{
    constructor(){
        super(Companies)
    }

    async create(data){
        const existingCompany = await this.model.findOne({where: {name: data.name}})

        if(existingCompany){
            throw new ValidationError('La compañia ya se encuentra registrada')
        }

        const newCompany = {
            name: data.name,
            location: data.location,
            contact: data.contact
        }

        return super.create(newCompany)
    }

    async findAll(page, size, name){
        const offset = page * size;

        const whereClause = name
        ? {
            name: {
                [Op.iLike]: `%${name}%` 
            }
        }
        : {};

        const {rows} = await this.model.findAndCountAll({
            where: whereClause,
            include: [
                    {
                    model: Vacancies,
                }
            ],
            offset,
            limit: size
        });

        const count = await this.model.count({ where: whereClause })
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

   
}

export default CompaniesService