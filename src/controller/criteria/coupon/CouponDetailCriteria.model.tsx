import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CouponCriteria} from '../coupon/CouponCriteria';
import {PackagingCriteria} from '../packaging/PackagingCriteria';



export class CouponDetailCriteria  extends  BaseCriteria {

    public id: number;

     public discount: null | number;
     public discountMin: null | number;
     public discountMax: null | number;
     public amountGivenInfluencer: null | number;
     public amountGivenInfluencerMin: null | number;
     public amountGivenInfluencerMax: null | number;
     public usingNumber: null | number;
     public usingNumberMin: null | number;
     public usingNumberMax: null | number;
     public maxUsingNumber: null | number;
     public maxUsingNumberMin: null | number;
     public maxUsingNumberMax: null | number;
  public packaging: PackagingCriteria ;
  public packagings: Array<PackagingCriteria> ;
  public coupon: CouponCriteria ;
  public coupons: Array<CouponCriteria> ;

    constructor() {
        super();
        this.discount = null;
        this.discountMin = null;
        this.discountMax = null;
        this.amountGivenInfluencer = null;
        this.amountGivenInfluencerMin = null;
        this.amountGivenInfluencerMax = null;
        this.usingNumber = null;
        this.usingNumberMin = null;
        this.usingNumberMax = null;
        this.maxUsingNumber = null;
        this.maxUsingNumberMin = null;
        this.maxUsingNumberMax = null;
        this.packaging = new PackagingCriteria() ;
        this.packagings = new Array<PackagingCriteria>() ;
        this.coupon = new CouponCriteria() ;
        this.coupons = new Array<CouponCriteria>() ;
    }

}
