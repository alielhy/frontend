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

import {PaimentCollaboratorAdminService} from '../../../../../../controller/service/admin/paiment/PaimentCollaboratorAdminService.service';
import  {PaimentCollaboratorDto}  from '../../../../../../controller/model/paiment/PaimentCollaborator.model';

import {CouponDetailDto} from '../../../../../../controller/model/coupon/CouponDetail.model';
import {CouponDetailAdminService} from '../../../../../../controller/service/admin/coupon/CouponDetailAdminService.service';
import {PaimentCollaboratorStateDto} from '../../../../../../controller/model/project/PaimentCollaboratorState.model';
import {PaimentCollaboratorStateAdminService} from '../../../../../../controller/service/admin/project/PaimentCollaboratorStateAdminService.service';
import {InscriptionCollaboratorDto} from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';
import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';

type PaimentCollaboratorUpdateScreenRouteProp = RouteProp<{ PaimentCollaboratorUpdate: { paimentCollaborator: PaimentCollaboratorDto } }, 'PaimentCollaboratorUpdate'>;

type Props = { route: PaimentCollaboratorUpdateScreenRouteProp; };

const PaimentCollaboratorAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { paimentCollaborator } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

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


    const { control, handleSubmit } = useForm<PaimentCollaboratorDto>({
        defaultValues: {
            id: paimentCollaborator.id ,
            name: paimentCollaborator.name ,
            description: paimentCollaborator.description ,
            code: paimentCollaborator.code ,
            amountToPaid: paimentCollaborator.amountToPaid ,
            total: paimentCollaborator.total ,
            discount: paimentCollaborator.discount ,
            remaining: paimentCollaborator.remaining ,
            paiementDate: paimentCollaborator.paiementDate ,
        },
    });



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



    const handleUpdate = async (item: PaimentCollaboratorDto) => {
        item.couponDetail = selectedCouponDetail;
        item.inscriptionCollaborator = selectedInscriptionCollaborator;
        item.paimentCollaboratorState = selectedPaimentCollaboratorState;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('PaimentCollaborator');
        } catch (error) {
            console.error('Error saving paiment collaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Paiment collaborator</Text>

            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
            <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />
            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />

            <TouchableOpacity onPress={() => setCouponDetailModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCouponDetail?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>
            <CustomInput control={control} name={'paiementDate'} placeholder={'Paiement date'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setInscriptionCollaboratorModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionCollaborator?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPaimentCollaboratorStateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedPaimentCollaboratorState?.code}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Paiment collaborator"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {couponDetails &&
            <FilterModal visibility={couponDetailModalVisible} placeholder={"Select a CouponDetail"} onItemSelect={onCouponDetailSelect} items={couponDetails} onClose={handleCloseCouponDetailModal} variable={'id'} />
        }
        {inscriptionCollaborators &&
            <FilterModal visibility={inscriptionCollaboratorModalVisible} placeholder={"Select a InscriptionCollaborator"} onItemSelect={onInscriptionCollaboratorSelect} items={inscriptionCollaborators} onClose={handleCloseInscriptionCollaboratorModal} variable={'id'} />
        }
        {paimentCollaboratorStates &&
            <FilterModal visibility={paimentCollaboratorStateModalVisible} placeholder={"Select a PaimentCollaboratorState"} onItemSelect={onPaimentCollaboratorStateSelect} items={paimentCollaboratorStates} onClose={handleClosePaimentCollaboratorStateModal} variable={'code'} />
        }

    </SafeAreaView>
);
};

export default PaimentCollaboratorAdminEdit;
