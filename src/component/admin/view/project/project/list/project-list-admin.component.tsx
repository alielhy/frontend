import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {ProjectAdminService} from '../../../../../../controller/service/admin/project/ProjectAdminService.service';
import  {ProjectDto}  from '../../../../../../controller/model/project/Project.model';
import ProjectAdminCard from "../card/project-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const ProjectAdminList: React.FC = () =>  {

    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ProjectResponse = AxiosResponse<ProjectDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [projectId, setProjectId] = useState(0);

    const service = new ProjectAdminService();

    const handleDeletePress = (id: number) => {
        setProjectId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(projectId);
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting project:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [projectResponse] = await Promise.all<ProjectResponse>([
            service.getList(),
            ]);
            setProjects(projectResponse.data);
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
            const projectResponse = await service.find(id);
            const projectData = projectResponse.data;
            navigation.navigate('ProjectAdminUpdate', { project: projectData });
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const projectResponse = await service.find(id);
            const projectData = projectResponse.data;
            navigation.navigate('ProjectAdminDetails', { project: projectData });
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Project List</Text>

        <View style={{ marginBottom: 100 }}>
            {projects && projects.length > 0 ? ( projects.map((project) => (
                <ProjectAdminCard key={project.id}
                    code = {project.code}
                    name = {project.name}
                    generatedDate = {project.generatedDate}
                    yaml = {project.yaml}
                    projectStateName = {project.projectState.code}
                    inscriptionMembreName = {project.inscriptionMembre.id}
                    projectTemplateName = {project.projectTemplate.name}
                    domainTemplateName = {project.domainTemplate.name}
                    onPressDelete={() => handleDeletePress(project.id)}
                    onUpdate={() => handleFetchAndUpdate(project.id)}
                    onDetails={() => handleFetchAndDetails(project.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No projects found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'Project'} />

    </ScrollView>

);
};

export default ProjectAdminList;
