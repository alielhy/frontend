import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {InscriptionMembreDto} from '../inscription/InscriptionMembre.model';
import {ProjectStateDto} from '../project/ProjectState.model';
import {DomainTemplateDto} from '../template/DomainTemplate.model';
import {ProjectTemplateDto} from '../template/ProjectTemplate.model';

export class ProjectDto extends BaseDto{

    public code: string;

    public name: string;

   public generatedDate: Date;

    public yaml: string;

    public projectState: ProjectStateDto ;
    public inscriptionMembre: InscriptionMembreDto ;
    public projectTemplate: ProjectTemplateDto ;
    public domainTemplate: DomainTemplateDto ;


    constructor() {
        super();
        this.code = 'select a project';
        this.name = '';
        this.generatedDate = null;
        this.yaml = '';
        this.projectState = new ProjectStateDto() ;
        this.inscriptionMembre = new InscriptionMembreDto() ;
        this.projectTemplate = new ProjectTemplateDto() ;
        this.domainTemplate = new DomainTemplateDto() ;
        }

}
