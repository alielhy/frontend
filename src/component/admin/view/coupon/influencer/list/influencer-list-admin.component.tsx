import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import  {InfluencerDto}  from '../../../../../../controller/model/coupon/Influencer.model';
import InfluencerAdminCard from "../card/influencer-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InfluencerAdminList: React.FC = () =>  {

    const [influencers, setInfluencers] = useState<InfluencerDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InfluencerResponse = AxiosResponse<InfluencerDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [influencerId, setInfluencerId] = useState(0);

    const service = new InfluencerAdminService();

    const handleDeletePress = (id: number) => {
        setInfluencerId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(influencerId);
            setInfluencers((prevInfluencers) => prevInfluencers.filter((influencer) => influencer.id !== influencerId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting influencer:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [influencerResponse] = await Promise.all<InfluencerResponse>([
            service.getList(),
            ]);
            setInfluencers(influencerResponse.data);
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
            const influencerResponse = await service.find(id);
            const influencerData = influencerResponse.data;
            navigation.navigate('InfluencerAdminUpdate', { influencer: influencerData });
        } catch (error) {
            console.error('Error fetching influencer data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const influencerResponse = await service.find(id);
            const influencerData = influencerResponse.data;
            navigation.navigate('InfluencerAdminDetails', { influencer: influencerData });
        } catch (error) {
            console.error('Error fetching influencer data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Influencer List</Text>

        <View style={{ marginBottom: 100 }}>
            {influencers && influencers.length > 0 ? ( influencers.map((influencer) => (
                <InfluencerAdminCard key={influencer.id}
                    nickName = {influencer.nickName}
                    rib = {influencer.rib}
                    credentialsNonExpired = {influencer.credentialsNonExpired}
                    enabled = {influencer.enabled}
                    accountNonExpired = {influencer.accountNonExpired}
                    accountNonLocked = {influencer.accountNonLocked}
                    passwordChanged = {influencer.passwordChanged}
                    username = {influencer.username}
                    password = {influencer.password}
                    onPressDelete={() => handleDeletePress(influencer.id)}
                    onUpdate={() => handleFetchAndUpdate(influencer.id)}
                    onDetails={() => handleFetchAndDetails(influencer.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No influencers found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Influencer'} />

    </ScrollView>

);
};

export default InfluencerAdminList;
