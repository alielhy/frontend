import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {PackagingDto} from '../../../model/packaging/Packaging.model';
import {PackagingCriteria} from '../../../criteria/packaging/PackagingCriteria.model';

export class PackagingAdminService extends AbstractService<PackagingDto, PackagingCriteria>{

    constructor() {
        super(ADMIN_URL , 'packaging/');
    }

};
