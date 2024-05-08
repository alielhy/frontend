import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {InscriptionMembreStateDto} from '../inscription/InscriptionMembreState.model';
import {InscriptionCollaboratorDto} from '../inscription/InscriptionCollaborator.model';
import {MemberDto} from '../collaborator/Member.model';

export class InscriptionMembreDto extends BaseDto{

   public inscriptionDate: Date;

    public consumedEntity: null | number;

    public consumedProjet: null | number;

    public consumedAttribut: null | number;

    public consumedIndicator: null | number;

    public affectedEntity: null | number;

    public affectedProjet: null | number;

    public affectedAttribut: null | number;

    public affectedIndicator: null | number;

    public member: MemberDto ;
    public inscriptionMembreState: InscriptionMembreStateDto ;
    public inscriptionCollaborator: InscriptionCollaboratorDto ;


    constructor() {
        super();
        this.inscriptionDate = null;
        this.consumedEntity = null;
        this.consumedProjet = null;
        this.consumedAttribut = null;
        this.consumedIndicator = null;
        this.affectedEntity = null;
        this.affectedProjet = null;
        this.affectedAttribut = null;
        this.affectedIndicator = null;
        this.member = new MemberDto() ;
        this.inscriptionMembreState = new InscriptionMembreStateDto() ;
        this.inscriptionCollaborator = new InscriptionCollaboratorDto() ;
        }

}
