import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {CategoryPackagingDto} from '../../../model/category/CategoryPackaging.model';
import {CategoryPackagingCriteria} from '../../../criteria/category/CategoryPackagingCriteria.model';

export class CategoryPackagingAdminService extends AbstractService<CategoryPackagingDto, CategoryPackagingCriteria>{

    constructor() {
        super(ADMIN_URL , 'categoryPackaging/');
    }

};
