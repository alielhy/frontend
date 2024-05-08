import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";





export class PaimentCollaboratorStateCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.libelle = '';
        this.libelleLike = '';
    }

}
