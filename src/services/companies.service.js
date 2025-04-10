import { ValidationError } from "sequelize";
import { Companies } from "../database/models/companies.model.js";
import BaseService from "./base.service.js";

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
}

export default CompaniesService