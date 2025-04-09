import { Companies } from "./companies.model";
import { Vacancies } from "./vacancies.model";

Companies.hasMany(Vacancies, {foreignKey: 'company_id'});
Vacancies.belongsTo(Companies, {foreignKey: 'company_id'})