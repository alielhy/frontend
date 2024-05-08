import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InscriptionCollaboratorStateDto} from '../../../model/inscription/InscriptionCollaboratorState.model';
import {InscriptionCollaboratorStateCriteria} from '../../../criteria/inscription/InscriptionCollaboratorStateCriteria.model';

export class InscriptionCollaboratorStateAdminService extends AbstractService<InscriptionCollaboratorStateDto, InscriptionCollaboratorStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'inscriptionCollaboratorState/');
    }

};
