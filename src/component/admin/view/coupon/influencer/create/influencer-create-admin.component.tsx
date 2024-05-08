import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';

import {globalStyle} from "../../../../../../shared/globalStyle";

import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import  {InfluencerDto}  from '../../../../../../controller/model/coupon/Influencer.model';


const InfluencerAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isInfluencerCollapsed, setIsInfluencerCollapsed] = useState(true);



    const service = new InfluencerAdminService();


    const { control, handleSubmit, reset } = useForm<InfluencerDto>({
        defaultValues: {
        nickName: '' ,
        rib: '' ,
        username: '' ,
        password: '' ,
        },
    });

    const influencerCollapsible = () => {
        setIsInfluencerCollapsed(!isInfluencerCollapsed);
    };



    useEffect(() => {
    }, []);




    const handleSave = async (item: InfluencerDto) => {
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving influencer:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewCreate} >
        <ScrollView style={globalStyle.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={globalStyle.textHeaderCreate} >Create Influencer</Text>

           
                            <CustomInput control={control} name={'nickName'} placeholder={'Nick name'} keyboardT="default" />
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
export default InfluencerAdminCreate;
