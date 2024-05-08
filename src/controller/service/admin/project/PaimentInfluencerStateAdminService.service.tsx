import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {PaimentInfluencerStateDto} from '../../../model/project/PaimentInfluencerState.model';
import {PaimentInfluencerStateCriteria} from '../../../criteria/project/PaimentInfluencerStateCriteria.model';

export class PaimentInfluencerStateAdminService extends AbstractService<PaimentInfluencerStateDto, PaimentInfluencerStateCriteria>{

    constructor() {
        super(ADMIN_URL , 'paimentInfluencerState/');
    }

};
