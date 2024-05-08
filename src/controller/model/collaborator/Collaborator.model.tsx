import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class CollaboratorDto extends BaseDto{

    public description: string;

    public rib: string;

   public credentialsNonExpired: boolean;

   public enabled: boolean;

   public accountNonExpired: boolean;

   public accountNonLocked: boolean;

   public passwordChanged: boolean;

    public username: string;

    public password: string;



    constructor() {
        super();
        this.description = 'select a collaborator';
        this.rib = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.password = '';
        }

}
