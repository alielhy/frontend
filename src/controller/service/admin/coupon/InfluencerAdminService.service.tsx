import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {InfluencerDto} from '../../../model/coupon/Influencer.model';
import {InfluencerCriteria} from '../../../criteria/coupon/InfluencerCriteria.model';

export class InfluencerAdminService extends AbstractService<InfluencerDto, InfluencerCriteria>{

    constructor() {
        super(ADMIN_URL , 'influencer/');
    }

};
