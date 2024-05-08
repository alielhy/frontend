import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CouponDetailCriteria} from '../coupon/CouponDetailCriteria';
import {PaimentCollaboratorStateCriteria} from '../project/PaimentCollaboratorStateCriteria';
import {InscriptionCollaboratorCriteria} from '../inscription/InscriptionCollaboratorCriteria';



export class PaimentCollaboratorCriteria  extends  BaseCriteria {

    public id: number;

    public name: string;
    public nameLike: string;
    public description: string;
    public descriptionLike: string;
    public code: string;
    public codeLike: string;
     public amountToPaid: null | number;
     public amountToPaidMin: null | number;
     public amountToPaidMax: null | number;
     public total: null | number;
     public totalMin: null | number;
     public totalMax: null | number;
     public discount: null | number;
     public discountMin: null | number;
     public discountMax: null | number;
     public remaining: null | number;
     public remainingMin: null | number;
     public remainingMax: null | number;
    public paiementDate: Date;
    public paiementDateFrom: Date;
    public paiementDateTo: Date;
  public couponDetail: CouponDetailCriteria ;
  public couponDetails: Array<CouponDetailCriteria> ;
  public inscriptionCollaborator: InscriptionCollaboratorCriteria ;
  public inscriptionCollaborators: Array<InscriptionCollaboratorCriteria> ;
  public paimentCollaboratorState: PaimentCollaboratorStateCriteria ;
  public paimentCollaboratorStates: Array<PaimentCollaboratorStateCriteria> ;

    constructor() {
        super();
        this.name = '';
        this.nameLike = '';
        this.description = '';
        this.descriptionLike = '';
        this.code = '';
        this.codeLike = '';
        this.amountToPaid = null;
        this.amountToPaidMin = null;
        this.amountToPaidMax = null;
        this.total = null;
        this.totalMin = null;
        this.totalMax = null;
        this.discount = null;
        this.discountMin = null;
        this.discountMax = null;
        this.remaining = null;
        this.remainingMin = null;
        this.remainingMax = null;
        this.paiementDate = null;
        this.paiementDateFrom  = null;
        this.paiementDateTo = null;
        this.couponDetail = new CouponDetailCriteria() ;
        this.couponDetails = new Array<CouponDetailCriteria>() ;
        this.inscriptionCollaborator = new InscriptionCollaboratorCriteria() ;
        this.inscriptionCollaborators = new Array<InscriptionCollaboratorCriteria>() ;
        this.paimentCollaboratorState = new PaimentCollaboratorStateCriteria() ;
        this.paimentCollaboratorStates = new Array<PaimentCollaboratorStateCriteria>() ;
    }

}
