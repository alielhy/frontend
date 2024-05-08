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

import {InscriptionMembreAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreAdminService.service';
import  {InscriptionMembreDto}  from '../../../../../../controller/model/inscription/InscriptionMembre.model';

import {InscriptionMembreStateDto} from '../../../../../../controller/model/inscription/InscriptionMembreState.model';
import {InscriptionMembreStateAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreStateAdminService.service';
import {InscriptionCollaboratorDto} from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';
import {InscriptionCollaboratorAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionCollaboratorAdminService.service';
import {MemberDto} from '../../../../../../controller/model/collaborator/Member.model';
import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';

type InscriptionMembreUpdateScreenRouteProp = RouteProp<{ InscriptionMembreUpdate: { inscriptionMembre: InscriptionMembreDto } }, 'InscriptionMembreUpdate'>;

type Props = { route: InscriptionMembreUpdateScreenRouteProp; };

const InscriptionMembreAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { inscriptionMembre } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyInscriptionCollaborator = new InscriptionCollaboratorDto();
    const [inscriptionCollaborators, setInscriptionCollaborators] = useState<InscriptionCollaboratorDto[]>([]);
    const [inscriptionCollaboratorModalVisible, setInscriptionCollaboratorModalVisible] = useState(false);
    const [selectedInscriptionCollaborator, setSelectedInscriptionCollaborator] = useState<InscriptionCollaboratorDto>(emptyInscriptionCollaborator);

    const emptyMember = new MemberDto();
    const [members, setMembers] = useState<MemberDto[]>([]);
    const [memberModalVisible, setMemberModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberDto>(emptyMember);

    const emptyInscriptionMembreState = new InscriptionMembreStateDto();
    const [inscriptionMembreStates, setInscriptionMembreStates] = useState<InscriptionMembreStateDto[]>([]);
    const [inscriptionMembreStateModalVisible, setInscriptionMembreStateModalVisible] = useState(false);
    const [selectedInscriptionMembreState, setSelectedInscriptionMembreState] = useState<InscriptionMembreStateDto>(emptyInscriptionMembreState);


    const service = new InscriptionMembreAdminService();
    const inscriptionMembreStateAdminService = new InscriptionMembreStateAdminService();
    const inscriptionCollaboratorAdminService = new InscriptionCollaboratorAdminService();
    const memberAdminService = new MemberAdminService();


    const { control, handleSubmit } = useForm<InscriptionMembreDto>({
        defaultValues: {
            id: inscriptionMembre.id ,
            inscriptionDate: inscriptionMembre.inscriptionDate ,
            consumedEntity: inscriptionMembre.consumedEntity ,
            consumedProjet: inscriptionMembre.consumedProjet ,
            consumedAttribut: inscriptionMembre.consumedAttribut ,
            consumedIndicator: inscriptionMembre.consumedIndicator ,
            affectedEntity: inscriptionMembre.affectedEntity ,
            affectedProjet: inscriptionMembre.affectedProjet ,
            affectedAttribut: inscriptionMembre.affectedAttribut ,
            affectedIndicator: inscriptionMembre.affectedIndicator ,
        },
    });



    const handleCloseInscriptionCollaboratorModal = () => {
        setInscriptionCollaboratorModalVisible(false);
    };

    const onInscriptionCollaboratorSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionCollaborator(item);
        setInscriptionCollaboratorModalVisible(false);
    };
    const handleCloseMemberModal = () => {
        setMemberModalVisible(false);
    };

    const onMemberSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedMember(item);
        setMemberModalVisible(false);
    };
    const handleCloseInscriptionMembreStateModal = () => {
        setInscriptionMembreStateModalVisible(false);
    };

    const onInscriptionMembreStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionMembreState(item);
        setInscriptionMembreStateModalVisible(false);
    };


    useEffect(() => {
        memberAdminService.getList().then(({data}) => setMembers(data)).catch(error => console.log(error));
        inscriptionMembreStateAdminService.getList().then(({data}) => setInscriptionMembreStates(data)).catch(error => console.log(error));
        inscriptionCollaboratorAdminService.getList().then(({data}) => setInscriptionCollaborators(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: InscriptionMembreDto) => {
        item.member = selectedMember;
        item.inscriptionMembreState = selectedInscriptionMembreState;
        item.inscriptionCollaborator = selectedInscriptionCollaborator;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('InscriptionMembre');
        } catch (error) {
            console.error('Error saving inscription membre:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Inscription membre</Text>

            <CustomInput control={control} name={'inscriptionDate'} placeholder={'Inscription date'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setMemberModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedMember?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInscriptionMembreStateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionMembreState?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInscriptionCollaboratorModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionCollaborator?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Inscription membre"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {members &&
            <FilterModal visibility={memberModalVisible} placeholder={"Select a Member"} onItemSelect={onMemberSelect} items={members} onClose={handleCloseMemberModal} variable={'id'} />
        }
        {inscriptionMembreStates &&
            <FilterModal visibility={inscriptionMembreStateModalVisible} placeholder={"Select a InscriptionMembreState"} onItemSelect={onInscriptionMembreStateSelect} items={inscriptionMembreStates} onClose={handleCloseInscriptionMembreStateModal} variable={'name'} />
        }
        {inscriptionCollaborators &&
            <FilterModal visibility={inscriptionCollaboratorModalVisible} placeholder={"Select a InscriptionCollaborator"} onItemSelect={onInscriptionCollaboratorSelect} items={inscriptionCollaborators} onClose={handleCloseInscriptionCollaboratorModal} variable={'id'} />
        }

    </SafeAreaView>
);
};

export default InscriptionMembreAdminEdit;
