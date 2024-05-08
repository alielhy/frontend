import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InscriptionCollaboratorStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorStateAdminService.service';
import  {InscriptionCollaboratorStateDto}  from '../../../../../../controller/model/inscription/InscriptionCollaboratorState.model';
import InscriptionCollaboratorStateAdminCard from "../card/inscription-collaborator-state-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InscriptionCollaboratorStateAdminList: React.FC = () =>  {

    const [inscriptionCollaboratorStates, setInscriptionCollaboratorStates] = useState<InscriptionCollaboratorStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InscriptionCollaboratorStateResponse = AxiosResponse<InscriptionCollaboratorStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [inscriptionCollaboratorStateId, setInscriptionCollaboratorStateId] = useState(0);

    const service = new InscriptionCollaboratorStateAdminService();

    const handleDeletePress = (id: number) => {
        setInscriptionCollaboratorStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(inscriptionCollaboratorStateId);
            setInscriptionCollaboratorStates((prevInscriptionCollaboratorStates) => prevInscriptionCollaboratorStates.filter((inscriptionCollaboratorState) => inscriptionCollaboratorState.id !== inscriptionCollaboratorStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting inscription collaborator state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [inscriptionCollaboratorStateResponse] = await Promise.all<InscriptionCollaboratorStateResponse>([
            service.getList(),
            ]);
            setInscriptionCollaboratorStates(inscriptionCollaboratorStateResponse.data);
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
            const inscriptionCollaboratorStateResponse = await service.find(id);
            const inscriptionCollaboratorStateData = inscriptionCollaboratorStateResponse.data;
            navigation.navigate('InscriptionCollaboratorStateAdminUpdate', { inscriptionCollaboratorState: inscriptionCollaboratorStateData });
        } catch (error) {
            console.error('Error fetching inscription collaborator state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const inscriptionCollaboratorStateResponse = await service.find(id);
            const inscriptionCollaboratorStateData = inscriptionCollaboratorStateResponse.data;
            navigation.navigate('InscriptionCollaboratorStateAdminDetails', { inscriptionCollaboratorState: inscriptionCollaboratorStateData });
        } catch (error) {
            console.error('Error fetching inscription collaborator state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Inscription collaborator state List</Text>

        <View style={{ marginBottom: 100 }}>
            {inscriptionCollaboratorStates && inscriptionCollaboratorStates.length > 0 ? ( inscriptionCollaboratorStates.map((inscriptionCollaboratorState) => (
                <InscriptionCollaboratorStateAdminCard key={inscriptionCollaboratorState.id}
                    code = {inscriptionCollaboratorState.code}
                    name = {inscriptionCollaboratorState.name}
                    onPressDelete={() => handleDeletePress(inscriptionCollaboratorState.id)}
                    onUpdate={() => handleFetchAndUpdate(inscriptionCollaboratorState.id)}
                    onDetails={() => handleFetchAndDetails(inscriptionCollaboratorState.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No inscription collaborator states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'InscriptionCollaboratorState'} />

    </ScrollView>

);
};

export default InscriptionCollaboratorStateAdminList;
