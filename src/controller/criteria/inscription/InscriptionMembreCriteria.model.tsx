import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {InscriptionMembreStateCriteria} from '../inscription/InscriptionMembreStateCriteria';
import {InscriptionCollaboratorCriteria} from '../inscription/InscriptionCollaboratorCriteria';
import {MemberCriteria} from '../collaborator/MemberCriteria';



export class InscriptionMembreCriteria  extends  BaseCriteria {

    public id: number;

    public inscriptionDate: Date;
    public inscriptionDateFrom: Date;
    public inscriptionDateTo: Date;
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
     public affectedEntity: null | number;
     public affectedEntityMin: null | number;
     public affectedEntityMax: null | number;
     public affectedProjet: null | number;
     public affectedProjetMin: null | number;
     public affectedProjetMax: null | number;
     public affectedAttribut: null | number;
     public affectedAttributMin: null | number;
     public affectedAttributMax: null | number;
     public affectedIndicator: null | number;
     public affectedIndicatorMin: null | number;
     public affectedIndicatorMax: null | number;
  public member: MemberCriteria ;
  public members: Array<MemberCriteria> ;
  public inscriptionMembreState: InscriptionMembreStateCriteria ;
  public inscriptionMembreStates: Array<InscriptionMembreStateCriteria> ;
  public inscriptionCollaborator: InscriptionCollaboratorCriteria ;
  public inscriptionCollaborators: Array<InscriptionCollaboratorCriteria> ;

    constructor() {
        super();
        this.inscriptionDate = null;
        this.inscriptionDateFrom  = null;
        this.inscriptionDateTo = null;
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
        this.affectedEntity = null;
        this.affectedEntityMin = null;
        this.affectedEntityMax = null;
        this.affectedProjet = null;
        this.affectedProjetMin = null;
        this.affectedProjetMax = null;
        this.affectedAttribut = null;
        this.affectedAttributMin = null;
        this.affectedAttributMax = null;
        this.affectedIndicator = null;
        this.affectedIndicatorMin = null;
        this.affectedIndicatorMax = null;
        this.member = new MemberCriteria() ;
        this.members = new Array<MemberCriteria>() ;
        this.inscriptionMembreState = new InscriptionMembreStateCriteria() ;
        this.inscriptionMembreStates = new Array<InscriptionMembreStateCriteria>() ;
        this.inscriptionCollaborator = new InscriptionCollaboratorCriteria() ;
        this.inscriptionCollaborators = new Array<InscriptionCollaboratorCriteria>() ;
    }

}
