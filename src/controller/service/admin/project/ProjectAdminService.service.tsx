import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {ProjectDto} from '../../../model/project/Project.model';
import {ProjectCriteria} from '../../../criteria/project/ProjectCriteria.model';

export class ProjectAdminService extends AbstractService<ProjectDto, ProjectCriteria>{

    constructor() {
        super(ADMIN_URL , 'project/');
    }

};
