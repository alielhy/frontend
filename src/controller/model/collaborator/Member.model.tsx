import {BaseDto} from "../../../zynerator/dto/BaseDto.model";

import {CollaboratorDto} from '../collaborator/Collaborator.model';

export class MemberDto extends BaseDto{

    public description: string;

   public credentialsNonExpired: boolean;

   public enabled: boolean;

   public accountNonExpired: boolean;

   public accountNonLocked: boolean;

   public passwordChanged: boolean;

    public username: string;

    public password: string;

    public collaborator: CollaboratorDto ;


    constructor() {
        super();
        this.description = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.password = '';
        this.collaborator = new CollaboratorDto() ;
        }

}
