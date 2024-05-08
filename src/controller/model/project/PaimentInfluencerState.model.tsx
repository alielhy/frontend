import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class PaimentInfluencerStateDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = 'select a paimentInfluencerState';
        this.libelle = '';
        }

}
