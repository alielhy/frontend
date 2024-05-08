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

import {DomainTemplateAdminService} from '../../../../../../controller/service/admin/template/DomainTemplateAdminService.service';
import  {DomainTemplateDto}  from '../../../../../../controller/model/template/DomainTemplate.model';


type DomainTemplateUpdateScreenRouteProp = RouteProp<{ DomainTemplateUpdate: { domainTemplate: DomainTemplateDto } }, 'DomainTemplateUpdate'>;

type Props = { route: DomainTemplateUpdateScreenRouteProp; };

const DomainTemplateAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { domainTemplate } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new DomainTemplateAdminService();


    const { control, handleSubmit } = useForm<DomainTemplateDto>({
        defaultValues: {
            id: domainTemplate.id ,
            code: domainTemplate.code ,
            name: domainTemplate.name ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: DomainTemplateDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('DomainTemplate');
        } catch (error) {
            console.error('Error saving domain template:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Domain template</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Domain template"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default DomainTemplateAdminEdit;
