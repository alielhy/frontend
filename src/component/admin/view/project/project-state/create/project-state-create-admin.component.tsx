import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';

import {ProjectStateAdminService} from '../../../../../../controller/service/admin/project/ProjectStateAdminService.service';
import  {ProjectStateDto}  from '../../../../../../controller/model/project/ProjectState.model';


const ProjectStateAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isProjectStateCollapsed, setIsProjectStateCollapsed] = useState(true);



    const service = new ProjectStateAdminService();


    const { control, handleSubmit, reset } = useForm<ProjectStateDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        },
    });

    const projectStateCollapsible = () => {
        setIsProjectStateCollapsed(!isProjectStateCollapsed);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: ProjectStateDto) => {
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving projectState:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Project State</Text>

                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
           
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
    </SafeAreaView>
);
};
export default ProjectStateAdminCreate;


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