import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {PaimentCollaboratorStateDto} from '../../../model/project/PaimentCollaboratorState.model';
import {PaimentCollaboratorStateCriteria} from '../../../criteria/project/PaimentCollaboratorStateCriteria.model';

export class PaimentCollaboratorStateAdminService extends AbstractService<PaimentCollaboratorStateDto, PaimentCollaboratorStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'paimentCollaboratorState/');
    }

};
