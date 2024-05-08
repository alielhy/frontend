import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';
import  {PackagingDto}  from '../../../../../../controller/model/packaging/Packaging.model';

import {CategoryPackagingDto} from '../../../../../../controller/model/category/CategoryPackaging.model';
import {CategoryPackagingAdminService} from '../../../../../../controller/service/admin/category/CategoryPackagingAdminService.service';

const PackagingAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPackagingCollapsed, setIsPackagingCollapsed] = useState(true);


    const emptyCategoryPackaging = new CategoryPackagingDto();
    const [categoryPackagings, setCategoryPackagings] = useState<CategoryPackagingDto[]>([]);
    const [categoryPackagingModalVisible, setCategoryPackagingModalVisible] = useState(false);
    const [selectedCategoryPackaging, setSelectedCategoryPackaging] = useState<CategoryPackagingDto>(emptyCategoryPackaging);


    const service = new PackagingAdminService();
    const categoryPackagingAdminService = new CategoryPackagingAdminService();


    const { control, handleSubmit, reset } = useForm<PackagingDto>({
        defaultValues: {
        name: '' ,
        code: '' ,
        description: '' ,
        price: null ,
        maxEntity: null ,
        maxProjet: null ,
        maxAttribut: null ,
        maxIndicator: null ,
        categoryPackaging: undefined,
        },
    });

    const packagingCollapsible = () => {
        setIsPackagingCollapsed(!isPackagingCollapsed);
    };

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




    const handleSave = async (item: PackagingDto) => {
        item.categoryPackaging = selectedCategoryPackaging;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedCategoryPackaging(emptyCategoryPackaging);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving packaging:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} >Create Packages</Text>

                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                            <CustomInput control={control} name={'dateStart'} placeholder={'Date start'} keyboardT="numeric" />
                            <CustomInput control={control} name={'dateEnd'} placeholder={'Date end'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setCategoryPackagingModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCategoryPackaging.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
           
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {categoryPackagings !== null && categoryPackagings.length > 0 ? ( <FilterModal visibility={categoryPackagingModalVisible} placeholder={"Select a CategoryPackaging"} onItemSelect={onCategoryPackagingSelect} items={categoryPackagings} onClose={handleCloseCategoryPackagingModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default PackagingAdminCreate;


const styles = StyleSheet.create({
    safeAreaViewCreate: {
      flex: 1,
      backgroundColor: "#e6e8fa",
    },
    scrolllViewCreate: {
      margin: 20,
      marginBottom: 80,
    },
    textHeaderCreate: {
      color: '#000000',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
    touchableOpacityCreate: {
      backgroundColor: 'transparent',
      padding: 8,
      marginVertical: 20,
      alignSelf: 'center',
      
    },
    touchableOpacityButtonCreate: {
      color: '#000000',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    placeHolder: {
      backgroundColor: 'white',
      justifyContent: "center",
      borderRadius: 80,
      shadowColor: "black",
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.3,
      elevation: 10,
      marginVertical: 10,
      paddingHorizontal: 15,
      height: 50,
      width: "90%",
      alignSelf: "center"
    },
    placeHolderText: {
      color: 'grey',
      fontSize: 16,
    },
    placeholderInfo: {
        color: 'grey',
        fontSize: 13,
        alignSelf: "center"
      },
    itemCard: {
      backgroundColor: '#fff',
      padding: 10,
      width: "90%",
      borderRadius: 80,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: "black",
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.3,
      elevation: 10,
      alignSelf: "center",
      justifyContent: 'space-between',
      height: 50,
    },
    infos: {
      marginBottom: 5,
      fontSize: 16,
    },
  });