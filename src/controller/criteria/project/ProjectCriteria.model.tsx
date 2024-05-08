import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {InscriptionMembreCriteria} from '../inscription/InscriptionMembreCriteria';
import {ProjectStateCriteria} from '../project/ProjectStateCriteria';
import {DomainTemplateCriteria} from '../template/DomainTemplateCriteria';
import {ProjectTemplateCriteria} from '../template/ProjectTemplateCriteria';



export class ProjectCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public name: string;
    public nameLike: string;
    public generatedDate: Date;
    public generatedDateFrom: Date;
    public generatedDateTo: Date;
    public yaml: string;
    public yamlLike: string;
  public projectState: ProjectStateCriteria ;
  public projectStates: Array<ProjectStateCriteria> ;
  public inscriptionMembre: InscriptionMembreCriteria ;
  public inscriptionMembres: Array<InscriptionMembreCriteria> ;
  public projectTemplate: ProjectTemplateCriteria ;
  public projectTemplates: Array<ProjectTemplateCriteria> ;
  public domainTemplate: DomainTemplateCriteria ;
  public domainTemplates: Array<DomainTemplateCriteria> ;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.name = '';
        this.nameLike = '';
        this.generatedDate = null;
        this.generatedDateFrom  = null;
        this.generatedDateTo = null;
        this.yaml = '';
        this.yamlLike = '';
        this.projectState = new ProjectStateCriteria() ;
        this.projectStates = new Array<ProjectStateCriteria>() ;
        this.inscriptionMembre = new InscriptionMembreCriteria() ;
        this.inscriptionMembres = new Array<InscriptionMembreCriteria>() ;
        this.projectTemplate = new ProjectTemplateCriteria() ;
        this.projectTemplates = new Array<ProjectTemplateCriteria>() ;
        this.domainTemplate = new DomainTemplateCriteria() ;
        this.domainTemplates = new Array<DomainTemplateCriteria>() ;
    }

}
