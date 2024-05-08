import { ADMIN_URL } from '../../../../../config/AppConfig';
import AbstractService from "../../../../zynerator/service/AbstractService";

import {MemberDto} from '../../../model/collaborator/Member.model';
import {MemberCriteria} from '../../../criteria/collaborator/MemberCriteria.model';

export class MemberAdminService extends AbstractService<MemberDto, MemberCriteria>{

    constructor() {
        super(ADMIN_URL , 'member/');
    }

};
