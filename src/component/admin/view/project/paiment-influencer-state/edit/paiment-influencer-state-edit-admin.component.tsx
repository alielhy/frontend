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

import {PaimentInfluencerStateAdminService} from '../../../../../../controller/service/admin/project/PaimentInfluencerStateAdminService.service';
import  {PaimentInfluencerStateDto}  from '../../../../../../controller/model/project/PaimentInfluencerState.model';


type PaimentInfluencerStateUpdateScreenRouteProp = RouteProp<{ PaimentInfluencerStateUpdate: { paimentInfluencerState: PaimentInfluencerStateDto } }, 'PaimentInfluencerStateUpdate'>;

type Props = { route: PaimentInfluencerStateUpdateScreenRouteProp; };

const PaimentInfluencerStateAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { paimentInfluencerState } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new PaimentInfluencerStateAdminService();


    const { control, handleSubmit } = useForm<PaimentInfluencerStateDto>({
        defaultValues: {
            id: paimentInfluencerState.id ,
            code: paimentInfluencerState.code ,
            libelle: paimentInfluencerState.libelle ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: PaimentInfluencerStateDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('PaimentInfluencerState');
        } catch (error) {
            console.error('Error saving paiment influencer state:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Paiment influencer state</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'libelle'} placeholder={'Libelle'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Paiment influencer state"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default PaimentInfluencerStateAdminEdit;
