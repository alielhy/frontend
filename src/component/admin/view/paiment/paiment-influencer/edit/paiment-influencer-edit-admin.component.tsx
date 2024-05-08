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

import {PaimentInfluencerAdminService} from '../../../../../../controller/service/admin/paiment/PaimentInfluencerAdminService.service';
import  {PaimentInfluencerDto}  from '../../../../../../controller/model/paiment/PaimentInfluencer.model';

import {CouponDto} from '../../../../../../controller/model/coupon/Coupon.model';
import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import {InfluencerDto} from '../../../../../../controller/model/coupon/Influencer.model';
import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import {PaimentInfluencerStateDto} from '../../../../../../controller/model/project/PaimentInfluencerState.model';
import {PaimentInfluencerStateAdminService} from '../../../../../../controller/service/admin/project/PaimentInfluencerStateAdminService.service';

type PaimentInfluencerUpdateScreenRouteProp = RouteProp<{ PaimentInfluencerUpdate: { paimentInfluencer: PaimentInfluencerDto } }, 'PaimentInfluencerUpdate'>;

type Props = { route: PaimentInfluencerUpdateScreenRouteProp; };

const PaimentInfluencerAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { paimentInfluencer } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyInfluencer = new InfluencerDto();
    const [influencers, setInfluencers] = useState<InfluencerDto[]>([]);
    const [influencerModalVisible, setInfluencerModalVisible] = useState(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerDto>(emptyInfluencer);

    const emptyPaimentInfluencerState = new PaimentInfluencerStateDto();
    const [paimentInfluencerStates, setPaimentInfluencerStates] = useState<PaimentInfluencerStateDto[]>([]);
    const [paimentInfluencerStateModalVisible, setPaimentInfluencerStateModalVisible] = useState(false);
    const [selectedPaimentInfluencerState, setSelectedPaimentInfluencerState] = useState<PaimentInfluencerStateDto>(emptyPaimentInfluencerState);

    const emptyCoupon = new CouponDto();
    const [coupons, setCoupons] = useState<CouponDto[]>([]);
    const [couponModalVisible, setCouponModalVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponDto>(emptyCoupon);


    const service = new PaimentInfluencerAdminService();
    const couponAdminService = new CouponAdminService();
    const influencerAdminService = new InfluencerAdminService();
    const paimentInfluencerStateAdminService = new PaimentInfluencerStateAdminService();


    const { control, handleSubmit } = useForm<PaimentInfluencerDto>({
        defaultValues: {
            id: paimentInfluencer.id ,
            name: paimentInfluencer.name ,
            description: paimentInfluencer.description ,
            code: paimentInfluencer.code ,
            total: paimentInfluencer.total ,
            nbrUtilisation: paimentInfluencer.nbrUtilisation ,
            datePaiement: paimentInfluencer.datePaiement ,
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
    const handleClosePaimentInfluencerStateModal = () => {
        setPaimentInfluencerStateModalVisible(false);
    };

    const onPaimentInfluencerStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedPaimentInfluencerState(item);
        setPaimentInfluencerStateModalVisible(false);
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
        influencerAdminService.getList().then(({data}) => setInfluencers(data)).catch(error => console.log(error));
        couponAdminService.getList().then(({data}) => setCoupons(data)).catch(error => console.log(error));
        paimentInfluencerStateAdminService.getList().then(({data}) => setPaimentInfluencerStates(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: PaimentInfluencerDto) => {
        item.influencer = selectedInfluencer;
        item.coupon = selectedCoupon;
        item.paimentInfluencerState = selectedPaimentInfluencerState;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('PaimentInfluencer');
        } catch (error) {
            console.error('Error saving paiment influencer:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Paiment influencer</Text>

            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />

            <TouchableOpacity onPress={() => setInfluencerModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInfluencer?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCouponModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCoupon?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>
            <CustomInput control={control} name={'datePaiement'} placeholder={'Date paiement'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setPaimentInfluencerStateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedPaimentInfluencerState?.code}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Paiment influencer"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {influencers &&
            <FilterModal visibility={influencerModalVisible} placeholder={"Select a Influencer"} onItemSelect={onInfluencerSelect} items={influencers} onClose={handleCloseInfluencerModal} variable={'id'} />
        }
        {coupons &&
            <FilterModal visibility={couponModalVisible} placeholder={"Select a Coupon"} onItemSelect={onCouponSelect} items={coupons} onClose={handleCloseCouponModal} variable={'name'} />
        }
        {paimentInfluencerStates &&
            <FilterModal visibility={paimentInfluencerStateModalVisible} placeholder={"Select a PaimentInfluencerState"} onItemSelect={onPaimentInfluencerStateSelect} items={paimentInfluencerStates} onClose={handleClosePaimentInfluencerStateModal} variable={'code'} />
        }

    </SafeAreaView>
);
};

export default PaimentInfluencerAdminEdit;
