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

import {CategoryPackagingAdminService} from '../../../../../../controller/service/admin/category/CategoryPackagingAdminService.service';
import  {CategoryPackagingDto}  from '../../../../../../controller/model/category/CategoryPackaging.model';


type CategoryPackagingUpdateScreenRouteProp = RouteProp<{ CategoryPackagingUpdate: { categoryPackaging: CategoryPackagingDto } }, 'CategoryPackagingUpdate'>;

type Props = { route: CategoryPackagingUpdateScreenRouteProp; };

const CategoryPackagingAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { categoryPackaging } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);


    const service = new CategoryPackagingAdminService();


    const { control, handleSubmit } = useForm<CategoryPackagingDto>({
        defaultValues: {
            id: categoryPackaging.id ,
            code: categoryPackaging.code ,
            name: categoryPackaging.name ,
        },
    });





    useEffect(() => {
    }, []);



    const handleUpdate = async (item: CategoryPackagingDto) => {
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('CategoryPackaging');
        } catch (error) {
            console.error('Error saving category packaging:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Category packaging</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Category packaging"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />

    </SafeAreaView>
);
};

export default CategoryPackagingAdminEdit;
