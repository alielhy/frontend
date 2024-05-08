import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CategoryPackagingCriteria} from '../category/CategoryPackagingCriteria';



export class PackagingCriteria  extends  BaseCriteria {

    public id: number;

    public name: string;
    public nameLike: string;
    public code: string;
    public codeLike: string;
    public description: string;
    public descriptionLike: string;
    public dateStart: Date;
    public dateStartFrom: Date;
    public dateStartTo: Date;
    public dateEnd: Date;
    public dateEndFrom: Date;
    public dateEndTo: Date;
     public price: null | number;
     public priceMin: null | number;
     public priceMax: null | number;
     public maxEntity: null | number;
     public maxEntityMin: null | number;
     public maxEntityMax: null | number;
     public maxProjet: null | number;
     public maxProjetMin: null | number;
     public maxProjetMax: null | number;
     public maxAttribut: null | number;
     public maxAttributMin: null | number;
     public maxAttributMax: null | number;
     public maxIndicator: null | number;
     public maxIndicatorMin: null | number;
     public maxIndicatorMax: null | number;
  public categoryPackaging: CategoryPackagingCriteria ;
  public categoryPackagings: Array<CategoryPackagingCriteria> ;

    constructor() {
        super();
        this.name = '';
        this.nameLike = '';
        this.code = '';
        this.codeLike = '';
        this.description = '';
        this.descriptionLike = '';
        this.dateStart = null;
        this.dateStartFrom  = null;
        this.dateStartTo = null;
        this.dateEnd = null;
        this.dateEndFrom  = null;
        this.dateEndTo = null;
        this.price = null;
        this.priceMin = null;
        this.priceMax = null;
        this.maxEntity = null;
        this.maxEntityMin = null;
        this.maxEntityMax = null;
        this.maxProjet = null;
        this.maxProjetMin = null;
        this.maxProjetMax = null;
        this.maxAttribut = null;
        this.maxAttributMin = null;
        this.maxAttributMax = null;
        this.maxIndicator = null;
        this.maxIndicatorMin = null;
        this.maxIndicatorMax = null;
        this.categoryPackaging = new CategoryPackagingCriteria() ;
        this.categoryPackagings = new Array<CategoryPackagingCriteria>() ;
    }

}
