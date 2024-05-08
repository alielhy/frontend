import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import FilterModal from '../../../../../../zynerator/FilterModal';


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
import { transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const InscriptionCollaboratorAdminCreate = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isInscriptionCollaboratorCollapsed, setIsInscriptionCollaboratorCollapsed] = useState(true);


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


    const { control, handleSubmit, reset } = useForm<InscriptionCollaboratorDto>({
        defaultValues: {
        packaging: undefined,
        consumedEntity: null ,
        consumedProjet: null ,
        consumedAttribut: null ,
        consumedIndicator: null ,
        collaborator: undefined,
        inscriptionCollaboratorState: undefined,
        inscriptionCollaboratorType: undefined,
        },
    });

    const inscriptionCollaboratorCollapsible = () => {
        setIsInscriptionCollaboratorCollapsed(!isInscriptionCollaboratorCollapsed);
    };

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


    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<InscriptionMembreDto>({
        defaultValues: {
            member: undefined,
            inscriptionMembreState: undefined,
            inscriptionCollaborator: undefined,
            consumedEntity: null ,
            consumedProjet: null ,
            consumedAttribut: null ,
            consumedIndicator: null ,
            affectedEntity: null ,
            affectedProjet: null ,
            affectedAttribut: null ,
            affectedIndicator: null ,
        },
    });

    const inscriptionMembresElementCollapsible = () => {
        setIsInscriptionMembresElementCollapsed(!isInscriptionMembresElementCollapsed);
    };

    const inscriptionMembresElementsCollapsible = () => {
        setIsInscriptionMembresElementsCollapsed(!isInscriptionMembresElementsCollapsed);
    };

    const handleAddInscriptionMembres = (data: InscriptionMembreDto) => {
        if (data) {
            const newInscriptionMembre: InscriptionMembreDto = { id: null  , inscriptionDate: data.inscriptionDate ,member: selectedMember, inscriptionMembreState: selectedInscriptionMembreState, inscriptionCollaborator: undefined ,consumedEntity: data.consumedEntity ,consumedProjet: data.consumedProjet ,consumedAttribut: data.consumedAttribut ,consumedIndicator: data.consumedIndicator ,affectedEntity: data.affectedEntity ,affectedProjet: data.affectedProjet ,affectedAttribut: data.affectedAttribut ,affectedIndicator: data.affectedIndicator , };
            setInscriptionMembresElements((prevItems) => [...prevItems, newInscriptionMembre]);
            resetItem({consumedEntity: null ,consumedProjet: null ,consumedAttribut: null ,consumedIndicator: null ,affectedEntity: null ,affectedProjet: null ,affectedAttribut: null ,affectedIndicator: null ,});
                setSelectedMember(emptyMember);
                setSelectedInscriptionMembreState(emptyInscriptionMembreState);
        }
    };

    const handleDeleteInscriptionMembres = (index) => {
        const updatedItems = inscriptionMembresElements.filter((item, i) => i !== index);
        setInscriptionMembresElements(updatedItems);
    };

    const handleUpdateInscriptionMembres = (data: InscriptionMembreDto) => {
        if (data) {
            inscriptionMembresElements.map((item, i) => {
                if (i === editIndexInscriptionMembres) {
                    item.inscriptionDate = data.inscriptionDate;
                    member: undefined ;
                    item.member = selectedMember;
                    inscriptionMembreState: undefined ;
                    item.inscriptionMembreState = selectedInscriptionMembreState;
                    item.consumedEntity = data.consumedEntity;
                    item.consumedProjet = data.consumedProjet;
                    item.consumedAttribut = data.consumedAttribut;
                    item.consumedIndicator = data.consumedIndicator;
                    item.affectedEntity = data.affectedEntity;
                    item.affectedProjet = data.affectedProjet;
                    item.affectedAttribut = data.affectedAttribut;
                    item.affectedIndicator = data.affectedIndicator;
                }
            });
            resetItem({consumedEntity: null ,consumedProjet: null ,consumedAttribut: null ,consumedIndicator: null ,affectedEntity: null ,affectedProjet: null ,affectedAttribut: null ,affectedIndicator: null ,});
            setSelectedMember(emptyMember);
            setSelectedInscriptionMembreState(emptyInscriptionMembreState);
            setIsEditModeInscriptionMembres(false);
        }
        setIsInscriptionMembresElementCollapsed(!isInscriptionMembresElementCollapsed);
        setIsInscriptionMembresElementsCollapsed(!isInscriptionMembresElementsCollapsed);
    }

    const updateFormDefaultValuesInscriptionMembres = (index: number) => {
        let updatedInscriptionMembre: InscriptionMembreDto;
        setEditIndexInscriptionMembres(index);
        setIsEditModeInscriptionMembres(true);
        inscriptionMembresElements.map((item, i) => {
            if (i === index) {
                updatedInscriptionMembre = item;
            }
        });
        resetItem({inscriptionDate: updatedInscriptionMembre.inscriptionDate ,consumedEntity: updatedInscriptionMembre.consumedEntity ,consumedProjet: updatedInscriptionMembre.consumedProjet ,consumedAttribut: updatedInscriptionMembre.consumedAttribut ,consumedIndicator: updatedInscriptionMembre.consumedIndicator ,affectedEntity: updatedInscriptionMembre.affectedEntity ,affectedProjet: updatedInscriptionMembre.affectedProjet ,affectedAttribut: updatedInscriptionMembre.affectedAttribut ,affectedIndicator: updatedInscriptionMembre.affectedIndicator ,});
        setSelectedMember(updatedInscriptionMembre.member);
        setSelectedInscriptionMembreState(updatedInscriptionMembre.inscriptionMembreState);
        setIsInscriptionMembresElementCollapsed(!isInscriptionMembresElementCollapsed);
        setIsInscriptionMembresElementsCollapsed(!isInscriptionMembresElementsCollapsed);
    };


    const handleSave = async (item: InscriptionCollaboratorDto) => {
        item.packaging = selectedPackaging;
        item.collaborator = selectedCollaborator;
        item.inscriptionCollaboratorState = selectedInscriptionCollaboratorState;
        item.inscriptionCollaboratorType = selectedInscriptionCollaboratorType;
        item.inscriptionMembres = inscriptionMembresElements;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedPackaging(emptyPackaging);
            setSelectedCollaborator(emptyCollaborator);
            setSelectedInscriptionCollaboratorState(emptyInscriptionCollaboratorState);
            setSelectedInscriptionCollaboratorType(emptyInscriptionCollaboratorType);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            item.inscriptionMembres = inscriptionMembresElements;
            setInscriptionMembresElements([]);
        } catch (error) {
            console.error('Error saving inscriptionCollaborator:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} >Add Your Team Member</Text>

            <View style={styles.touchableOpacityCreate}>
                <Text style={styles.touchableOpacityButtonCreate}>Inscription Collaborator</Text>
            </View>
                            <CustomInput control={control} name={'startDate'} placeholder={'Start date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'endDate'} placeholder={'End date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'renewDate'} placeholder={'Renew date'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setPackagingModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedPackaging.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCollaboratorModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCollaborator.description}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setInscriptionCollaboratorStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionCollaboratorState.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setInscriptionCollaboratorTypeModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionCollaboratorType.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            <View style={styles.touchableOpacityCreate}>
                <Text style={styles.touchableOpacityButtonCreate}>Add Inscription Member</Text>
            </View>

                <TouchableOpacity onPress={() => setMemberModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedMember.id}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setInscriptionMembreStateModalVisible(true)} style={styles.placeHolder} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>{selectedInscriptionMembreState.name}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                            <CustomInput control={itemControl} name={'consumedEntity'} placeholder={'Consumed entity'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'consumedProjet'} placeholder={'Consumed projet'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'consumedAttribut'} placeholder={'Consumed attribut'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'consumedIndicator'} placeholder={'Consumed indicator'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'affectedEntity'} placeholder={'Affected entity'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'affectedProjet'} placeholder={'Affected projet'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'affectedAttribut'} placeholder={'Affected attribut'} keyboardT="numeric" />
                            <CustomInput control={itemControl} name={'affectedIndicator'} placeholder={'Affected indicator'} keyboardT="numeric" />
                <TouchableOpacity onPress={ isEditInscriptionMembresMode ? handleItemSubmit((data) => { handleUpdateInscriptionMembres(data); }) : handleItemSubmit(handleAddInscriptionMembres) } style={{ backgroundColor: '#fcae1e', borderRadius: 10, marginBottom: 5, width: '15%', paddingVertical: 10, marginLeft: '80%', marginTop: 10 }} >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "#fff" }}>
                    {isEditModeInscriptionMembres ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>
            <View style={styles.touchableOpacityCreate}>
                <Text style={styles.touchableOpacityButtonCreate}>List Inscription Membres</Text>
            </View>
                { inscriptionMembres && inscriptionMembresElements.length > 0 ? ( inscriptionMembresElements.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <View>
                            <Text style={styles.infos}>'Inscription date: {item.inscriptionDate}</Text>
                            <Text style={styles.infos}>'Member: {item.member.id}</Text>
                            <Text style={styles.infos}>'Inscription membre state: {item.inscriptionMembreState.name}</Text>
                            <Text style={styles.infos}>'Consumed entity: {item.consumedEntity}</Text>
                            <Text style={styles.infos}>'Consumed projet: {item.consumedProjet}</Text>
                            <Text style={styles.infos}>'Consumed attribut: {item.consumedAttribut}</Text>
                            <Text style={styles.infos}>'Consumed indicator: {item.consumedIndicator}</Text>
                            <Text style={styles.infos}>'Affected entity: {item.affectedEntity}</Text>
                            <Text style={styles.infos}>'Affected projet: {item.affectedProjet}</Text>
                            <Text style={styles.infos}>'Affected attribut: {item.affectedAttribut}</Text>
                            <Text style={styles.infos}>'Affected indicator: {item.affectedIndicator}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => handleDeleteInscriptionMembres(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValuesInscriptionMembres(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={styles.itemCard}>
                        <Text style={styles.placeholderInfo}>No inscription membres yet.</Text>
                    </View>
                )}
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {members !== null && members.length > 0 ? ( <FilterModal visibility={memberModalVisible} placeholder={"Select a Member"} onItemSelect={onMemberSelect} items={members} onClose={handleCloseMemberModal} variable={'id'} /> ) : null}
        {collaborators !== null && collaborators.length > 0 ? ( <FilterModal visibility={collaboratorModalVisible} placeholder={"Select a Collaborator"} onItemSelect={onCollaboratorSelect} items={collaborators} onClose={handleCloseCollaboratorModal} variable={'description'} /> ) : null}
        {inscriptionCollaboratorStates !== null && inscriptionCollaboratorStates.length > 0 ? ( <FilterModal visibility={inscriptionCollaboratorStateModalVisible} placeholder={"Select a InscriptionCollaboratorState"} onItemSelect={onInscriptionCollaboratorStateSelect} items={inscriptionCollaboratorStates} onClose={handleCloseInscriptionCollaboratorStateModal} variable={'name'} /> ) : null}
        {packagings !== null && packagings.length > 0 ? ( <FilterModal visibility={packagingModalVisible} placeholder={"Select a Packaging"} onItemSelect={onPackagingSelect} items={packagings} onClose={handleClosePackagingModal} variable={'id'} /> ) : null}
        {inscriptionMembreStates !== null && inscriptionMembreStates.length > 0 ? ( <FilterModal visibility={inscriptionMembreStateModalVisible} placeholder={"Select a InscriptionMembreState"} onItemSelect={onInscriptionMembreStateSelect} items={inscriptionMembreStates} onClose={handleCloseInscriptionMembreStateModal} variable={'name'} /> ) : null}
        {inscriptionCollaboratorTypes !== null && inscriptionCollaboratorTypes.length > 0 ? ( <FilterModal visibility={inscriptionCollaboratorTypeModalVisible} placeholder={"Select a InscriptionCollaboratorType"} onItemSelect={onInscriptionCollaboratorTypeSelect} items={inscriptionCollaboratorTypes} onClose={handleCloseInscriptionCollaboratorTypeModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default InscriptionCollaboratorAdminCreate;


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
  