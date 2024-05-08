import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';

import {globalStyle} from "../../../../../../shared/globalStyle";

import {PaimentInfluencerStateAdminService} from '../../../../../../controller/service/admin/project/PaimentInfluencerStateAdminService.service';
import  {PaimentInfluencerStateDto}  from '../../../../../../controller/model/project/PaimentInfluencerState.model';


const PaimentInfluencerStateAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPaimentInfluencerStateCollapsed, setIsPaimentInfluencerStateCollapsed] = useState(true);



    const service = new PaimentInfluencerStateAdminService();


    const { control, handleSubmit, reset } = useForm<PaimentInfluencerStateDto>({
        defaultValues: {
        code: '' ,
        libelle: '' ,
        },
    });

    const paimentInfluencerStateCollapsible = () => {
        setIsPaimentInfluencerStateCollapsed(!isPaimentInfluencerStateCollapsed);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: PaimentInfluencerStateDto) => {
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving paimentInfluencerState:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewCreate} >
        <ScrollView style={globalStyle.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={globalStyle.textHeaderCreate} >Create PaimentInfluencerState</Text>

            <TouchableOpacity onPress={paimentInfluencerStateCollapsible} style={globalStyle.touchableOpacityCreate}>
                <Text style={globalStyle.touchableOpacityButtonCreate}>PaimentInfluencerState</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentInfluencerStateCollapsed}>
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />
            </Collapsible>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save PaimentInfluencerState"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
    </SafeAreaView>
);
};
export default PaimentInfluencerStateAdminCreate;
