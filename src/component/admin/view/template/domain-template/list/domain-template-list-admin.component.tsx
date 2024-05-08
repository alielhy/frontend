import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {DomainTemplateAdminService} from '../../../../../../controller/service/admin/template/DomainTemplateAdminService.service';
import  {DomainTemplateDto}  from '../../../../../../controller/model/template/DomainTemplate.model';
import DomainTemplateAdminCard from "../card/domain-template-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const DomainTemplateAdminList: React.FC = () =>  {

    const [domainTemplates, setDomainTemplates] = useState<DomainTemplateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type DomainTemplateResponse = AxiosResponse<DomainTemplateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [domainTemplateId, setDomainTemplateId] = useState(0);

    const service = new DomainTemplateAdminService();

    const handleDeletePress = (id: number) => {
        setDomainTemplateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(domainTemplateId);
            setDomainTemplates((prevDomainTemplates) => prevDomainTemplates.filter((domainTemplate) => domainTemplate.id !== domainTemplateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting domain template:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [domainTemplateResponse] = await Promise.all<DomainTemplateResponse>([
            service.getList(),
            ]);
            setDomainTemplates(domainTemplateResponse.data);
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
            const domainTemplateResponse = await service.find(id);
            const domainTemplateData = domainTemplateResponse.data;
            navigation.navigate('DomainTemplateAdminUpdate', { domainTemplate: domainTemplateData });
        } catch (error) {
            console.error('Error fetching domain template data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const domainTemplateResponse = await service.find(id);
            const domainTemplateData = domainTemplateResponse.data;
            navigation.navigate('DomainTemplateAdminDetails', { domainTemplate: domainTemplateData });
        } catch (error) {
            console.error('Error fetching domain template data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Domain template List</Text>

        <View style={{ marginBottom: 100 }}>
            {domainTemplates && domainTemplates.length > 0 ? ( domainTemplates.map((domainTemplate) => (
                <DomainTemplateAdminCard key={domainTemplate.id}
                    code = {domainTemplate.code}
                    name = {domainTemplate.name}
                    onPressDelete={() => handleDeletePress(domainTemplate.id)}
                    onUpdate={() => handleFetchAndUpdate(domainTemplate.id)}
                    onDetails={() => handleFetchAndDetails(domainTemplate.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No domain templates found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'DomainTemplate'} />

    </ScrollView>

);
};

export default DomainTemplateAdminList;
