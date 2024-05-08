import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {InfluencerDto} from '../coupon/Influencer.model';

export class CouponDto extends BaseDto{

    public code: string;

   public dateStart: Date;

   public dateEnd: Date;

    public name: string;

    public influencer: InfluencerDto ;
     public couponDetails: Array<CouponDetailDto>;


    constructor() {
        super();
        this.code = '';
        this.dateStart = null;
        this.dateEnd = null;
        this.name = 'select a coupon';
        this.influencer = new InfluencerDto() ;
        this.couponDetails = new Array<CouponDetailDto>();
        }

}
