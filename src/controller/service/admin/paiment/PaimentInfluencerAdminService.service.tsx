import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {PaimentInfluencerDto} from '../../../model/paiment/PaimentInfluencer.model';
import {PaimentInfluencerCriteria} from '../../../criteria/paiment/PaimentInfluencerCriteria.model';

export class PaimentInfluencerAdminService extends AbstractService<PaimentInfluencerDto, PaimentInfluencerCriteria>{

    constructor() {
        super(ADMIN_URL , 'paimentInfluencer/');
    }

};
