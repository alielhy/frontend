import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InscriptionCollaboratorTypeAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorTypeAdminService.service';
import  {InscriptionCollaboratorTypeDto}  from '../../../../../../controller/model/inscription/InscriptionCollaboratorType.model';
import InscriptionCollaboratorTypeAdminCard from "../card/inscription-collaborator-type-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InscriptionCollaboratorTypeAdminList: React.FC = () =>  {

    const [inscriptionCollaboratorTypes, setInscriptionCollaboratorTypes] = useState<InscriptionCollaboratorTypeDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InscriptionCollaboratorTypeResponse = AxiosResponse<InscriptionCollaboratorTypeDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [inscriptionCollaboratorTypeId, setInscriptionCollaboratorTypeId] = useState(0);

    const service = new InscriptionCollaboratorTypeAdminService();

    const handleDeletePress = (id: number) => {
        setInscriptionCollaboratorTypeId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(inscriptionCollaboratorTypeId);
            setInscriptionCollaboratorTypes((prevInscriptionCollaboratorTypes) => prevInscriptionCollaboratorTypes.filter((inscriptionCollaboratorType) => inscriptionCollaboratorType.id !== inscriptionCollaboratorTypeId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting inscription collaborator type:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [inscriptionCollaboratorTypeResponse] = await Promise.all<InscriptionCollaboratorTypeResponse>([
            service.getList(),
            ]);
            setInscriptionCollaboratorTypes(inscriptionCollaboratorTypeResponse.data);
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
            const inscriptionCollaboratorTypeResponse = await service.find(id);
            const inscriptionCollaboratorTypeData = inscriptionCollaboratorTypeResponse.data;
            navigation.navigate('InscriptionCollaboratorTypeAdminUpdate', { inscriptionCollaboratorType: inscriptionCollaboratorTypeData });
        } catch (error) {
            console.error('Error fetching inscription collaborator type data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const inscriptionCollaboratorTypeResponse = await service.find(id);
            const inscriptionCollaboratorTypeData = inscriptionCollaboratorTypeResponse.data;
            navigation.navigate('InscriptionCollaboratorTypeAdminDetails', { inscriptionCollaboratorType: inscriptionCollaboratorTypeData });
        } catch (error) {
            console.error('Error fetching inscription collaborator type data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Inscription collaborator type List</Text>

        <View style={{ marginBottom: 100 }}>
            {inscriptionCollaboratorTypes && inscriptionCollaboratorTypes.length > 0 ? ( inscriptionCollaboratorTypes.map((inscriptionCollaboratorType) => (
                <InscriptionCollaboratorTypeAdminCard key={inscriptionCollaboratorType.id}
                    code = {inscriptionCollaboratorType.code}
                    name = {inscriptionCollaboratorType.name}
                    onPressDelete={() => handleDeletePress(inscriptionCollaboratorType.id)}
                    onUpdate={() => handleFetchAndUpdate(inscriptionCollaboratorType.id)}
                    onDetails={() => handleFetchAndDetails(inscriptionCollaboratorType.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No inscription collaborator types found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'InscriptionCollaboratorType'} />

    </ScrollView>

);
};

export default InscriptionCollaboratorTypeAdminList;
