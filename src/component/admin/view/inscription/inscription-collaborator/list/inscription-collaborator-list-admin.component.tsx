import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';
import  {InscriptionCollaboratorDto}  from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';
import InscriptionCollaboratorAdminCard from "../card/inscription-collaborator-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InscriptionCollaboratorAdminList: React.FC = () =>  {

    const [inscriptionCollaborators, setInscriptionCollaborators] = useState<InscriptionCollaboratorDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InscriptionCollaboratorResponse = AxiosResponse<InscriptionCollaboratorDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [inscriptionCollaboratorId, setInscriptionCollaboratorId] = useState(0);

    const service = new InscriptionCollaboratorAdminService();

    const handleDeletePress = (id: number) => {
        setInscriptionCollaboratorId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(inscriptionCollaboratorId);
            setInscriptionCollaborators((prevInscriptionCollaborators) => prevInscriptionCollaborators.filter((inscriptionCollaborator) => inscriptionCollaborator.id !== inscriptionCollaboratorId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting inscription collaborator:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [inscriptionCollaboratorResponse] = await Promise.all<InscriptionCollaboratorResponse>([
            service.getList(),
            ]);
            setInscriptionCollaborators(inscriptionCollaboratorResponse.data);
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
            const inscriptionCollaboratorResponse = await service.find(id);
            const inscriptionCollaboratorData = inscriptionCollaboratorResponse.data;
            navigation.navigate('InscriptionCollaboratorAdminUpdate', { inscriptionCollaborator: inscriptionCollaboratorData });
        } catch (error) {
            console.error('Error fetching inscription collaborator data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const inscriptionCollaboratorResponse = await service.find(id);
            const inscriptionCollaboratorData = inscriptionCollaboratorResponse.data;
            navigation.navigate('InscriptionCollaboratorAdminDetails', { inscriptionCollaborator: inscriptionCollaboratorData });
        } catch (error) {
            console.error('Error fetching inscription collaborator data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Inscription Collaborator List</Text>

        <View style={{ marginBottom: 100 }}>
            {inscriptionCollaborators && inscriptionCollaborators.length > 0 ? ( inscriptionCollaborators.map((inscriptionCollaborator) => (
                <InscriptionCollaboratorAdminCard key={inscriptionCollaborator.id}
                    startDate = {inscriptionCollaborator.startDate}
                    endDate = {inscriptionCollaborator.endDate}
                    renewDate = {inscriptionCollaborator.renewDate}
                    packagingName = {inscriptionCollaborator.packaging.id}
                    consumedEntity = {inscriptionCollaborator.consumedEntity}
                    consumedProjet = {inscriptionCollaborator.consumedProjet}
                    consumedAttribut = {inscriptionCollaborator.consumedAttribut}
                    consumedIndicator = {inscriptionCollaborator.consumedIndicator}
                    collaboratorName = {inscriptionCollaborator.collaborator.description}
                    inscriptionCollaboratorStateName = {inscriptionCollaborator.inscriptionCollaboratorState.name}
                    inscriptionCollaboratorTypeName = {inscriptionCollaborator.inscriptionCollaboratorType.name}
                    onPressDelete={() => handleDeletePress(inscriptionCollaborator.id)}
                    onUpdate={() => handleFetchAndUpdate(inscriptionCollaborator.id)}
                    onDetails={() => handleFetchAndDetails(inscriptionCollaborator.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No inscription collaborators found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'InscriptionCollaborator'} />

    </ScrollView>

);
};

export default InscriptionCollaboratorAdminList;
