import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {PaimentInfluencerAdminService} from '../../../../../../controller/service/admin/paiment/PaimentInfluencerAdminService.service';
import  {PaimentInfluencerDto}  from '../../../../../../controller/model/paiment/PaimentInfluencer.model';
import PaimentInfluencerAdminCard from "../card/paiment-influencer-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const PaimentInfluencerAdminList: React.FC = () =>  {

    const [paimentInfluencers, setPaimentInfluencers] = useState<PaimentInfluencerDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PaimentInfluencerResponse = AxiosResponse<PaimentInfluencerDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [paimentInfluencerId, setPaimentInfluencerId] = useState(0);

    const service = new PaimentInfluencerAdminService();

    const handleDeletePress = (id: number) => {
        setPaimentInfluencerId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(paimentInfluencerId);
            setPaimentInfluencers((prevPaimentInfluencers) => prevPaimentInfluencers.filter((paimentInfluencer) => paimentInfluencer.id !== paimentInfluencerId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting paiment influencer:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [paimentInfluencerResponse] = await Promise.all<PaimentInfluencerResponse>([
            service.getList(),
            ]);
            setPaimentInfluencers(paimentInfluencerResponse.data);
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
            const paimentInfluencerResponse = await service.find(id);
            const paimentInfluencerData = paimentInfluencerResponse.data;
            navigation.navigate('PaimentInfluencerAdminUpdate', { paimentInfluencer: paimentInfluencerData });
        } catch (error) {
            console.error('Error fetching paiment influencer data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const paimentInfluencerResponse = await service.find(id);
            const paimentInfluencerData = paimentInfluencerResponse.data;
            navigation.navigate('PaimentInfluencerAdminDetails', { paimentInfluencer: paimentInfluencerData });
        } catch (error) {
            console.error('Error fetching paiment influencer data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Paiment influencer List</Text>

        <View style={{ marginBottom: 100 }}>
            {paimentInfluencers && paimentInfluencers.length > 0 ? ( paimentInfluencers.map((paimentInfluencer) => (
                <PaimentInfluencerAdminCard key={paimentInfluencer.id}
                    name = {paimentInfluencer.name}
                    description = {paimentInfluencer.description}
                    code = {paimentInfluencer.code}
                    influencerName = {paimentInfluencer.influencer.id}
                    couponName = {paimentInfluencer.coupon.name}
                    total = {paimentInfluencer.total}
                    nbrUtilisation = {paimentInfluencer.nbrUtilisation}
                    datePaiement = {paimentInfluencer.datePaiement}
                    paimentInfluencerStateName = {paimentInfluencer.paimentInfluencerState.code}
                    onPressDelete={() => handleDeletePress(paimentInfluencer.id)}
                    onUpdate={() => handleFetchAndUpdate(paimentInfluencer.id)}
                    onDetails={() => handleFetchAndDetails(paimentInfluencer.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No paiment influencers found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'PaimentInfluencer'} />

    </ScrollView>

);
};

export default PaimentInfluencerAdminList;
