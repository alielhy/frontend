import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {ProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/ProjectTemplateAdminService.service';
import  {ProjectTemplateDto}  from '../../../../../../controller/model/template/ProjectTemplate.model';
import ProjectTemplateAdminCard from "../card/project-template-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const ProjectTemplateAdminList: React.FC = () =>  {

    const [projectTemplates, setProjectTemplates] = useState<ProjectTemplateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ProjectTemplateResponse = AxiosResponse<ProjectTemplateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [projectTemplateId, setProjectTemplateId] = useState(0);

    const service = new ProjectTemplateAdminService();

    const handleDeletePress = (id: number) => {
        setProjectTemplateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(projectTemplateId);
            setProjectTemplates((prevProjectTemplates) => prevProjectTemplates.filter((projectTemplate) => projectTemplate.id !== projectTemplateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting project template:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [projectTemplateResponse] = await Promise.all<ProjectTemplateResponse>([
            service.getList(),
            ]);
            setProjectTemplates(projectTemplateResponse.data);
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
            const projectTemplateResponse = await service.find(id);
            const projectTemplateData = projectTemplateResponse.data;
            navigation.navigate('ProjectTemplateAdminUpdate', { projectTemplate: projectTemplateData });
        } catch (error) {
            console.error('Error fetching project template data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const projectTemplateResponse = await service.find(id);
            const projectTemplateData = projectTemplateResponse.data;
            navigation.navigate('ProjectTemplateAdminDetails', { projectTemplate: projectTemplateData });
        } catch (error) {
            console.error('Error fetching project template data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Project template List</Text>

        <View style={{ marginBottom: 100 }}>
            {projectTemplates && projectTemplates.length > 0 ? ( projectTemplates.map((projectTemplate) => (
                <ProjectTemplateAdminCard key={projectTemplate.id}
                    code = {projectTemplate.code}
                    name = {projectTemplate.name}
                    yaml = {projectTemplate.yaml}
                    addingDate = {projectTemplate.addingDate}
                    lastUpdateDate = {projectTemplate.lastUpdateDate}
                    categoryProjectTemplateName = {projectTemplate.categoryProjectTemplate.name}
                    projectTemplateTags = {projectTemplate.projectTemplateTags}
                    domainTemplateName = {projectTemplate.domainTemplate.name}
                    price = {projectTemplate.price}
                    memberName = {projectTemplate.member.id}
                    onPressDelete={() => handleDeletePress(projectTemplate.id)}
                    onUpdate={() => handleFetchAndUpdate(projectTemplate.id)}
                    onDetails={() => handleFetchAndDetails(projectTemplate.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No project templates found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'ProjectTemplate'} />

    </ScrollView>

);
};

export default ProjectTemplateAdminList;
