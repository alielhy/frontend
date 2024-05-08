import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class PaimentCollaboratorStateDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = 'select a paimentCollaboratorState';
        this.libelle = '';
        }

}
