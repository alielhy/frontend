import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";


import {CollaboratorCriteria} from '../collaborator/CollaboratorCriteria';



export class MemberCriteria  extends  BaseCriteria {

    public id: number;

    public description: string;
    public descriptionLike: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public username: string;
    public usernameLike: string;
    public password: string;
    public passwordLike: string;
  public collaborator: CollaboratorCriteria ;
  public collaborators: Array<CollaboratorCriteria> ;

    constructor() {
        super();
        this.description = '';
        this.descriptionLike = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.usernameLike = '';
        this.password = '';
        this.passwordLike = '';
        this.collaborator = new CollaboratorCriteria() ;
        this.collaborators = new Array<CollaboratorCriteria>() ;
    }

}
