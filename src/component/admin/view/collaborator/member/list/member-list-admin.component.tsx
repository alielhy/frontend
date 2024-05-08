import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';
import  {MemberDto}  from '../../../../../../controller/model/collaborator/Member.model';
import MemberAdminCard from "../card/member-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const MemberAdminList: React.FC = () =>  {

    const [members, setMembers] = useState<MemberDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type MemberResponse = AxiosResponse<MemberDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [memberId, setMemberId] = useState(0);

    const service = new MemberAdminService();

    const handleDeletePress = (id: number) => {
        setMemberId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(memberId);
            setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting member:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [memberResponse] = await Promise.all<MemberResponse>([
            service.getList(),
            ]);
            setMembers(memberResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleFetchAndUpdate = async (id: number) => {
        try {
            const memberResponse = await service.find(id);
            const memberData = memberResponse.data;
            navigation.navigate('MemberAdminUpdate', { member: memberData });
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const memberResponse = await service.find(id);
            const memberData = memberResponse.data;
            navigation.navigate('MemberAdminDetails', { member: memberData });
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Member List</Text>

        <View style={{ marginBottom: 100 }}>
            {members && members.length > 0 ? ( members.map((member) => (
                <MemberAdminCard key={member.id}
                    description = {member.description}
                    collaboratorName = {member.collaborator.description}
                    credentialsNonExpired = {member.credentialsNonExpired}
                    enabled = {member.enabled}
                    accountNonExpired = {member.accountNonExpired}
                    accountNonLocked = {member.accountNonLocked}
                    passwordChanged = {member.passwordChanged}
                    username = {member.username}
                    password = {member.password}
                    onPressDelete={() => handleDeletePress(member.id)}
                    onUpdate={() => handleFetchAndUpdate(member.id)}
                    onDetails={() => handleFetchAndDetails(member.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No members found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Member'} />

    </ScrollView>

);
};

export default MemberAdminList;
