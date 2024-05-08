import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {InscriptionMembreAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreAdminService.service';
import  {InscriptionMembreDto}  from '../../../../../../controller/model/inscription/InscriptionMembre.model';

import {InscriptionMembreStateDto} from '../../../../../../controller/model/inscription/InscriptionMembreState.model';
import {InscriptionMembreStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreStateAdminService.service';
import {InscriptionCollaboratorDto} from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';
import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';
import {MemberDto} from '../../../../../../controller/model/collaborator/Member.model';
import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';

const InscriptionMembreAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isInscriptionMembreCollapsed, setIsInscriptionMembreCollapsed] = useState(true);


    const emptyInscriptionCollaborator = new InscriptionCollaboratorDto();
    const [inscriptionCollaborators, setInscriptionCollaborators] = useState<InscriptionCollaboratorDto[]>([]);
    const [inscriptionCollaboratorModalVisible, setInscriptionCollaboratorModalVisible] = useState(false);
    const [selectedInscriptionCollaborator, setSelectedInscriptionCollaborator] = useState<InscriptionCollaboratorDto>(emptyInscriptionCollaborator);

    const emptyMember = new MemberDto();
    const [members, setMembers] = useState<MemberDto[]>([]);
    const [memberModalVisible, setMemberModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberDto>(emptyMember);

    const emptyInscriptionMembreState = new InscriptionMembreStateDto();
    const [inscriptionMembreStates, setInscriptionMembreStates] = useState<InscriptionMembreStateDto[]>([]);
    const [inscriptionMembreStateModalVisible, setInscriptionMembreStateModalVisible] = useState(false);
    const [selectedInscriptionMembreState, setSelectedInscriptionMembreState] = useState<InscriptionMembreStateDto>(emptyInscriptionMembreState);


    const service = new InscriptionMembreAdminService();
    const inscriptionMembreStateAdminService = new InscriptionMembreStateAdminService();
    const inscriptionCollaboratorAdminService = new InscriptionCollaboratorAdminService();
    const memberAdminService = new MemberAdminService();


    const { control, handleSubmit, reset } = useForm<InscriptionMembreDto>({
        defaultValues: {
        member: undefined,
        inscriptionMembreState: undefined,
        inscriptionCollaborator: undefined,
        consumedEntity: null ,
        consumedProjet: null ,
        consumedAttribut: null ,
        consumedIndicator: null ,
        affectedEntity: null ,
        affectedProjet: null ,
        affectedAttribut: null ,
        affectedIndicator: null ,
        },
    });

    const inscriptionMembreCollapsible = () => {
        setIsInscriptionMembreCollapsed(!isInscriptionMembreCollapsed);
    };

    const handleCloseInscriptionCollaboratorModal = () => {
        setInscriptionCollaboratorModalVisible(false);
    };

    const onInscriptionCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionCollaborator(item);
        setInscriptionCollaboratorModalVisible(false);
    };
    const handleCloseMemberModal = () => {
        setMemberModalVisible(false);
    };

    const onMemberSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedMember(item);
        setMemberModalVisible(false);
    };
    const handleCloseInscriptionMembreStateModal = () => {
        setInscriptionMembreStateModalVisible(false);
    };

    const onInscriptionMembreStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionMembreState(item);
        setInscriptionMembreStateModalVisible(false);
    };


    useEffect(() => {
        memberAdminService.getList().then(({data}) => setMembers(data)).catch(error => console.log(error));
        inscriptionMembreStateAdminService.getList().then(({data}) => setInscriptionMembreStates(data)).catch(error => console.log(error));
        inscriptionCollaboratorAdminService.getList().then(({data}) => setInscriptionCollaborators(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: InscriptionMembreDto) => {
        item.member = selectedMember;
        item.inscriptionMembreState = selectedInscriptionMembreState;
        item.inscriptionCollaborator = selectedInscriptionCollaborator;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedMember(emptyMember);
            setSelectedInscriptionMembreState(emptyInscriptionMembreState);
            setSelectedInscriptionCollaborator(emptyInscriptionCollaborator);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving inscriptionMembre:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Inscription Membre</Text>

                            <CustomInput control={control} name={'inscriptionDate'} placeholder={'Inscription date'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setMemberModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedMember.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setInscriptionMembreStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionMembreState.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setInscriptionCollaboratorModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionCollaborator.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {inscriptionCollaborators !== null && inscriptionCollaborators.length > 0 ? ( <FilterModal visibility={inscriptionCollaboratorModalVisible} placeholder={"Select a InscriptionCollaborator"} onItemSelect={onInscriptionCollaboratorSelect} items={inscriptionCollaborators} onClose={handleCloseInscriptionCollaboratorModal} variable={'id'} /> ) : null}
        {members !== null && members.length > 0 ? ( <FilterModal visibility={memberModalVisible} placeholder={"Select a Member"} onItemSelect={onMemberSelect} items={members} onClose={handleCloseMemberModal} variable={'id'} /> ) : null}
        {inscriptionMembreStates !== null && inscriptionMembreStates.length > 0 ? ( <FilterModal visibility={inscriptionMembreStateModalVisible} placeholder={"Select a InscriptionMembreState"} onItemSelect={onInscriptionMembreStateSelect} items={inscriptionMembreStates} onClose={handleCloseInscriptionMembreStateModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default InscriptionMembreAdminCreate;

const styles = StyleSheet.create({
    safeAreaViewCreate: {
      flex: 1,
      backgroundColor: "#e6e8fa",
    },
    scrolllViewCreate: {
      margin: 20,
      marginBottom: 80,
    },
    textHeaderCreate: {
      color: '#000000',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
    touchableOpacityCreate: {
      backgroundColor: 'transparent',
      padding: 8,
      marginVertical: 20,
      alignSelf: 'center',
      
    },
    touchableOpacityButtonCreate: {
      color: '#000000',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    placeHolder: {
      backgroundColor: 'white',
      justifyContent: "center",
      borderRadius: 80,
      shadowColor: "black",
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.3,
      elevation: 10,
      marginVertical: 10,
      paddingHorizontal: 15,
      height: 50,
      width: "90%",
      alignSelf: "center"
    },
    placeHolderText: {
      color: 'grey',
      fontSize: 16,
    },
    placeholderInfo: {
        color: 'grey',
        fontSize: 13,
        alignSelf: "center"
      },
    itemCard: {
      backgroundColor: '#fff',
      padding: 10,
      width: "90%",
      borderRadius: 80,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: "black",
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.3,
      elevation: 10,
      alignSelf: "center",
      justifyContent: 'space-between',
      height: 50,
    },
    infos: {
      marginBottom: 5,
      fontSize: 16,
    },
  });