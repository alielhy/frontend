import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InscriptionMembreDto} from '../../../model/inscription/InscriptionMembre.model';
import {InscriptionMembreCriteria} from '../../../criteria/inscription/InscriptionMembreCriteria.model';

export class InscriptionMembreAdminService extends AbstractService<InscriptionMembreDto, InscriptionMembreCriteria>{

    constructor() {
        super(ADMIN_URL , 'inscriptionMembre/');
    }

};
