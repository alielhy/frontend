import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';
import  {PackagingDto}  from '../../../../../../controller/model/packaging/Packaging.model';
import PackagingAdminCard from "../card/packaging-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const PackagingAdminList: React.FC = () =>  {

    const [packagings, setPackagings] = useState<PackagingDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type PackagingResponse = AxiosResponse<PackagingDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [packagingId, setPackagingId] = useState(0);

    const service = new PackagingAdminService();

    const handleDeletePress = (id: number) => {
        setPackagingId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(packagingId);
            setPackagings((prevPackagings) => prevPackagings.filter((packaging) => packaging.id !== packagingId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting packaging:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [packagingResponse] = await Promise.all<PackagingResponse>([
            service.getList(),
            ]);
            setPackagings(packagingResponse.data);
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
            const packagingResponse = await service.find(id);
            const packagingData = packagingResponse.data;
            navigation.navigate('PackagingAdminUpdate', { packaging: packagingData });
        } catch (error) {
            console.error('Error fetching packaging data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const packagingResponse = await service.find(id);
            const packagingData = packagingResponse.data;
            navigation.navigate('PackagingAdminDetails', { packaging: packagingData });
        } catch (error) {
            console.error('Error fetching packaging data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Packaging List</Text>

        <View style={{ marginBottom: 100 }}>
            {packagings && packagings.length > 0 ? ( packagings.map((packaging) => (
                <PackagingAdminCard key={packaging.id}
                    name = {packaging.name}
                    code = {packaging.code}
                    description = {packaging.description}
                    dateStart = {packaging.dateStart}
                    dateEnd = {packaging.dateEnd}
                    price = {packaging.price}
                    maxEntity = {packaging.maxEntity}
                    maxProjet = {packaging.maxProjet}
                    maxAttribut = {packaging.maxAttribut}
                    maxIndicator = {packaging.maxIndicator}
                    categoryPackagingName = {packaging.categoryPackaging.name}
                    onPressDelete={() => handleDeletePress(packaging.id)}
                    onUpdate={() => handleFetchAndUpdate(packaging.id)}
                    onDetails={() => handleFetchAndDetails(packaging.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No packagings found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Packaging'} />

    </ScrollView>

);
};

export default PackagingAdminList;
