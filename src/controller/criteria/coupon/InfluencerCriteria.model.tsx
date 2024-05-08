import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";





export class InfluencerCriteria  extends  BaseCriteria {

    public id: number;

    public nickName: string;
    public nickNameLike: string;
    public rib: string;
    public ribLike: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public username: string;
    public usernameLike: string;
    public password: string;
    public passwordLike: string;

    constructor() {
        super();
        this.nickName = '';
        this.nickNameLike = '';
        this.rib = '';
        this.ribLike = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.usernameLike = '';
        this.password = '';
        this.passwordLike = '';
    }

}
