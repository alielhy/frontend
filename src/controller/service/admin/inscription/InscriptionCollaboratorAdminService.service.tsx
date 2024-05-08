import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InscriptionCollaboratorDto} from '../../../model/inscription/InscriptionCollaborator.model';
import {InscriptionCollaboratorCriteria} from '../../../criteria/inscription/InscriptionCollaboratorCriteria.model';

export class InscriptionCollaboratorAdminService extends AbstractService<InscriptionCollaboratorDto, InscriptionCollaboratorCriteria>{

    constructor() {
        super(ADMIN_URL , 'inscriptionCollaborator/');
    }

};
