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

import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import  {CouponDetailDto}  from '../../../../../../controller/model/coupon/CouponDetail.model';

import {CouponDto} from '../../../../../../controller/model/coupon/Coupon.model';
import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import {PackagingDto} from '../../../../../../controller/model/packaging/Packaging.model';
import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';

type CouponDetailUpdateScreenRouteProp = RouteProp<{ CouponDetailUpdate: { couponDetail: CouponDetailDto } }, 'CouponDetailUpdate'>;

type Props = { route: CouponDetailUpdateScreenRouteProp; };

const CouponDetailAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { couponDetail } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

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


    const { control, handleSubmit } = useForm<CouponDetailDto>({
        defaultValues: {
            id: couponDetail.id ,
            discount: couponDetail.discount ,
            amountGivenInfluencer: couponDetail.amountGivenInfluencer ,
            usingNumber: couponDetail.usingNumber ,
            maxUsingNumber: couponDetail.maxUsingNumber ,
        },
    });



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



    const handleUpdate = async (item: CouponDetailDto) => {
        item.packaging = selectedPackaging;
        item.coupon = selectedCoupon;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('CouponDetail');
        } catch (error) {
            console.error('Error saving coupon detail:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Coupon detail</Text>


            <TouchableOpacity onPress={() => setPackagingModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedPackaging?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCouponModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCoupon?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Coupon detail"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {packagings &&
            <FilterModal visibility={packagingModalVisible} placeholder={"Select a Packaging"} onItemSelect={onPackagingSelect} items={packagings} onClose={handleClosePackagingModal} variable={'id'} />
        }
        {coupons &&
            <FilterModal visibility={couponModalVisible} placeholder={"Select a Coupon"} onItemSelect={onCouponSelect} items={coupons} onClose={handleCloseCouponModal} variable={'name'} />
        }

    </SafeAreaView>
);
};

export default CouponDetailAdminEdit;
