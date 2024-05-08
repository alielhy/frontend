import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {CouponAdminService} from '../../../../../../controller/service/admin/coupon/CouponAdminService.service';
import  {CouponDto}  from '../../../../../../controller/model/coupon/Coupon.model';

import {CouponDetailDto} from '../../../../../../controller/model/coupon/CouponDetail.model';
import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import {InfluencerDto} from '../../../../../../controller/model/coupon/Influencer.model';
import {InfluencerAdminService} from '../../../../../../controller/service/admin/coupon/InfluencerAdminService.service';
import {PackagingDto} from '../../../../../../controller/model/packaging/Packaging.model';
import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';

const CouponAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isCouponCollapsed, setIsCouponCollapsed] = useState(true);


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


    const { control, handleSubmit, reset } = useForm<CouponDto>({
        defaultValues: {
        code: '' ,
        name: '' ,
        influencer: undefined,
        },
    });

    const couponCollapsible = () => {
        setIsCouponCollapsed(!isCouponCollapsed);
    };

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


    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<CouponDetailDto>({
        defaultValues: {
            packaging: undefined,
            discount: null ,
            amountGivenInfluencer: null ,
            usingNumber: null ,
            maxUsingNumber: null ,
            coupon: undefined,
        },
    });

    const couponDetailsElementCollapsible = () => {
        setIsCouponDetailsElementCollapsed(!isCouponDetailsElementCollapsed);
    };

    const couponDetailsElementsCollapsible = () => {
        setIsCouponDetailsElementsCollapsed(!isCouponDetailsElementsCollapsed);
    };

    const handleAddCouponDetails = (data: CouponDetailDto) => {
        if (data) {
            const newCouponDetail: CouponDetailDto = { id: null  , packaging: selectedPackaging, discount: data.discount ,amountGivenInfluencer: data.amountGivenInfluencer ,usingNumber: data.usingNumber ,maxUsingNumber: data.maxUsingNumber ,coupon: undefined , };
            setCouponDetailsElements((prevItems) => [...prevItems, newCouponDetail]);
            resetItem({discount: null ,amountGivenInfluencer: null ,usingNumber: null ,maxUsingNumber: null ,});
                setSelectedPackaging(emptyPackaging);
        }
    };

    const handleDeleteCouponDetails = (index) => {
        const updatedItems = couponDetailsElements.filter((item, i) => i !== index);
        setCouponDetailsElements(updatedItems);
    };

    const handleUpdateCouponDetails = (data: CouponDetailDto) => {
        if (data) {
            couponDetailsElements.map((item, i) => {
                if (i === editIndexCouponDetails) {
                    packaging: undefined ;
                    item.packaging = selectedPackaging;
                    item.discount = data.discount;
                    item.amountGivenInfluencer = data.amountGivenInfluencer;
                    item.usingNumber = data.usingNumber;
                    item.maxUsingNumber = data.maxUsingNumber;
                }
            });
            resetItem({discount: null ,amountGivenInfluencer: null ,usingNumber: null ,maxUsingNumber: null ,});
            setSelectedPackaging(emptyPackaging);
            setIsEditModeCouponDetails(false);
        }
        setIsCouponDetailsElementCollapsed(!isCouponDetailsElementCollapsed);
        setIsCouponDetailsElementsCollapsed(!isCouponDetailsElementsCollapsed);
    }

    const updateFormDefaultValuesCouponDetails = (index: number) => {
        let updatedCouponDetail: CouponDetailDto;
        setEditIndexCouponDetails(index);
        setIsEditModeCouponDetails(true);
        couponDetailsElements.map((item, i) => {
            if (i === index) {
                updatedCouponDetail = item;
            }
        });
        resetItem({discount: updatedCouponDetail.discount ,amountGivenInfluencer: updatedCouponDetail.amountGivenInfluencer ,usingNumber: updatedCouponDetail.usingNumber ,maxUsingNumber: updatedCouponDetail.maxUsingNumber ,});
        setSelectedPackaging(updatedCouponDetail.packaging);
        setIsCouponDetailsElementCollapsed(!isCouponDetailsElementCollapsed);
        setIsCouponDetailsElementsCollapsed(!isCouponDetailsElementsCollapsed);
    };


    const handleSave = async (item: CouponDto) => {
        item.couponDetails = couponDetailsElements;
        item.influencer = selectedInfluencer;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedInfluencer(emptyInfluencer);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.couponDetails = couponDetailsElements;
            setCouponDetailsElements([]);
        } catch (error) {
            console.error('Error saving coupon:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} >Create Coupon</Text>

           
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'dateStart'} placeholder={'Date start'} keyboardT="numeric" />
                            <CustomInput control={control} name={'dateEnd'} placeholder={'Date end'} keyboardT="numeric" />
                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setInfluencerModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInfluencer.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Coupon details</Text>

                <TouchableOpacity onPress={() => setPackagingModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedPackaging.id}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                            <CustomInput control={itemControl} name={'discount'} placeholder={'Discount'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'amountGivenInfluencer'} placeholder={'Amount given influencer'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'usingNumber'} placeholder={'Using number'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'maxUsingNumber'} placeholder={'Max using number'} keyboardT="numeric" />
                <TouchableOpacity onPress={ isEditCouponDetailsMode ? handleItemSubmit((data) => { handleUpdateCouponDetails(data); }) : handleItemSubmit(handleAddCouponDetails) } style={{ backgroundColor: '#fcae1e', borderRadius: 10, marginBottom: 5, width: '15%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "white"}}>
                    {isEditModeCouponDetails ? <Ionicons name="pencil-outline" size={25} color={'white'} /> : '+' }
                    </Text>
                </TouchableOpacity>
            
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Coupon details</Text>
            
                { couponDetails && couponDetailsElements.length > 0 ? ( couponDetailsElements.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Packaging: {item.packaging.id}</Text>
                            <Text style={styles.infos}>'Discount: {item.discount}</Text>
                            <Text style={styles.infos}>'Amount given influencer: {item.amountGivenInfluencer}</Text>
                            <Text style={styles.infos}>'Using number: {item.usingNumber}</Text>
                            <Text style={styles.infos}>'Max using number: {item.maxUsingNumber}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteCouponDetails(index)}>
                                <Ionicons name="trash-outline" size={22} color={'orange'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesCouponDetails(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'orange'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.placeholderInfo}>No coupon details yet.</Text>
                    </View>
                )}
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {influencers !== null && influencers.length > 0 ? ( <FilterModal visibility={influencerModalVisible} placeholder={"Select a Influencer"} onItemSelect={onInfluencerSelect} items={influencers} onClose={handleCloseInfluencerModal} variable={'id'} /> ) : null}
        {packagings !== null && packagings.length > 0 ? ( <FilterModal visibility={packagingModalVisible} placeholder={"Select a Packaging"} onItemSelect={onPackagingSelect} items={packagings} onClose={handleClosePackagingModal} variable={'id'} /> ) : null}
    </SafeAreaView>
);
};
export default CouponAdminCreate;

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
  