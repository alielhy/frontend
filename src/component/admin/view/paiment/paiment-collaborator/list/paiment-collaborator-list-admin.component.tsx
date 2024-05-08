import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {PaimentCollaboratorAdminService} from '../../../../../../controller/service/admin/paiment/PaimentCollaboratorAdminService.service';
import  {PaimentCollaboratorDto}  from '../../../../../../controller/model/paiment/PaimentCollaborator.model';
import PaimentCollaboratorAdminCard from "../card/paiment-collaborator-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const PaimentCollaboratorAdminList: React.FC = () =>  {

    const [paimentCollaborators, setPaimentCollaborators] = useState<PaimentCollaboratorDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PaimentCollaboratorResponse = AxiosResponse<PaimentCollaboratorDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [paimentCollaboratorId, setPaimentCollaboratorId] = useState(0);

    const service = new PaimentCollaboratorAdminService();

    const handleDeletePress = (id: number) => {
        setPaimentCollaboratorId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(paimentCollaboratorId);
            setPaimentCollaborators((prevPaimentCollaborators) => prevPaimentCollaborators.filter((paimentCollaborator) => paimentCollaborator.id !== paimentCollaboratorId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting paiment collaborator:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [paimentCollaboratorResponse] = await Promise.all<PaimentCollaboratorResponse>([
            service.getList(),
            ]);
            setPaimentCollaborators(paimentCollaboratorResponse.data);
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
            const paimentCollaboratorResponse = await service.find(id);
            const paimentCollaboratorData = paimentCollaboratorResponse.data;
            navigation.navigate('PaimentCollaboratorAdminUpdate', { paimentCollaborator: paimentCollaboratorData });
        } catch (error) {
            console.error('Error fetching paiment collaborator data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const paimentCollaboratorResponse = await service.find(id);
            const paimentCollaboratorData = paimentCollaboratorResponse.data;
            navigation.navigate('PaimentCollaboratorAdminDetails', { paimentCollaborator: paimentCollaboratorData });
        } catch (error) {
            console.error('Error fetching paiment collaborator data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Paiment collaborator List</Text>

        <View style={{ marginBottom: 100 }}>
            {paimentCollaborators && paimentCollaborators.length > 0 ? ( paimentCollaborators.map((paimentCollaborator) => (
                <PaimentCollaboratorAdminCard key={paimentCollaborator.id}
                    name = {paimentCollaborator.name}
                    description = {paimentCollaborator.description}
                    code = {paimentCollaborator.code}
                    couponDetailName = {paimentCollaborator.couponDetail.id}
                    amountToPaid = {paimentCollaborator.amountToPaid}
                    total = {paimentCollaborator.total}
                    discount = {paimentCollaborator.discount}
                    remaining = {paimentCollaborator.remaining}
                    paiementDate = {paimentCollaborator.paiementDate}
                    inscriptionCollaboratorName = {paimentCollaborator.inscriptionCollaborator.id}
                    paimentCollaboratorStateName = {paimentCollaborator.paimentCollaboratorState.code}
                    onPressDelete={() => handleDeletePress(paimentCollaborator.id)}
                    onUpdate={() => handleFetchAndUpdate(paimentCollaborator.id)}
                    onDetails={() => handleFetchAndDetails(paimentCollaborator.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No paiment collaborators found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'PaimentCollaborator'} />

    </ScrollView>

);
};

export default PaimentCollaboratorAdminList;
