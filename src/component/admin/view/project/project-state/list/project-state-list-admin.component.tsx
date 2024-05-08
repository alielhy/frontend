import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {ProjectStateAdminService} from '../../../../../../controller/service/admin/project/ProjectStateAdminService.service';
import  {ProjectStateDto}  from '../../../../../../controller/model/project/ProjectState.model';
import ProjectStateAdminCard from "../card/project-state-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const ProjectStateAdminList: React.FC = () =>  {

    const [projectStates, setProjectStates] = useState<ProjectStateDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type ProjectStateResponse = AxiosResponse<ProjectStateDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [projectStateId, setProjectStateId] = useState(0);

    const service = new ProjectStateAdminService();

    const handleDeletePress = (id: number) => {
        setProjectStateId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(projectStateId);
            setProjectStates((prevProjectStates) => prevProjectStates.filter((projectState) => projectState.id !== projectStateId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting project state:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [projectStateResponse] = await Promise.all<ProjectStateResponse>([
            service.getList(),
            ]);
            setProjectStates(projectStateResponse.data);
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
            const projectStateResponse = await service.find(id);
            const projectStateData = projectStateResponse.data;
            navigation.navigate('ProjectStateAdminUpdate', { projectState: projectStateData });
        } catch (error) {
            console.error('Error fetching project state data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const projectStateResponse = await service.find(id);
            const projectStateData = projectStateResponse.data;
            navigation.navigate('ProjectStateAdminDetails', { projectState: projectStateData });
        } catch (error) {
            console.error('Error fetching project state data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Project state List</Text>

        <View style={{ marginBottom: 100 }}>
            {projectStates && projectStates.length > 0 ? ( projectStates.map((projectState) => (
                <ProjectStateAdminCard key={projectState.id}
                    code = {projectState.code}
                    libelle = {projectState.libelle}
                    onPressDelete={() => handleDeletePress(projectState.id)}
                    onUpdate={() => handleFetchAndUpdate(projectState.id)}
                    onDetails={() => handleFetchAndDetails(projectState.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No project states found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'ProjectState'} />

    </ScrollView>

);
};

export default ProjectStateAdminList;
