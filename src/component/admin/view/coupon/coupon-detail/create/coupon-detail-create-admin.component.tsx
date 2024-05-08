import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import  {CouponDetailDto}  from '../../../../../../controller/model/coupon/CouponDetail.model';

import {CouponDto} from '../../../../../../controller/model/coupon/Coupon.model';
import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import {PackagingDto} from '../../../../../../controller/model/packaging/Packaging.model';
import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';

const CouponDetailAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isCouponDetailCollapsed, setIsCouponDetailCollapsed] = useState(true);


    const emptyPackaging = new PackagingDto();
    const [packagings, setPackagings] = useState<PackagingDto[]>([]);
    const [packagingModalVisible, setPackagingModalVisible] = useState(false);
    const [selectedPackaging, setSelectedPackaging] = useState<PackagingDto>(emptyPackaging);

    const emptyCoupon = new CouponDto();
    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    const [couponModalVisible, setCouponModalVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponDto>(emptyCoupon);


    const service = new CouponDetailAdminService();
    const couponAdminService = new CouponAdminService();
    const packagingAdminService = new PackagingAdminService();


    const { control, handleSubmit, reset } = useForm<CouponDetailDto>({
        defaultValues: {
        packaging: undefined,
        discount: null ,
        amountGivenInfluencer: null ,
        usingNumber: null ,
        maxUsingNumber: null ,
        coupon: undefined,
        },
    });

    const couponDetailCollapsible = () => {
        setIsCouponDetailCollapsed(!isCouponDetailCollapsed);
    };

    const handleClosePackagingModal = () => {
        setPackagingModalVisible(false);
    };

    const onPackagingSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedPackaging(item);
        setPackagingModalVisible(false);
    };
    const handleCloseCouponModal = () => {
        setCouponModalVisible(false);
    };

    const onCouponSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCoupon(item);
        setCouponModalVisible(false);
    };


    useEffect(() => {
        packagingAdminService.getList().then(({data}) => setPackagings(data)).catch(error => console.log(error));
        couponAdminService.getList().then(({data}) => setCoupons(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: CouponDetailDto) => {
        item.packaging = selectedPackaging;
        item.coupon = selectedCoupon;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedPackaging(emptyPackaging);
            setSelectedCoupon(emptyCoupon);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving couponDetail:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} >Coupon Detail</Text>

           
                        <TouchableOpacity onPress={() => setPackagingModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedPackaging.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCouponModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCoupon.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {packagings !== null && packagings.length > 0 ? ( <FilterModal visibility={packagingModalVisible} placeholder={"Select a Packaging"} onItemSelect={onPackagingSelect} items={packagings} onClose={handleClosePackagingModal} variable={'id'} /> ) : null}
        {coupons !== null && coupons.length > 0 ? ( <FilterModal visibility={couponModalVisible} placeholder={"Select a Coupon"} onItemSelect={onCouponSelect} items={coupons} onClose={handleCloseCouponModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default CouponDetailAdminCreate;


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