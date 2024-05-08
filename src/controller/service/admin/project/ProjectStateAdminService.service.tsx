import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {ProjectStateDto} from '../../../model/project/ProjectState.model';
import {ProjectStateCriteria} from '../../../criteria/project/ProjectStateCriteria.model';

export class ProjectStateAdminService extends AbstractService<ProjectStateDto, ProjectStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'projectState/');
    }

};
