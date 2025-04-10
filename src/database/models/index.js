import { Companies } from "./companies.model.js";
import { Vacancies } from "./vacancies.model.js";

Companies.hasMany(Vacancies, {foreignKey: 'company_id'});
Vacancies.belongsTo(Companies, {foreignKey: 'company_id'})