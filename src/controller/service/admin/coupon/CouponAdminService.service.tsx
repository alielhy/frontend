import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {CouponDto} from '../../../model/coupon/Coupon.model';
import {CouponCriteria} from '../../../criteria/coupon/CouponCriteria.model';

export class CouponAdminService extends AbstractService<CouponDto, CouponCriteria>{

    constructor() {
        super(ADMIN_URL , 'coupon/');
    }

};
