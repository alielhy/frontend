import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InscriptionCollaboratorTypeDto} from '../../../model/inscription/InscriptionCollaboratorType.model';
import {InscriptionCollaboratorTypeCriteria} from '../../../criteria/inscription/InscriptionCollaboratorTypeCriteria.model';

export class InscriptionCollaboratorTypeAdminService extends AbstractService<InscriptionCollaboratorTypeDto, InscriptionCollaboratorTypeCriteria>{

    constructor() {
        super(ADMIN_URL , 'inscriptionCollaboratorType/');
    }

};
