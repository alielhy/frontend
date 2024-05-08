import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CategoryProjectTemplateCriteria} from '../template/CategoryProjectTemplateCriteria';
import {DomainTemplateCriteria} from '../template/DomainTemplateCriteria';
import {MemberCriteria} from '../collaborator/MemberCriteria';



export class ProjectTemplateCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public name: string;
    public nameLike: string;
    public yaml: string;
    public yamlLike: string;
    public addingDate: Date;
    public addingDateFrom: Date;
    public addingDateTo: Date;
    public lastUpdateDate: Date;
    public lastUpdateDateFrom: Date;
    public lastUpdateDateTo: Date;
    public projectTemplateTags: string;
    public projectTemplateTagsLike: string;
     public price: null | number;
     public priceMin: null | number;
     public priceMax: null | number;
  public categoryProjectTemplate: CategoryProjectTemplateCriteria ;
  public categoryProjectTemplates: Array<CategoryProjectTemplateCriteria> ;
  public domainTemplate: DomainTemplateCriteria ;
  public domainTemplates: Array<DomainTemplateCriteria> ;
  public member: MemberCriteria ;
  public members: Array<MemberCriteria> ;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.name = '';
        this.nameLike = '';
        this.yaml = '';
        this.yamlLike = '';
        this.addingDate = null;
        this.addingDateFrom  = null;
        this.addingDateTo = null;
        this.lastUpdateDate = null;
        this.lastUpdateDateFrom  = null;
        this.lastUpdateDateTo = null;
        this.projectTemplateTags = '';
        this.projectTemplateTagsLike = '';
        this.price = null;
        this.priceMin = null;
        this.priceMax = null;
        this.categoryProjectTemplate = new CategoryProjectTemplateCriteria() ;
        this.categoryProjectTemplates = new Array<CategoryProjectTemplateCriteria>() ;
        this.domainTemplate = new DomainTemplateCriteria() ;
        this.domainTemplates = new Array<DomainTemplateCriteria>() ;
        this.member = new MemberCriteria() ;
        this.members = new Array<MemberCriteria>() ;
    }

}
