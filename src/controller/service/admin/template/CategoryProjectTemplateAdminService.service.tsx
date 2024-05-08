import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {CategoryProjectTemplateDto} from '../../../model/template/CategoryProjectTemplate.model';
import {CategoryProjectTemplateCriteria} from '../../../criteria/template/CategoryProjectTemplateCriteria.model';

export class CategoryProjectTemplateAdminService extends AbstractService<CategoryProjectTemplateDto, CategoryProjectTemplateCriteria>{

    constructor() {
        super(ADMIN_URL , 'categoryProjectTemplate/');
    }

};
