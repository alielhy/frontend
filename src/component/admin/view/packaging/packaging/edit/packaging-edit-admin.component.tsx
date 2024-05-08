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

import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';
import  {PackagingDto}  from '../../../../../../controller/model/packaging/Packaging.model';

import {CategoryPackagingDto} from '../../../../../../controller/model/category/CategoryPackaging.model';
import {CategoryPackagingAdminService} from '../../../../../../controller/service/admin/category/CategoryPackagingAdminService.service';

type PackagingUpdateScreenRouteProp = RouteProp<{ PackagingUpdate: { packaging: PackagingDto } }, 'PackagingUpdate'>;

type Props = { route: PackagingUpdateScreenRouteProp; };

const PackagingAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { packaging } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyCategoryPackaging = new CategoryPackagingDto();
    const [categoryPackagings, setCategoryPackagings] = useState<CategoryPackagingDto[]>([]);
    const [categoryPackagingModalVisible, setCategoryPackagingModalVisible] = useState(false);
    const [selectedCategoryPackaging, setSelectedCategoryPackaging] = useState<CategoryPackagingDto>(emptyCategoryPackaging);


    const service = new PackagingAdminService();
    const categoryPackagingAdminService = new CategoryPackagingAdminService();


    const { control, handleSubmit } = useForm<PackagingDto>({
        defaultValues: {
            id: packaging.id ,
            name: packaging.name ,
            code: packaging.code ,
            description: packaging.description ,
            dateStart: packaging.dateStart ,
            dateEnd: packaging.dateEnd ,
            price: packaging.price ,
            maxEntity: packaging.maxEntity ,
            maxProjet: packaging.maxProjet ,
            maxAttribut: packaging.maxAttribut ,
            maxIndicator: packaging.maxIndicator ,
        },
    });



    const handleCloseCategoryPackagingModal = () => {
        setCategoryPackagingModalVisible(false);
    };

    const onCategoryPackagingSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCategoryPackaging(item);
        setCategoryPackagingModalVisible(false);
    };


    useEffect(() => {
        categoryPackagingAdminService.getList().then(({data}) => setCategoryPackagings(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: PackagingDto) => {
        item.categoryPackaging = selectedCategoryPackaging;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Packaging');
        } catch (error) {
            console.error('Error saving packaging:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Packaging</Text>

            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
            <CustomInput control={control} name={'dateStart'} placeholder={'Date start'} keyboardT="numeric" />
            <CustomInput control={control} name={'dateEnd'} placeholder={'Date end'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setCategoryPackagingModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCategoryPackaging?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Packaging"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {categoryPackagings &&
            <FilterModal visibility={categoryPackagingModalVisible} placeholder={"Select a CategoryPackaging"} onItemSelect={onCategoryPackagingSelect} items={categoryPackagings} onClose={handleCloseCategoryPackagingModal} variable={'name'} />
        }

    </SafeAreaView>
);
};

export default PackagingAdminEdit;
