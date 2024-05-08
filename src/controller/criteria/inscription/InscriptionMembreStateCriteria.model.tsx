import {BaseCriteria} from "../../../zynerator/criteria/BaseCriteria.model";





export class InscriptionMembreStateCriteria  extends  BaseCriteria {

    public id: number;

    public code: string;
    public codeLike: string;
    public name: string;
    public nameLike: string;

    constructor() {
        super();
        this.code = '';
        this.codeLike = '';
        this.name = '';
        this.nameLike = '';
    }

}
