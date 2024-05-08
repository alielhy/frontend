import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {CategoryProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/CategoryProjectTemplateAdminService.service';
import  {CategoryProjectTemplateDto}  from '../../../../../../controller/model/template/CategoryProjectTemplate.model';
import CategoryProjectTemplateAdminCard from "../card/category-project-template-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const CategoryProjectTemplateAdminList: React.FC = () =>  {

    const [categoryProjectTemplates, setCategoryProjectTemplates] = useState<CategoryProjectTemplateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type CategoryProjectTemplateResponse = AxiosResponse<CategoryProjectTemplateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [categoryProjectTemplateId, setCategoryProjectTemplateId] = useState(0);

    const service = new CategoryProjectTemplateAdminService();

    const handleDeletePress = (id: number) => {
        setCategoryProjectTemplateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(categoryProjectTemplateId);
            setCategoryProjectTemplates((prevCategoryProjectTemplates) => prevCategoryProjectTemplates.filter((categoryProjectTemplate) => categoryProjectTemplate.id !== categoryProjectTemplateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting category project template:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [categoryProjectTemplateResponse] = await Promise.all<CategoryProjectTemplateResponse>([
            service.getList(),
            ]);
            setCategoryProjectTemplates(categoryProjectTemplateResponse.data);
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
            const categoryProjectTemplateResponse = await service.find(id);
            const categoryProjectTemplateData = categoryProjectTemplateResponse.data;
            navigation.navigate('CategoryProjectTemplateAdminUpdate', { categoryProjectTemplate: categoryProjectTemplateData });
        } catch (error) {
            console.error('Error fetching category project template data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const categoryProjectTemplateResponse = await service.find(id);
            const categoryProjectTemplateData = categoryProjectTemplateResponse.data;
            navigation.navigate('CategoryProjectTemplateAdminDetails', { categoryProjectTemplate: categoryProjectTemplateData });
        } catch (error) {
            console.error('Error fetching category project template data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Category project template List</Text>

        <View style={{ marginBottom: 100 }}>
            {categoryProjectTemplates && categoryProjectTemplates.length > 0 ? ( categoryProjectTemplates.map((categoryProjectTemplate) => (
                <CategoryProjectTemplateAdminCard key={categoryProjectTemplate.id}
                    code = {categoryProjectTemplate.code}
                    name = {categoryProjectTemplate.name}
                    onPressDelete={() => handleDeletePress(categoryProjectTemplate.id)}
                    onUpdate={() => handleFetchAndUpdate(categoryProjectTemplate.id)}
                    onDetails={() => handleFetchAndDetails(categoryProjectTemplate.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No category project templates found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'CategoryProjectTemplate'} />

    </ScrollView>

);
};

export default CategoryProjectTemplateAdminList;
