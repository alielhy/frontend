import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';
import  {CollaboratorDto}  from '../../../../../../controller/model/collaborator/Collaborator.model';
import CollaboratorAdminCard from "../card/collaborator-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const CollaboratorAdminList: React.FC = () =>  {

    const [collaborators, setCollaborators] = useState<CollaboratorDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type CollaboratorResponse = AxiosResponse<CollaboratorDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [collaboratorId, setCollaboratorId] = useState(0);

    const service = new CollaboratorAdminService();

    const handleDeletePress = (id: number) => {
        setCollaboratorId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(collaboratorId);
            setCollaborators((prevCollaborators) => prevCollaborators.filter((collaborator) => collaborator.id !== collaboratorId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting collaborator:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [collaboratorResponse] = await Promise.all<CollaboratorResponse>([
            service.getList(),
            ]);
            setCollaborators(collaboratorResponse.data);
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
            const collaboratorResponse = await service.find(id);
            const collaboratorData = collaboratorResponse.data;
            navigation.navigate('CollaboratorAdminUpdate', { collaborator: collaboratorData });
        } catch (error) {
            console.error('Error fetching collaborator data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const collaboratorResponse = await service.find(id);
            const collaboratorData = collaboratorResponse.data;
            navigation.navigate('CollaboratorAdminDetails', { collaborator: collaboratorData });
        } catch (error) {
            console.error('Error fetching collaborator data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Collaborator List</Text>

        <View style={{ marginBottom: 100 }}>
            {collaborators && collaborators.length > 0 ? ( collaborators.map((collaborator) => (
                <CollaboratorAdminCard key={collaborator.id}
                    description = {collaborator.description}
                    rib = {collaborator.rib}
                    credentialsNonExpired = {collaborator.credentialsNonExpired}
                    enabled = {collaborator.enabled}
                    accountNonExpired = {collaborator.accountNonExpired}
                    accountNonLocked = {collaborator.accountNonLocked}
                    passwordChanged = {collaborator.passwordChanged}
                    username = {collaborator.username}
                    password = {collaborator.password}
                    onPressDelete={() => handleDeletePress(collaborator.id)}
                    onUpdate={() => handleFetchAndUpdate(collaborator.id)}
                    onDetails={() => handleFetchAndDetails(collaborator.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No collaborators found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Collaborator'} />

    </ScrollView>

);
};

export default CollaboratorAdminList;
