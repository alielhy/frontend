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

import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';
import  {CollaboratorDto}  from '../../../../../../controller/model/collaborator/Collaborator.model';


type CollaboratorUpdateScreenRouteProp = RouteProp<{ CollaboratorUpdate: { collaborator: CollaboratorDto } }, 'CollaboratorUpdate'>;

type Props = { route: CollaboratorUpdateScreenRouteProp; };

const CollaboratorAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { collaborator } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new CollaboratorAdminService();


    const { control, handleSubmit } = useForm<CollaboratorDto>({
        defaultValues: {
            id: collaborator.id ,
            description: collaborator.description ,
            rib: collaborator.rib ,
            credentialsNonExpired: collaborator.credentialsNonExpired ,
            enabled: collaborator.enabled ,
            accountNonExpired: collaborator.accountNonExpired ,
            accountNonLocked: collaborator.accountNonLocked ,
            passwordChanged: collaborator.passwordChanged ,
            username: collaborator.username ,
            password: collaborator.password ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: CollaboratorDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Collaborator');
        } catch (error) {
            console.error('Error saving collaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Collaborator</Text>

            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
            <CustomInput control={control} name={'rib'} placeholder={'Rib'} keyboardT="default" />
            <CustomInput control={control} name={'credentialsNonExpired'} placeholder={'Credentials non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'enabled'} placeholder={'Enabled'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonExpired'} placeholder={'Account non expired'} keyboardT="numeric" />
            <CustomInput control={control} name={'accountNonLocked'} placeholder={'Account non locked'} keyboardT="numeric" />
            <CustomInput control={control} name={'passwordChanged'} placeholder={'Password changed'} keyboardT="numeric" />
            <CustomInput control={control} name={'username'} placeholder={'Username'} keyboardT="default" />
            <CustomInput control={control} name={'password'} placeholder={'Password'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Collaborator"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default CollaboratorAdminEdit;
