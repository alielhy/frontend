import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InscriptionMembreStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreStateAdminService.service';
import  {InscriptionMembreStateDto}  from '../../../../../../controller/model/inscription/InscriptionMembreState.model';
import InscriptionMembreStateAdminCard from "../card/inscription-membre-state-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InscriptionMembreStateAdminList: React.FC = () =>  {

    const [inscriptionMembreStates, setInscriptionMembreStates] = useState<InscriptionMembreStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InscriptionMembreStateResponse = AxiosResponse<InscriptionMembreStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [inscriptionMembreStateId, setInscriptionMembreStateId] = useState(0);

    const service = new InscriptionMembreStateAdminService();

    const handleDeletePress = (id: number) => {
        setInscriptionMembreStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(inscriptionMembreStateId);
            setInscriptionMembreStates((prevInscriptionMembreStates) => prevInscriptionMembreStates.filter((inscriptionMembreState) => inscriptionMembreState.id !== inscriptionMembreStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting inscription membre state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [inscriptionMembreStateResponse] = await Promise.all<InscriptionMembreStateResponse>([
            service.getList(),
            ]);
            setInscriptionMembreStates(inscriptionMembreStateResponse.data);
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
            const inscriptionMembreStateResponse = await service.find(id);
            const inscriptionMembreStateData = inscriptionMembreStateResponse.data;
            navigation.navigate('InscriptionMembreStateAdminUpdate', { inscriptionMembreState: inscriptionMembreStateData });
        } catch (error) {
            console.error('Error fetching inscription membre state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const inscriptionMembreStateResponse = await service.find(id);
            const inscriptionMembreStateData = inscriptionMembreStateResponse.data;
            navigation.navigate('InscriptionMembreStateAdminDetails', { inscriptionMembreState: inscriptionMembreStateData });
        } catch (error) {
            console.error('Error fetching inscription membre state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Inscription membre state List</Text>

        <View style={{ marginBottom: 100 }}>
            {inscriptionMembreStates && inscriptionMembreStates.length > 0 ? ( inscriptionMembreStates.map((inscriptionMembreState) => (
                <InscriptionMembreStateAdminCard key={inscriptionMembreState.id}
                    code = {inscriptionMembreState.code}
                    name = {inscriptionMembreState.name}
                    onPressDelete={() => handleDeletePress(inscriptionMembreState.id)}
                    onUpdate={() => handleFetchAndUpdate(inscriptionMembreState.id)}
                    onDetails={() => handleFetchAndDetails(inscriptionMembreState.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No inscription membre states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'InscriptionMembreState'} />

    </ScrollView>

);
};

export default InscriptionMembreStateAdminList;
