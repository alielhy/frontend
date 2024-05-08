import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from "react-native-vector-icons/Ionicons";

import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';
import  {MemberDto}  from '../../../../../../controller/model/collaborator/Member.model';

import {CollaboratorDto} from '../../../../../../controller/model/collaborator/Collaborator.model';
import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';

const MemberAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isMemberCollapsed, setIsMemberCollapsed] = useState(true);


    const emptyCollaborator = new CollaboratorDto();
    const [collaborators, setCollaborators] = useState<CollaboratorDto[]>([]);
    const [collaboratorModalVisible, setCollaboratorModalVisible] = useState(false);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorDto>(emptyCollaborator);


    const service = new MemberAdminService();
    const collaboratorAdminService = new CollaboratorAdminService();


    const { control, handleSubmit, reset } = useForm<MemberDto>({
        defaultValues: {
        description: '' ,
        collaborator: undefined,
        username: '' ,
        password: '' ,
        },
    });

    const memberCollapsible = () => {
        setIsMemberCollapsed(!isMemberCollapsed);
    };

    const handleCloseCollaboratorModal = () => {
        setCollaboratorModalVisible(false);
    };

    const onCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCollaborator(item);
        setCollaboratorModalVisible(false);
    };


    useEffect(() => {
        collaboratorAdminService.getList().then(({data}) => setCollaborators(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: MemberDto) => {
        item.collaborator = selectedCollaborator;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedCollaborator(emptyCollaborator);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving member:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} >Create Member</Text>

            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setCollaboratorModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCollaborator.description}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'credentialsNonExpired'} placeholder={'Credentials non expired'} keyboardT="numeric" />
                            <CustomInput control={control} name={'enabled'} placeholder={'Enabled'} keyboardT="numeric" />
                            <CustomInput control={control} name={'accountNonExpired'} placeholder={'Account non expired'} keyboardT="numeric" />
                            <CustomInput control={control} name={'accountNonLocked'} placeholder={'Account non locked'} keyboardT="numeric" />
                            <CustomInput control={control} name={'passwordChanged'} placeholder={'Password changed'} keyboardT="numeric" />
                            <CustomInput control={control} name={'username'} placeholder={'Username'} keyboardT="default" />
                            <CustomInput control={control} name={'password'} placeholder={'Password'} keyboardT="default" />
            
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {collaborators !== null && collaborators.length > 0 ? ( <FilterModal visibility={collaboratorModalVisible} placeholder={"Select a Collaborator"} onItemSelect={onCollaboratorSelect} items={collaborators} onClose={handleCloseCollaboratorModal} variable={'description'} /> ) : null}
    </SafeAreaView>
);
};
export default MemberAdminCreate;


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
      marginVertical: 15,
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