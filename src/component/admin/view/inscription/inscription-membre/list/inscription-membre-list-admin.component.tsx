import {ScrollView, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import {AxiosResponse} from 'axios';

import {InscriptionMembreAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreAdminService.service';
import  {InscriptionMembreDto}  from '../../../../../../controller/model/inscription/InscriptionMembre.model';
import InscriptionMembreAdminCard from "../card/inscription-membre-card-admin.component";

import {globalStyle} from "../../../../../../shared/globalStyle";

const InscriptionMembreAdminList: React.FC = () =>  {

    const [inscriptionMembres, setInscriptionMembres] = useState<InscriptionMembreDto[]>([]);
    const navigation = useNavigation<NavigationProp<any>>();
    type InscriptionMembreResponse = AxiosResponse<InscriptionMembreDto[]>;
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [inscriptionMembreId, setInscriptionMembreId] = useState(0);

    const service = new InscriptionMembreAdminService();

    const handleDeletePress = (id: number) => {
        setInscriptionMembreId(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await service.delete(inscriptionMembreId);
            setInscriptionMembres((prevInscriptionMembres) => prevInscriptionMembres.filter((inscriptionMembre) => inscriptionMembre.id !== inscriptionMembreId));
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting inscription membre:', error);
            setIsDeleteModalVisible(false);
        }
    };

    const fetchData = async () => {
        try {
            const [inscriptionMembreResponse] = await Promise.all<InscriptionMembreResponse>([
            service.getList(),
            ]);
            setInscriptionMembres(inscriptionMembreResponse.data);
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
            const inscriptionMembreResponse = await service.find(id);
            const inscriptionMembreData = inscriptionMembreResponse.data;
            navigation.navigate('InscriptionMembreAdminUpdate', { inscriptionMembre: inscriptionMembreData });
        } catch (error) {
            console.error('Error fetching inscription membre data:', error);
        }
    };

    const handleFetchAndDetails = async (id: number) => {
        try {
            const inscriptionMembreResponse = await service.find(id);
            const inscriptionMembreData = inscriptionMembreResponse.data;
            navigation.navigate('InscriptionMembreAdminDetails', { inscriptionMembre: inscriptionMembreData });
        } catch (error) {
            console.error('Error fetching inscription membre data:', error);
        }
    };

return(
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyle.scrollViewList}>

        <Text style={globalStyle.textHeaderList} >Inscription membre List</Text>

        <View style={{ marginBottom: 100 }}>
            {inscriptionMembres && inscriptionMembres.length > 0 ? ( inscriptionMembres.map((inscriptionMembre) => (
                <InscriptionMembreAdminCard key={inscriptionMembre.id}
                    inscriptionDate = {inscriptionMembre.inscriptionDate}
                    memberName = {inscriptionMembre.member.id}
                    inscriptionMembreStateName = {inscriptionMembre.inscriptionMembreState.name}
                    inscriptionCollaboratorName = {inscriptionMembre.inscriptionCollaborator.id}
                    consumedEntity = {inscriptionMembre.consumedEntity}
                    consumedProjet = {inscriptionMembre.consumedProjet}
                    consumedAttribut = {inscriptionMembre.consumedAttribut}
                    consumedIndicator = {inscriptionMembre.consumedIndicator}
                    affectedEntity = {inscriptionMembre.affectedEntity}
                    affectedProjet = {inscriptionMembre.affectedProjet}
                    affectedAttribut = {inscriptionMembre.affectedAttribut}
                    affectedIndicator = {inscriptionMembre.affectedIndicator}
                    onPressDelete={() => handleDeletePress(inscriptionMembre.id)}
                    onUpdate={() => handleFetchAndUpdate(inscriptionMembre.id)}
                    onDetails={() => handleFetchAndDetails(inscriptionMembre.id)}
                />
                )) ) : (
                <Text style={globalStyle.textNotFound}>No inscription membres found.</Text>
            )}
        </View>

        <ConfirmDeleteModal isVisible={isDeleteModalVisible} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} name={'InscriptionMembre'} />

    </ScrollView>

);
};

export default InscriptionMembreAdminList;
