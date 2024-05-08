import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {CouponDto} from '../coupon/Coupon.model';
import {PackagingDto} from '../packaging/Packaging.model';

export class CouponDetailDto extends BaseDto{

    public discount: null | number;

    public amountGivenInfluencer: null | number;

    public usingNumber: null | number;

    public maxUsingNumber: null | number;

    public packaging: PackagingDto ;
    public coupon: CouponDto ;


    constructor() {
        super();
        this.discount = null;
        this.amountGivenInfluencer = null;
        this.usingNumber = null;
        this.maxUsingNumber = null;
        this.packaging = new PackagingDto() ;
        this.coupon = new CouponDto() ;
        }

}
