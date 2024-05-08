import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {CollaboratorDto} from '../../../model/collaborator/Collaborator.model';
import {CollaboratorCriteria} from '../../../criteria/collaborator/CollaboratorCriteria.model';

export class CollaboratorAdminService extends AbstractService<CollaboratorDto, CollaboratorCriteria>{

    constructor() {
        super(ADMIN_URL , 'collaborator/');
    }

};
