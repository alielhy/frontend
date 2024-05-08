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

import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import  {CouponDto}  from '../../../../../../controller/model/coupon/Coupon.model';

import {CouponDetailDto} from '../../../../../../controller/model/coupon/CouponDetail.model';
import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import {InfluencerDto} from '../../../../../../controller/model/coupon/Influencer.model';
import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import {PackagingDto} from '../../../../../../controller/model/packaging/Packaging.model';
import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';

type CouponUpdateScreenRouteProp = RouteProp<{ CouponUpdate: { coupon: CouponDto } }, 'CouponUpdate'>;

type Props = { route: CouponUpdateScreenRouteProp; };

const CouponAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { coupon } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyInfluencer = new InfluencerDto();
    const [influencers, setInfluencers] = useState<InfluencerDto[]>([]);
    const [influencerModalVisible, setInfluencerModalVisible] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerDto>(emptyInfluencer);

    const emptyPackaging = new PackagingDto();
    const [packagings, setPackagings] = useState<PackagingDto[]>([]);
    const [packagingModalVisible, setPackagingModalVisible] = useState(false);
    const [selectedPackaging, setSelectedPackaging] = useState<PackagingDto>(emptyPackaging);


    const service = new CouponAdminService();
    const couponDetailAdminService = new CouponDetailAdminService();
    const influencerAdminService = new InfluencerAdminService();
    const packagingAdminService = new PackagingAdminService();

    const [couponDetailsElements, setCouponDetailsElements] = useState<CouponDetailDto[]>([]);
    const [couponDetails, setCouponDetails] = useState<CouponDetailDto>(new CouponDetailDto());
    const [isEditModeCouponDetails, setIsEditModeCouponDetails] = useState(false);
    const [editIndexCouponDetails, setEditIndexCouponDetails] = useState(null);

    const [isCouponDetailsElementCollapsed, setIsCouponDetailsElementCollapsed] = useState(true);
    const [isCouponDetailsElementsCollapsed, setIsCouponDetailsElementsCollapsed] = useState(true);
    const [isCouponDetails, setIsCouponDetails] = useState(false);
    const [isEditCouponDetailsMode, setIsEditCouponDetailsMode] = useState(false);


    const { control, handleSubmit } = useForm<CouponDto>({
        defaultValues: {
            id: coupon.id ,
            code: coupon.code ,
            dateStart: coupon.dateStart ,
            dateEnd: coupon.dateEnd ,
            name: coupon.name ,
        },
    });



    const handleCloseInfluencerModal = () => {
        setInfluencerModalVisible(false);
    };

    const onInfluencerSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInfluencer(item);
        setInfluencerModalVisible(false);
    };
    const handleClosePackagingModal = () => {
        setPackagingModalVisible(false);
    };

    const onPackagingSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedPackaging(item);
        setPackagingModalVisible(false);
    };


    useEffect(() => {
        influencerAdminService.getList().then(({data}) => setInfluencers(data)).catch(error => console.log(error));

        packagingAdminService.getList().then(({data}) => setPackagings(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: CouponDto) => {
        item.influencer = selectedInfluencer;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Coupon');
        } catch (error) {
            console.error('Error saving coupon:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Coupon</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'dateStart'} placeholder={'Date start'} keyboardT="numeric" />
            <CustomInput control={control} name={'dateEnd'} placeholder={'Date end'} keyboardT="numeric" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />

            <TouchableOpacity onPress={() => setInfluencerModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInfluencer?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Coupon"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {influencers &&
            <FilterModal visibility={influencerModalVisible} placeholder={"Select a Influencer"} onItemSelect={onInfluencerSelect} items={influencers} onClose={handleCloseInfluencerModal} variable={'id'} />
        }

    </SafeAreaView>
);
};

export default CouponAdminEdit;
