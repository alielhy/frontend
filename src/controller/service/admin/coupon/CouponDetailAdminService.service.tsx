import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {CouponDetailDto} from '../../../model/coupon/CouponDetail.model';
import {CouponDetailCriteria} from '../../../criteria/coupon/CouponDetailCriteria.model';

export class CouponDetailAdminService extends AbstractService<CouponDetailDto, CouponDetailCriteria>{

    constructor() {
        super(ADMIN_URL , 'couponDetail/');
    }

};
