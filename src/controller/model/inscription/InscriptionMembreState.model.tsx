import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class InscriptionMembreStateDto extends BaseDto{

    public code: string;

    public name: string;



    constructor() {
        super();
        this.code = '';
        this.name = 'select a inscriptionMembreState';
        }

}
