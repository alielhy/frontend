import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';

import { Ionicons } from '@expo/vector-icons';

import {PaimentCollaboratorAdminService} from '../../../../../../controller/service/admin/paiment/PaimentCollaboratorAdminService.service';
import  {PaimentCollaboratorDto}  from '../../../../../../controller/model/paiment/PaimentCollaborator.model';

import {CouponDetailDto} from '../../../../../../controller/model/coupon/CouponDetail.model';
import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import {PaimentCollaboratorStateDto} from '../../../../../../controller/model/project/PaimentCollaboratorState.model';
import {PaimentCollaboratorStateAdminService} from '../../../../../../controller/service/admin/project/PaimentCollaboratorStateAdminService.service';
import {InscriptionCollaboratorDto} from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';
import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';

const PaimentCollaboratorAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isPaimentCollaboratorCollapsed, setIsPaimentCollaboratorCollapsed] = useState(true);


    const emptyCouponDetail = new CouponDetailDto();
    const [couponDetails, setCouponDetails] = useState<CouponDetailDto[]>([]);
    const [couponDetailModalVisible, setCouponDetailModalVisible] = useState(false);
    const [selectedCouponDetail, setSelectedCouponDetail] = useState<CouponDetailDto>(emptyCouponDetail);

    const emptyInscriptionCollaborator = new InscriptionCollaboratorDto();
    const [inscriptionCollaborators, setInscriptionCollaborators] = useState<InscriptionCollaboratorDto[]>([]);
    const [inscriptionCollaboratorModalVisible, setInscriptionCollaboratorModalVisible] = useState(false);
    const [selectedInscriptionCollaborator, setSelectedInscriptionCollaborator] = useState<InscriptionCollaboratorDto>(emptyInscriptionCollaborator);

    const emptyPaimentCollaboratorState = new PaimentCollaboratorStateDto();
    const [paimentCollaboratorStates, setPaimentCollaboratorStates] = useState<PaimentCollaboratorStateDto[]>([]);
    const [paimentCollaboratorStateModalVisible, setPaimentCollaboratorStateModalVisible] = useState(false);
    const [selectedPaimentCollaboratorState, setSelectedPaimentCollaboratorState] = useState<PaimentCollaboratorStateDto>(emptyPaimentCollaboratorState);


    const service = new PaimentCollaboratorAdminService();
    const couponDetailAdminService = new CouponDetailAdminService();
    const paimentCollaboratorStateAdminService = new PaimentCollaboratorStateAdminService();
    const inscriptionCollaboratorAdminService = new InscriptionCollaboratorAdminService();


    const { control, handleSubmit, reset } = useForm<PaimentCollaboratorDto>({
        defaultValues: {
        name: '' ,
        description: '' ,
        code: '' ,
        couponDetail: undefined,
        amountToPaid: null ,
        total: null ,
        discount: null ,
        remaining: null ,
        inscriptionCollaborator: undefined,
        paimentCollaboratorState: undefined,
        },
    });

    const paimentCollaboratorCollapsible = () => {
        setIsPaimentCollaboratorCollapsed(!isPaimentCollaboratorCollapsed);
    };

    const handleCloseCouponDetailModal = () => {
        setCouponDetailModalVisible(false);
    };

    const onCouponDetailSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCouponDetail(item);
        setCouponDetailModalVisible(false);
    };
    const handleCloseInscriptionCollaboratorModal = () => {
        setInscriptionCollaboratorModalVisible(false);
    };

    const onInscriptionCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionCollaborator(item);
        setInscriptionCollaboratorModalVisible(false);
    };
    const handleClosePaimentCollaboratorStateModal = () => {
        setPaimentCollaboratorStateModalVisible(false);
    };

    const onPaimentCollaboratorStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedPaimentCollaboratorState(item);
        setPaimentCollaboratorStateModalVisible(false);
    };


    useEffect(() => {
        couponDetailAdminService.getList().then(({data}) => setCouponDetails(data)).catch(error => console.log(error));
        inscriptionCollaboratorAdminService.getList().then(({data}) => setInscriptionCollaborators(data)).catch(error => console.log(error));
        paimentCollaboratorStateAdminService.getList().then(({data}) => setPaimentCollaboratorStates(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: PaimentCollaboratorDto) => {
        item.couponDetail = selectedCouponDetail;
        item.inscriptionCollaborator = selectedInscriptionCollaborator;
        item.paimentCollaboratorState = selectedPaimentCollaboratorState;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedCouponDetail(emptyCouponDetail);
            setSelectedInscriptionCollaborator(emptyInscriptionCollaborator);
            setSelectedPaimentCollaboratorState(emptyPaimentCollaboratorState);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving paimentCollaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Paiment Collaborator</Text>

                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setCouponDetailModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCouponDetail.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'paiementDate'} placeholder={'Paiement date'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setInscriptionCollaboratorModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionCollaborator.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPaimentCollaboratorStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedPaimentCollaboratorState.code}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {couponDetails !== null && couponDetails.length > 0 ? ( <FilterModal visibility={couponDetailModalVisible} placeholder={"Select a CouponDetail"} onItemSelect={onCouponDetailSelect} items={couponDetails} onClose={handleCloseCouponDetailModal} variable={'id'} /> ) : null}
        {inscriptionCollaborators !== null && inscriptionCollaborators.length > 0 ? ( <FilterModal visibility={inscriptionCollaboratorModalVisible} placeholder={"Select a InscriptionCollaborator"} onItemSelect={onInscriptionCollaboratorSelect} items={inscriptionCollaborators} onClose={handleCloseInscriptionCollaboratorModal} variable={'id'} /> ) : null}
        {paimentCollaboratorStates !== null && paimentCollaboratorStates.length > 0 ? ( <FilterModal visibility={paimentCollaboratorStateModalVisible} placeholder={"Select a PaimentCollaboratorState"} onItemSelect={onPaimentCollaboratorStateSelect} items={paimentCollaboratorStates} onClose={handleClosePaimentCollaboratorStateModal} variable={'code'} /> ) : null}
    </SafeAreaView>
);
};
export default PaimentCollaboratorAdminCreate;


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