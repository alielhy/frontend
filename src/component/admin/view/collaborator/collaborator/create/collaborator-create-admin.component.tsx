import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';

import {globalStyle} from "../../../../../../shared/globalStyle";

import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';
import  {CollaboratorDto}  from '../../../../../../controller/model/collaborator/Collaborator.model';


const CollaboratorAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isCollaboratorCollapsed, setIsCollaboratorCollapsed] = useState(true);



    const service = new CollaboratorAdminService();


    const { control, handleSubmit, reset } = useForm<CollaboratorDto>({
        defaultValues: {
        description: '' ,
        rib: '' ,
        username: '' ,
        password: '' ,
        },
    });

    const collaboratorCollapsible = () => {
        setIsCollaboratorCollapsed(!isCollaboratorCollapsed);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: CollaboratorDto) => {
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving collaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewCreate} >
        <ScrollView style={globalStyle.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Collaborator</Text>
            <Text style={styles.textBeneathCreate} >add your Collaborator</Text>

            

            
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                            <CustomInput control={control} name={'rib'} placeholder={'Rib'} keyboardT="default" />
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
    </SafeAreaView>
);
};
export default CollaboratorAdminCreate;


const styles = StyleSheet.create({
    textHeaderCreate: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
     },
    textBeneathCreate: {
        marginBottom: 35,
        fontSize: 15,
        alignSelf: "center",
        fontWeight: "bold"
    },


});