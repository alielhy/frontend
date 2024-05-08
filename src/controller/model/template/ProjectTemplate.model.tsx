import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {CategoryProjectTemplateDto} from '../template/CategoryProjectTemplate.model';
import {DomainTemplateDto} from '../template/DomainTemplate.model';
import {MemberDto} from '../collaborator/Member.model';

export class ProjectTemplateDto extends BaseDto{

    public code: string;

    public name: string;

    public yaml: string;

   public addingDate: Date;

   public lastUpdateDate: Date;

    public projectTemplateTags: string;

    public price: null | number;

    public categoryProjectTemplate: CategoryProjectTemplateDto ;
    public domainTemplate: DomainTemplateDto ;
    public member: MemberDto ;


    constructor() {
        super();
        this.code = '';
        this.name = 'select a projectTemplate';
        this.yaml = '';
        this.addingDate = null;
        this.lastUpdateDate = null;
        this.projectTemplateTags = '';
        this.price = null;
        this.categoryProjectTemplate = new CategoryProjectTemplateDto() ;
        this.domainTemplate = new DomainTemplateDto() ;
        this.member = new MemberDto() ;
        }

}
