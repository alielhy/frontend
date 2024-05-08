import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {ProjectTemplateDto} from '../../../model/template/ProjectTemplate.model';
import {ProjectTemplateCriteria} from '../../../criteria/template/ProjectTemplateCriteria.model';

export class ProjectTemplateAdminService extends AbstractService<ProjectTemplateDto, ProjectTemplateCriteria>{

    constructor() {
        super(ADMIN_URL , 'projectTemplate/');
    }

};
