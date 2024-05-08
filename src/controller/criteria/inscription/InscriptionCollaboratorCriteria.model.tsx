import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CollaboratorCriteria} from '../collaborator/CollaboratorCriteria';
import {InscriptionCollaboratorTypeCriteria} from '../inscription/InscriptionCollaboratorTypeCriteria';
import {PackagingCriteria} from '../packaging/PackagingCriteria';
import {InscriptionCollaboratorStateCriteria} from '../inscription/InscriptionCollaboratorStateCriteria';



export class InscriptionCollaboratorCriteria  extends  BaseCriteria {

    public id: number;

    public startDate: Date;
    public startDateFrom: Date;
    public startDateTo: Date;
    public endDate: Date;
    public endDateFrom: Date;
    public endDateTo: Date;
    public renewDate: Date;
    public renewDateFrom: Date;
    public renewDateTo: Date;
     public consumedEntity: null | number;
     public consumedEntityMin: null | number;
     public consumedEntityMax: null | number;
     public consumedProjet: null | number;
     public consumedProjetMin: null | number;
     public consumedProjetMax: null | number;
     public consumedAttribut: null | number;
     public consumedAttributMin: null | number;
     public consumedAttributMax: null | number;
     public consumedIndicator: null | number;
     public consumedIndicatorMin: null | number;
     public consumedIndicatorMax: null | number;
  public packaging: PackagingCriteria ;
  public packagings: Array<PackagingCriteria> ;
  public collaborator: CollaboratorCriteria ;
  public collaborators: Array<CollaboratorCriteria> ;
  public inscriptionCollaboratorState: InscriptionCollaboratorStateCriteria ;
  public inscriptionCollaboratorStates: Array<InscriptionCollaboratorStateCriteria> ;
  public inscriptionCollaboratorType: InscriptionCollaboratorTypeCriteria ;
  public inscriptionCollaboratorTypes: Array<InscriptionCollaboratorTypeCriteria> ;
      public inscriptionMembres: Array<InscriptionMembreCriteria>;

    constructor() {
        super();
        this.startDate = null;
        this.startDateFrom  = null;
        this.startDateTo = null;
        this.endDate = null;
        this.endDateFrom  = null;
        this.endDateTo = null;
        this.renewDate = null;
        this.renewDateFrom  = null;
        this.renewDateTo = null;
        this.consumedEntity = null;
        this.consumedEntityMin = null;
        this.consumedEntityMax = null;
        this.consumedProjet = null;
        this.consumedProjetMin = null;
        this.consumedProjetMax = null;
        this.consumedAttribut = null;
        this.consumedAttributMin = null;
        this.consumedAttributMax = null;
        this.consumedIndicator = null;
        this.consumedIndicatorMin = null;
        this.consumedIndicatorMax = null;
        this.packaging = new PackagingCriteria() ;
        this.packagings = new Array<PackagingCriteria>() ;
        this.collaborator = new CollaboratorCriteria() ;
        this.collaborators = new Array<CollaboratorCriteria>() ;
        this.inscriptionCollaboratorState = new InscriptionCollaboratorStateCriteria() ;
        this.inscriptionCollaboratorStates = new Array<InscriptionCollaboratorStateCriteria>() ;
        this.inscriptionCollaboratorType = new InscriptionCollaboratorTypeCriteria() ;
        this.inscriptionCollaboratorTypes = new Array<InscriptionCollaboratorTypeCriteria>() ;
    }

}
