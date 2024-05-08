import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';

import {globalStyle} from "../../../../../../shared/globalStyle";

import {PaimentCollaboratorStateAdminService} from '../../../../../../controller/service/admin/project/PaimentCollaboratorStateAdminService.service';
import  {PaimentCollaboratorStateDto}  from '../../../../../../controller/model/project/PaimentCollaboratorState.model';


const PaimentCollaboratorStateAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPaimentCollaboratorStateCollapsed, setIsPaimentCollaboratorStateCollapsed] = useState(true);



    const service = new PaimentCollaboratorStateAdminService();


    const { control, handleSubmit, reset } = useForm<PaimentCollaboratorStateDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        },
    });

    const paimentCollaboratorStateCollapsible = () => {
        setIsPaimentCollaboratorStateCollapsed(!isPaimentCollaboratorStateCollapsed);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: PaimentCollaboratorStateDto) => {
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving paimentCollaboratorState:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewCreate} >
        <ScrollView style={globalStyle.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={globalStyle.textHeaderCreate} >Create PaimentCollaboratorState</Text>

            <TouchableOpacity onPress={paimentCollaboratorStateCollapsible} style={globalStyle.touchableOpacityCreate}>
                <Text style={globalStyle.touchableOpacityButtonCreate}>PaimentCollaboratorState</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentCollaboratorStateCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save PaimentCollaboratorState"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
    </SafeAreaView>
);
};
export default PaimentCollaboratorStateAdminCreate;
