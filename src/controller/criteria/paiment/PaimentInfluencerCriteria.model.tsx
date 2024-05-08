import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CouponCriteria} from '../coupon/CouponCriteria';
import {InfluencerCriteria} from '../coupon/InfluencerCriteria';
import {PaimentInfluencerStateCriteria} from '../project/PaimentInfluencerStateCriteria';



export class PaimentInfluencerCriteria  extends  BaseCriteria {

    public id: number;

    public name: string;
    public nameLike: string;
    public description: string;
    public descriptionLike: string;
    public code: string;
    public codeLike: string;
     public total: null | number;
     public totalMin: null | number;
     public totalMax: null | number;
     public nbrUtilisation: null | number;
     public nbrUtilisationMin: null | number;
     public nbrUtilisationMax: null | number;
    public datePaiement: Date;
    public datePaiementFrom: Date;
    public datePaiementTo: Date;
  public influencer: InfluencerCriteria ;
  public influencers: Array<InfluencerCriteria> ;
  public coupon: CouponCriteria ;
  public coupons: Array<CouponCriteria> ;
  public paimentInfluencerState: PaimentInfluencerStateCriteria ;
  public paimentInfluencerStates: Array<PaimentInfluencerStateCriteria> ;

    constructor() {
        super();
        this.name = '';
        this.nameLike = '';
        this.description = '';
        this.descriptionLike = '';
        this.code = '';
        this.codeLike = '';
        this.total = null;
        this.totalMin = null;
        this.totalMax = null;
        this.nbrUtilisation = null;
        this.nbrUtilisationMin = null;
        this.nbrUtilisationMax = null;
        this.datePaiement = null;
        this.datePaiementFrom  = null;
        this.datePaiementTo = null;
        this.influencer = new InfluencerCriteria() ;
        this.influencers = new Array<InfluencerCriteria>() ;
        this.coupon = new CouponCriteria() ;
        this.coupons = new Array<CouponCriteria>() ;
        this.paimentInfluencerState = new PaimentInfluencerStateCriteria() ;
        this.paimentInfluencerStates = new Array<PaimentInfluencerStateCriteria>() ;
    }

}
