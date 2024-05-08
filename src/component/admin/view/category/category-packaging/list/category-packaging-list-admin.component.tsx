import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {CategoryPackagingAdminService} from '../../../../../../controller/service/admin/category/CategoryPackagingAdminService.service';
import  {CategoryPackagingDto}  from '../../../../../../controller/model/category/CategoryPackaging.model';
import CategoryPackagingAdminCard from "../card/category-packaging-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const CategoryPackagingAdminList: React.FC = () =>  {

    const [categoryPackagings, setCategoryPackagings] = useState<CategoryPackagingDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type CategoryPackagingResponse = AxiosResponse<CategoryPackagingDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [categoryPackagingId, setCategoryPackagingId] = useState(0);

    const service = new CategoryPackagingAdminService();

    const handleDeletePress = (id: number) => {
        setCategoryPackagingId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(categoryPackagingId);
            setCategoryPackagings((prevCategoryPackagings) => prevCategoryPackagings.filter((categoryPackaging) => categoryPackaging.id !== categoryPackagingId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting category packaging:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [categoryPackagingResponse] = await Promise.all<CategoryPackagingResponse>([
            service.getList(),
            ]);
            setCategoryPackagings(categoryPackagingResponse.data);
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
            const categoryPackagingResponse = await service.find(id);
            const categoryPackagingData = categoryPackagingResponse.data;
            navigation.navigate('CategoryPackagingAdminUpdate', { categoryPackaging: categoryPackagingData });
        } catch (error) {
            console.error('Error fetching category packaging data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const categoryPackagingResponse = await service.find(id);
            const categoryPackagingData = categoryPackagingResponse.data;
            navigation.navigate('CategoryPackagingAdminDetails', { categoryPackaging: categoryPackagingData });
        } catch (error) {
            console.error('Error fetching category packaging data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Category packaging List</Text>

        <View style={{ marginBottom: 100 }}>
            {categoryPackagings && categoryPackagings.length > 0 ? ( categoryPackagings.map((categoryPackaging) => (
                <CategoryPackagingAdminCard key={categoryPackaging.id}
                    code = {categoryPackaging.code}
                    name = {categoryPackaging.name}
                    onPressDelete={() => handleDeletePress(categoryPackaging.id)}
                    onUpdate={() => handleFetchAndUpdate(categoryPackaging.id)}
                    onDetails={() => handleFetchAndDetails(categoryPackaging.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No category packagings found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'CategoryPackaging'} />

    </ScrollView>

);
};

export default CategoryPackagingAdminList;
