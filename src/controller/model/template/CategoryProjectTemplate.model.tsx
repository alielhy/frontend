import {BaseDto} from "../../../zynerator/dto/BaseDto.model";


export class CategoryProjectTemplateDto extends BaseDto{

    public code: string;

    public name: string;



    constructor() {
        super();
        this.code = '';
        this.name = 'select a categoryProjectTemplate';
        }

}
