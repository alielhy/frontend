import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {InfluencerCriteria} from '../coupon/InfluencerCriteria';



export class CouponCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public dateStart: Date;
    public dateStartFrom: Date;
    public dateStartTo: Date;
    public dateEnd: Date;
    public dateEndFrom: Date;
    public dateEndTo: Date;
    public name: string;
    public nameLike: string;
  public influencer: InfluencerCriteria ;
  public influencers: Array<InfluencerCriteria> ;
      public couponDetails: Array<CouponDetailCriteria>;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.dateStart = null;
        this.dateStartFrom  = null;
        this.dateStartTo = null;
        this.dateEnd = null;
        this.dateEndFrom  = null;
        this.dateEndTo = null;
        this.name = '';
        this.nameLike = '';
        this.influencer = new InfluencerCriteria() ;
        this.influencers = new Array<InfluencerCriteria>() ;
    }

}
