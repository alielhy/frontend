import {Keyboard, SafeAreaView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';

import {globalStyle} from "../../../../../../shared/globalStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FilterModal from "../../../../../../zynerator/FilterModal";

import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import  {InfluencerDto}  from '../../../../../../controller/model/coupon/Influencer.model';


type InfluencerUpdateScreenRouteProp = RouteProp<{ InfluencerUpdate: { influencer: InfluencerDto } }, 'InfluencerUpdate'>;

type Props = { route: InfluencerUpdateScreenRouteProp; };

const InfluencerAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { influencer } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new InfluencerAdminService();


    const { control, handleSubmit } = useForm<InfluencerDto>({
        defaultValues: {
            id: influencer.id ,
            nickName: influencer.nickName ,
            rib: influencer.rib ,
            credentialsNonExpired: influencer.credentialsNonExpired ,
            enabled: influencer.enabled ,
            accountNonExpired: influencer.accountNonExpired ,
            accountNonLocked: influencer.accountNonLocked ,
            passwordChanged: influencer.passwordChanged ,
            username: influencer.username ,
            password: influencer.password ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: InfluencerDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Influencer');
        } catch (error) {
            console.error('Error saving influencer:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Influencer</Text>

            <CustomInput control={control} name={'nickName'} placeholder={'Nick name'} keyboardT="default" />
            <CustomInput control={control} name={'rib'} placeholder={'Rib'} keyboardT="default" />
            <CustomInput control={control} name={'credentialsNonExpired'} placeholder={'Credentials non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'enabled'} placeholder={'Enabled'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonExpired'} placeholder={'Account non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonLocked'} placeholder={'Account non locked'} keyboardT="numeric" />
            <CustomInput control={control} name={'passwordChanged'} placeholder={'Password changed'} keyboardT="numeric" />
            <CustomInput control={control} name={'username'} placeholder={'Username'} keyboardT="default" />
            <CustomInput control={control} name={'password'} placeholder={'Password'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Influencer"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default InfluencerAdminEdit;
