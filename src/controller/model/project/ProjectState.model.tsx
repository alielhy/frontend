import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class ProjectStateDto extends BaseDto{

    public code: string;

    public libelle: string;



    constructor() {
        super();
        this.code = 'select a projectState';
        this.libelle = '';
        }

}
