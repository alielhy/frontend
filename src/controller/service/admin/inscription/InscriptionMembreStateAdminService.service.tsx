import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InscriptionMembreStateDto} from '../../../model/inscription/InscriptionMembreState.model';
import {InscriptionMembreStateCriteria} from '../../../criteria/inscription/InscriptionMembreStateCriteria.model';

export class InscriptionMembreStateAdminService extends AbstractService<InscriptionMembreStateDto, InscriptionMembreStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'inscriptionMembreState/');
    }

};
