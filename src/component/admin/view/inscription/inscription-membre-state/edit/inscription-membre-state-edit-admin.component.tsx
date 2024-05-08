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

import {InscriptionMembreStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreStateAdminService.service';
import  {InscriptionMembreStateDto}  from '../../../../../../controller/model/inscription/InscriptionMembreState.model';


type InscriptionMembreStateUpdateScreenRouteProp = RouteProp<{ InscriptionMembreStateUpdate: { inscriptionMembreState: InscriptionMembreStateDto } }, 'InscriptionMembreStateUpdate'>;

type Props = { route: InscriptionMembreStateUpdateScreenRouteProp; };

const InscriptionMembreStateAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { inscriptionMembreState } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new InscriptionMembreStateAdminService();


    const { control, handleSubmit } = useForm<InscriptionMembreStateDto>({
        defaultValues: {
            id: inscriptionMembreState.id ,
            code: inscriptionMembreState.code ,
            name: inscriptionMembreState.name ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: InscriptionMembreStateDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('InscriptionMembreState');
        } catch (error) {
            console.error('Error saving inscription membre state:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Inscription membre state</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Inscription membre state"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default InscriptionMembreStateAdminEdit;
