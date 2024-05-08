import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {PaimentInfluencerAdminService} from '../../../../../../controller/service/admin/paiment/PaimentInfluencerAdminService.service';
import  {PaimentInfluencerDto}  from '../../../../../../controller/model/paiment/PaimentInfluencer.model';

import {CouponDto} from '../../../../../../controller/model/coupon/Coupon.model';
import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import {InfluencerDto} from '../../../../../../controller/model/coupon/Influencer.model';
import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import {PaimentInfluencerStateDto} from '../../../../../../controller/model/project/PaimentInfluencerState.model';
import {PaimentInfluencerStateAdminService} from '../../../../../../controller/service/admin/project/PaimentInfluencerStateAdminService.service';

const PaimentInfluencerAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPaimentInfluencerCollapsed, setIsPaimentInfluencerCollapsed] = useState(true);


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


    const { control, handleSubmit, reset } = useForm<PaimentInfluencerDto>({
        defaultValues: {
        name: '' ,
        description: '' ,
        code: '' ,
        influencer: undefined,
        coupon: undefined,
        total: null ,
        nbrUtilisation: null ,
        paimentInfluencerState: undefined,
        },
    });

    const paimentInfluencerCollapsible = () => {
        setIsPaimentInfluencerCollapsed(!isPaimentInfluencerCollapsed);
    };

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




    const handleSave = async (item: PaimentInfluencerDto) => {
        item.influencer = selectedInfluencer;
        item.coupon = selectedCoupon;
        item.paimentInfluencerState = selectedPaimentInfluencerState;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedInfluencer(emptyInfluencer);
            setSelectedCoupon(emptyCoupon);
            setSelectedPaimentInfluencerState(emptyPaimentInfluencerState);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving paimentInfluencer:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Paiment Influencer</Text>

            
                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setInfluencerModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInfluencer.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCouponModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCoupon.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'datePaiement'} placeholder={'Date paiement'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setPaimentInfluencerStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedPaimentInfluencerState.code}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {influencers !== null && influencers.length > 0 ? ( <FilterModal visibility={influencerModalVisible} placeholder={"Select a Influencer"} onItemSelect={onInfluencerSelect} items={influencers} onClose={handleCloseInfluencerModal} variable={'id'} /> ) : null}
        {paimentInfluencerStates !== null && paimentInfluencerStates.length > 0 ? ( <FilterModal visibility={paimentInfluencerStateModalVisible} placeholder={"Select a PaimentInfluencerState"} onItemSelect={onPaimentInfluencerStateSelect} items={paimentInfluencerStates} onClose={handleClosePaimentInfluencerStateModal} variable={'code'} /> ) : null}
        {coupons !== null && coupons.length > 0 ? ( <FilterModal visibility={couponModalVisible} placeholder={"Select a Coupon"} onItemSelect={onCouponSelect} items={coupons} onClose={handleCloseCouponModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default PaimentInfluencerAdminCreate;


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