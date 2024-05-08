import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {PaimentInfluencerStateAdminService} from '../../../../../../controller/service/admin/project/PaimentInfluencerStateAdminService.service';
import  {PaimentInfluencerStateDto}  from '../../../../../../controller/model/project/PaimentInfluencerState.model';
import PaimentInfluencerStateAdminCard from "../card/paiment-influencer-state-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const PaimentInfluencerStateAdminList: React.FC = () =>  {

    const [paimentInfluencerStates, setPaimentInfluencerStates] = useState<PaimentInfluencerStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PaimentInfluencerStateResponse = AxiosResponse<PaimentInfluencerStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [paimentInfluencerStateId, setPaimentInfluencerStateId] = useState(0);

    const service = new PaimentInfluencerStateAdminService();

    const handleDeletePress = (id: number) => {
        setPaimentInfluencerStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(paimentInfluencerStateId);
            setPaimentInfluencerStates((prevPaimentInfluencerStates) => prevPaimentInfluencerStates.filter((paimentInfluencerState) => paimentInfluencerState.id !== paimentInfluencerStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting paiment influencer state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [paimentInfluencerStateResponse] = await Promise.all<PaimentInfluencerStateResponse>([
            service.getList(),
            ]);
            setPaimentInfluencerStates(paimentInfluencerStateResponse.data);
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
            const paimentInfluencerStateResponse = await service.find(id);
            const paimentInfluencerStateData = paimentInfluencerStateResponse.data;
            navigation.navigate('PaimentInfluencerStateAdminUpdate', { paimentInfluencerState: paimentInfluencerStateData });
        } catch (error) {
            console.error('Error fetching paiment influencer state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const paimentInfluencerStateResponse = await service.find(id);
            const paimentInfluencerStateData = paimentInfluencerStateResponse.data;
            navigation.navigate('PaimentInfluencerStateAdminDetails', { paimentInfluencerState: paimentInfluencerStateData });
        } catch (error) {
            console.error('Error fetching paiment influencer state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Paiment influencer state List</Text>

        <View style={{ marginBottom: 100 }}>
            {paimentInfluencerStates && paimentInfluencerStates.length > 0 ? ( paimentInfluencerStates.map((paimentInfluencerState) => (
                <PaimentInfluencerStateAdminCard key={paimentInfluencerState.id}
                    code = {paimentInfluencerState.code}
                    libelle = {paimentInfluencerState.libelle}
                    onPressDelete={() => handleDeletePress(paimentInfluencerState.id)}
                    onUpdate={() => handleFetchAndUpdate(paimentInfluencerState.id)}
                    onDetails={() => handleFetchAndDetails(paimentInfluencerState.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No paiment influencer states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'PaimentInfluencerState'} />

    </ScrollView>

);
};

export default PaimentInfluencerStateAdminList;
