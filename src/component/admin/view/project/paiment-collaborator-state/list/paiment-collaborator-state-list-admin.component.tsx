import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {PaimentCollaboratorStateAdminService} from '../../../../../../controller/service/admin/project/PaimentCollaboratorStateAdminService.service';
import  {PaimentCollaboratorStateDto}  from '../../../../../../controller/model/project/PaimentCollaboratorState.model';
import PaimentCollaboratorStateAdminCard from "../card/paiment-collaborator-state-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const PaimentCollaboratorStateAdminList: React.FC = () =>  {

    const [paimentCollaboratorStates, setPaimentCollaboratorStates] = useState<PaimentCollaboratorStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PaimentCollaboratorStateResponse = AxiosResponse<PaimentCollaboratorStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [paimentCollaboratorStateId, setPaimentCollaboratorStateId] = useState(0);

    const service = new PaimentCollaboratorStateAdminService();

    const handleDeletePress = (id: number) => {
        setPaimentCollaboratorStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(paimentCollaboratorStateId);
            setPaimentCollaboratorStates((prevPaimentCollaboratorStates) => prevPaimentCollaboratorStates.filter((paimentCollaboratorState) => paimentCollaboratorState.id !== paimentCollaboratorStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting paiment collaborator state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [paimentCollaboratorStateResponse] = await Promise.all<PaimentCollaboratorStateResponse>([
            service.getList(),
            ]);
            setPaimentCollaboratorStates(paimentCollaboratorStateResponse.data);
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
            const paimentCollaboratorStateResponse = await service.find(id);
            const paimentCollaboratorStateData = paimentCollaboratorStateResponse.data;
            navigation.navigate('PaimentCollaboratorStateAdminUpdate', { paimentCollaboratorState: paimentCollaboratorStateData });
        } catch (error) {
            console.error('Error fetching paiment collaborator state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const paimentCollaboratorStateResponse = await service.find(id);
            const paimentCollaboratorStateData = paimentCollaboratorStateResponse.data;
            navigation.navigate('PaimentCollaboratorStateAdminDetails', { paimentCollaboratorState: paimentCollaboratorStateData });
        } catch (error) {
            console.error('Error fetching paiment collaborator state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Paiment collaborator state List</Text>

        <View style={{ marginBottom: 100 }}>
            {paimentCollaboratorStates && paimentCollaboratorStates.length > 0 ? ( paimentCollaboratorStates.map((paimentCollaboratorState) => (
                <PaimentCollaboratorStateAdminCard key={paimentCollaboratorState.id}
                    code = {paimentCollaboratorState.code}
                    libelle = {paimentCollaboratorState.libelle}
                    onPressDelete={() => handleDeletePress(paimentCollaboratorState.id)}
                    onUpdate={() => handleFetchAndUpdate(paimentCollaboratorState.id)}
                    onDetails={() => handleFetchAndDetails(paimentCollaboratorState.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No paiment collaborator states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'PaimentCollaboratorState'} />

    </ScrollView>

);
};

export default PaimentCollaboratorStateAdminList;
