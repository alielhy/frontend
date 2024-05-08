import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {CollaboratorDto} from '../collaborator/Collaborator.model';
import {InscriptionCollaboratorTypeDto} from '../inscription/InscriptionCollaboratorType.model';
import {PackagingDto} from '../packaging/Packaging.model';
import {InscriptionCollaboratorStateDto} from '../inscription/InscriptionCollaboratorState.model';

export class InscriptionCollaboratorDto extends BaseDto{

   public startDate: Date;

   public endDate: Date;

   public renewDate: Date;

    public consumedEntity: null | number;

    public consumedProjet: null | number;

    public consumedAttribut: null | number;

    public consumedIndicator: null | number;

    public packaging: PackagingDto ;
    public collaborator: CollaboratorDto ;
    public inscriptionCollaboratorState: InscriptionCollaboratorStateDto ;
    public inscriptionCollaboratorType: InscriptionCollaboratorTypeDto ;
     public inscriptionMembres: Array<InscriptionMembreDto>;


    constructor() {
        super();
        this.startDate = null;
        this.endDate = null;
        this.renewDate = null;
        this.consumedEntity = null;
        this.consumedProjet = null;
        this.consumedAttribut = null;
        this.consumedIndicator = null;
        this.packaging = new PackagingDto() ;
        this.collaborator = new CollaboratorDto() ;
        this.inscriptionCollaboratorState = new InscriptionCollaboratorStateDto() ;
        this.inscriptionCollaboratorType = new InscriptionCollaboratorTypeDto() ;
        this.inscriptionMembres = new Array<InscriptionMembreDto>();
        }

}
