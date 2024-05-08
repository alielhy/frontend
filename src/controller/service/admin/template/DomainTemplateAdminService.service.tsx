import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {DomainTemplateDto} from '../../../model/template/DomainTemplate.model';
import {DomainTemplateCriteria} from '../../../criteria/template/DomainTemplateCriteria.model';

export class DomainTemplateAdminService extends AbstractService<DomainTemplateDto, DomainTemplateCriteria>{

    constructor() {
        super(ADMIN_URL , 'domainTemplate/');
    }

};
