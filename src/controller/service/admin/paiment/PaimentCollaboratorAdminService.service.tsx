import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {PaimentCollaboratorDto} from '../../../model/paiment/PaimentCollaborator.model';
import {PaimentCollaboratorCriteria} from '../../../criteria/paiment/PaimentCollaboratorCriteria.model';

export class PaimentCollaboratorAdminService extends AbstractService<PaimentCollaboratorDto, PaimentCollaboratorCriteria>{

    constructor() {
        super(ADMIN_URL , 'paimentCollaborator/');
    }

};
