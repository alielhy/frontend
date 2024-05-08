import {Keyboard, SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
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

import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';
import  {InscriptionCollaboratorDto}  from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';

import {CollaboratorDto} from '../../../../../../controller/model/collaborator/Collaborator.model';
import {CollaboratorAdminService} from '../../../../../../controller/service/admin/collaborator/CollaboratorAdminService.service';
import {InscriptionMembreDto} from '../../../../../../controller/model/inscription/InscriptionMembre.model';
import {InscriptionMembreAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreAdminService.service';
import {InscriptionCollaboratorTypeDto} from '../../../../../../controller/model/inscription/InscriptionCollaboratorType.model';
import {InscriptionCollaboratorTypeAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorTypeAdminService.service';
import {InscriptionMembreStateDto} from '../../../../../../controller/model/inscription/InscriptionMembreState.model';
import {InscriptionMembreStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreStateAdminService.service';
import {PackagingDto} from '../../../../../../controller/model/packaging/Packaging.model';
import {PackagingAdminService} from '../../../../../../controller/service/admin/packaging/PackagingAdminService.service';
import {InscriptionCollaboratorStateDto} from '../../../../../../controller/model/inscription/InscriptionCollaboratorState.model';
import {InscriptionCollaboratorStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorStateAdminService.service';
import {MemberDto} from '../../../../../../controller/model/collaborator/Member.model';
import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';

type InscriptionCollaboratorUpdateScreenRouteProp = RouteProp<{ InscriptionCollaboratorUpdate: { inscriptionCollaborator: InscriptionCollaboratorDto } }, 'InscriptionCollaboratorUpdate'>;

type Props = { route: InscriptionCollaboratorUpdateScreenRouteProp; };

const InscriptionCollaboratorAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { inscriptionCollaborator } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyMember = new MemberDto();
    const [members, setMembers] = useState<MemberDto[]>([]);
    const [memberModalVisible, setMemberModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberDto>(emptyMember);

    const emptyCollaborator = new CollaboratorDto();
    const [collaborators, setCollaborators] = useState<CollaboratorDto[]>([]);
    const [collaboratorModalVisible, setCollaboratorModalVisible] = useState(false);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorDto>(emptyCollaborator);

    const emptyInscriptionCollaboratorState = new InscriptionCollaboratorStateDto();
    const [inscriptionCollaboratorStates, setInscriptionCollaboratorStates] = useState<InscriptionCollaboratorStateDto[]>([]);
    const [inscriptionCollaboratorStateModalVisible, setInscriptionCollaboratorStateModalVisible] = useState(false);
    const [selectedInscriptionCollaboratorState, setSelectedInscriptionCollaboratorState] = useState<InscriptionCollaboratorStateDto>(emptyInscriptionCollaboratorState);

    const emptyPackaging = new PackagingDto();
    const [packagings, setPackagings] = useState<PackagingDto[]>([]);
    const [packagingModalVisible, setPackagingModalVisible] = useState(false);
    const [selectedPackaging, setSelectedPackaging] = useState<PackagingDto>(emptyPackaging);

    const emptyInscriptionMembreState = new InscriptionMembreStateDto();
    const [inscriptionMembreStates, setInscriptionMembreStates] = useState<InscriptionMembreStateDto[]>([]);
    const [inscriptionMembreStateModalVisible, setInscriptionMembreStateModalVisible] = useState(false);
    const [selectedInscriptionMembreState, setSelectedInscriptionMembreState] = useState<InscriptionMembreStateDto>(emptyInscriptionMembreState);

    const emptyInscriptionCollaboratorType = new InscriptionCollaboratorTypeDto();
    const [inscriptionCollaboratorTypes, setInscriptionCollaboratorTypes] = useState<InscriptionCollaboratorTypeDto[]>([]);
    const [inscriptionCollaboratorTypeModalVisible, setInscriptionCollaboratorTypeModalVisible] = useState(false);
    const [selectedInscriptionCollaboratorType, setSelectedInscriptionCollaboratorType] = useState<InscriptionCollaboratorTypeDto>(emptyInscriptionCollaboratorType);


    const service = new InscriptionCollaboratorAdminService();
    const collaboratorAdminService = new CollaboratorAdminService();
    const inscriptionMembreAdminService = new InscriptionMembreAdminService();
    const inscriptionCollaboratorTypeAdminService = new InscriptionCollaboratorTypeAdminService();
    const inscriptionMembreStateAdminService = new InscriptionMembreStateAdminService();
    const packagingAdminService = new PackagingAdminService();
    const inscriptionCollaboratorStateAdminService = new InscriptionCollaboratorStateAdminService();
    const memberAdminService = new MemberAdminService();

    const [inscriptionMembresElements, setInscriptionMembresElements] = useState<InscriptionMembreDto[]>([]);
    const [inscriptionMembres, setInscriptionMembres] = useState<InscriptionMembreDto>(new InscriptionMembreDto());
    const [isEditModeInscriptionMembres, setIsEditModeInscriptionMembres] = useState(false);
    const [editIndexInscriptionMembres, setEditIndexInscriptionMembres] = useState(null);

    const [isInscriptionMembresElementCollapsed, setIsInscriptionMembresElementCollapsed] = useState(true);
    const [isInscriptionMembresElementsCollapsed, setIsInscriptionMembresElementsCollapsed] = useState(true);
    const [isInscriptionMembres, setIsInscriptionMembres] = useState(false);
    const [isEditInscriptionMembresMode, setIsEditInscriptionMembresMode] = useState(false);


    const { control, handleSubmit } = useForm<InscriptionCollaboratorDto>({
        defaultValues: {
            id: inscriptionCollaborator.id ,
            startDate: inscriptionCollaborator.startDate ,
            endDate: inscriptionCollaborator.endDate ,
            renewDate: inscriptionCollaborator.renewDate ,
            consumedEntity: inscriptionCollaborator.consumedEntity ,
            consumedProjet: inscriptionCollaborator.consumedProjet ,
            consumedAttribut: inscriptionCollaborator.consumedAttribut ,
            consumedIndicator: inscriptionCollaborator.consumedIndicator ,
        },
    });



    const handleCloseMemberModal = () => {
        setMemberModalVisible(false);
    };

    const onMemberSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedMember(item);
        setMemberModalVisible(false);
    };
    const handleCloseCollaboratorModal = () => {
        setCollaboratorModalVisible(false);
    };

    const onCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCollaborator(item);
        setCollaboratorModalVisible(false);
    };
    const handleCloseInscriptionCollaboratorStateModal = () => {
        setInscriptionCollaboratorStateModalVisible(false);
    };

    const onInscriptionCollaboratorStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionCollaboratorState(item);
        setInscriptionCollaboratorStateModalVisible(false);
    };
    const handleClosePackagingModal = () => {
        setPackagingModalVisible(false);
    };

    const onPackagingSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedPackaging(item);
        setPackagingModalVisible(false);
    };
    const handleCloseInscriptionMembreStateModal = () => {
        setInscriptionMembreStateModalVisible(false);
    };

    const onInscriptionMembreStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionMembreState(item);
        setInscriptionMembreStateModalVisible(false);
    };
    const handleCloseInscriptionCollaboratorTypeModal = () => {
        setInscriptionCollaboratorTypeModalVisible(false);
    };

    const onInscriptionCollaboratorTypeSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionCollaboratorType(item);
        setInscriptionCollaboratorTypeModalVisible(false);
    };


    useEffect(() => {
        packagingAdminService.getList().then(({data}) => setPackagings(data)).catch(error => console.log(error));
        collaboratorAdminService.getList().then(({data}) => setCollaborators(data)).catch(error => console.log(error));
        inscriptionCollaboratorStateAdminService.getList().then(({data}) => setInscriptionCollaboratorStates(data)).catch(error => console.log(error));
        inscriptionCollaboratorTypeAdminService.getList().then(({data}) => setInscriptionCollaboratorTypes(data)).catch(error => console.log(error));

        memberAdminService.getList().then(({data}) => setMembers(data)).catch(error => console.log(error));
        inscriptionMembreStateAdminService.getList().then(({data}) => setInscriptionMembreStates(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: InscriptionCollaboratorDto) => {
        item.packaging = selectedPackaging;
        item.collaborator = selectedCollaborator;
        item.inscriptionCollaboratorState = selectedInscriptionCollaboratorState;
        item.inscriptionCollaboratorType = selectedInscriptionCollaboratorType;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('InscriptionCollaborator');
        } catch (error) {
            console.error('Error saving inscription collaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Inscription collaborator</Text>

            <CustomInput control={control} name={'startDate'} placeholder={'Start date'} keyboardT="numeric" />
            <CustomInput control={control} name={'endDate'} placeholder={'End date'} keyboardT="numeric" />
            <CustomInput control={control} name={'renewDate'} placeholder={'Renew date'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setPackagingModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedPackaging?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCollaboratorModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCollaborator?.description}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInscriptionCollaboratorStateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionCollaboratorState?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInscriptionCollaboratorTypeModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionCollaboratorType?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Inscription collaborator"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {packagings &&
            <FilterModal visibility={packagingModalVisible} placeholder={"Select a Packaging"} onItemSelect={onPackagingSelect} items={packagings} onClose={handleClosePackagingModal} variable={'id'} />
        }
        {collaborators &&
            <FilterModal visibility={collaboratorModalVisible} placeholder={"Select a Collaborator"} onItemSelect={onCollaboratorSelect} items={collaborators} onClose={handleCloseCollaboratorModal} variable={'description'} />
        }
        {inscriptionCollaboratorStates &&
            <FilterModal visibility={inscriptionCollaboratorStateModalVisible} placeholder={"Select a InscriptionCollaboratorState"} onItemSelect={onInscriptionCollaboratorStateSelect} items={inscriptionCollaboratorStates} onClose={handleCloseInscriptionCollaboratorStateModal} variable={'name'} />
        }
        {inscriptionCollaboratorTypes &&
            <FilterModal visibility={inscriptionCollaboratorTypeModalVisible} placeholder={"Select a InscriptionCollaboratorType"} onItemSelect={onInscriptionCollaboratorTypeSelect} items={inscriptionCollaboratorTypes} onClose={handleCloseInscriptionCollaboratorTypeModal} variable={'name'} />
        }

    </SafeAreaView>
);
};

export default InscriptionCollaboratorAdminEdit;


const styles = StyleSheet.create({
    placeHolder: {

    },
});