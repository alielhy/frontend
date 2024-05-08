import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton2 from '../../../../../../zynerator/CustomButton2';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';


import {ProjectAdminService} from '../../../../../../controller/service/admin/project/ProjectAdminService.service';
import  {ProjectDto}  from '../../../../../../controller/model/project/Project.model';

import {InscriptionMembreDto} from '../../../../../../controller/model/inscription/InscriptionMembre.model';
import {InscriptionMembreAdminService} from '../../../../../../controller/service/admin/inscription/InscriptionMembreAdminService.service';
import {ProjectStateDto} from '../../../../../../controller/model/project/ProjectState.model';
import {ProjectStateAdminService} from '../../../../../../controller/service/admin/project/ProjectStateAdminService.service';
import {DomainTemplateDto} from '../../../../../../controller/model/template/DomainTemplate.model';
import {DomainTemplateAdminService} from '../../../../../../controller/service/admin/template/DomainTemplateAdminService.service';
import {ProjectTemplateDto} from '../../../../../../controller/model/template/ProjectTemplate.model';
import {ProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/ProjectTemplateAdminService.service';

const ProjectAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isProjectCollapsed, setIsProjectCollapsed] = useState(true);


    const emptyDomainTemplate = new DomainTemplateDto();
    const [domainTemplates, setDomainTemplates] = useState<DomainTemplateDto[]>([]);
    const [domainTemplateModalVisible, setDomainTemplateModalVisible] = useState(false);
    const [selectedDomainTemplate, setSelectedDomainTemplate] = useState<DomainTemplateDto>(emptyDomainTemplate);

    const emptyInscriptionMembre = new InscriptionMembreDto();
    const [inscriptionMembres, setInscriptionMembres] = useState<InscriptionMembreDto[]>([]);
    const [inscriptionMembreModalVisible, setInscriptionMembreModalVisible] = useState(false);
    const [selectedInscriptionMembre, setSelectedInscriptionMembre] = useState<InscriptionMembreDto>(emptyInscriptionMembre);

    const emptyProjectState = new ProjectStateDto();
    const [projectStates, setProjectStates] = useState<ProjectStateDto[]>([]);
    const [projectStateModalVisible, setProjectStateModalVisible] = useState(false);
    const [selectedProjectState, setSelectedProjectState] = useState<ProjectStateDto>(emptyProjectState);

    const emptyProjectTemplate = new ProjectTemplateDto();
    const [projectTemplates, setProjectTemplates] = useState<ProjectTemplateDto[]>([]);
    const [projectTemplateModalVisible, setProjectTemplateModalVisible] = useState(false);
    const [selectedProjectTemplate, setSelectedProjectTemplate] = useState<ProjectTemplateDto>(emptyProjectTemplate);


    const service = new ProjectAdminService();
    const inscriptionMembreAdminService = new InscriptionMembreAdminService();
    const projectStateAdminService = new ProjectStateAdminService();
    const domainTemplateAdminService = new DomainTemplateAdminService();
    const projectTemplateAdminService = new ProjectTemplateAdminService();


    const { control, handleSubmit, reset } = useForm<ProjectDto>({
        defaultValues: {
        code: '' ,
        name: '' ,
        yaml: '' ,
        projectState: undefined,
        inscriptionMembre: undefined,
        projectTemplate: undefined,
        domainTemplate: undefined,
        },
    });

    const projectCollapsible = () => {
        setIsProjectCollapsed(!isProjectCollapsed);
    };

    const handleCloseDomainTemplateModal = () => {
        setDomainTemplateModalVisible(false);
    };

    const onDomainTemplateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedDomainTemplate(item);
        setDomainTemplateModalVisible(false);
    };
    const handleCloseInscriptionMembreModal = () => {
        setInscriptionMembreModalVisible(false);
    };

    const onInscriptionMembreSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedInscriptionMembre(item);
        setInscriptionMembreModalVisible(false);
    };
    const handleCloseProjectStateModal = () => {
        setProjectStateModalVisible(false);
    };

    const onProjectStateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedProjectState(item);
        setProjectStateModalVisible(false);
    };
    const handleCloseProjectTemplateModal = () => {
        setProjectTemplateModalVisible(false);
    };

    const onProjectTemplateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedProjectTemplate(item);
        setProjectTemplateModalVisible(false);
    };


    useEffect(() => {
        projectStateAdminService.getList().then(({data}) => setProjectStates(data)).catch(error => console.log(error));
        inscriptionMembreAdminService.getList().then(({data}) => setInscriptionMembres(data)).catch(error => console.log(error));
        projectTemplateAdminService.getList().then(({data}) => setProjectTemplates(data)).catch(error => console.log(error));
        domainTemplateAdminService.getList().then(({data}) => setDomainTemplates(data)).catch(error => console.log(error));
    }, []);




    const handleSave = async (item: ProjectDto) => {
        item.projectState = selectedProjectState;
        item.inscriptionMembre = selectedInscriptionMembre;
        item.projectTemplate = selectedProjectTemplate;
        item.domainTemplate = selectedDomainTemplate;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedProjectState(emptyProjectState);
            setSelectedInscriptionMembre(emptyInscriptionMembre);
            setSelectedProjectTemplate(emptyProjectTemplate);
            setSelectedDomainTemplate(emptyDomainTemplate);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving project:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Project</Text>

                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                            <CustomInput control={control} name={'generatedDate'} placeholder={'Generated date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'yaml'} placeholder={'Yaml'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setProjectStateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedProjectState.code}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setInscriptionMembreModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedInscriptionMembre.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setProjectTemplateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedProjectTemplate.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDomainTemplateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDomainTemplate.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
        <CustomButton2 onPress={handleSubmit(handleSave)} text={"Generate"} bgColor={'#d32f2f'} fgColor={'white'} />
    
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {domainTemplates !== null && domainTemplates.length > 0 ? ( <FilterModal visibility={domainTemplateModalVisible} placeholder={"Select a DomainTemplate"} onItemSelect={onDomainTemplateSelect} items={domainTemplates} onClose={handleCloseDomainTemplateModal} variable={'name'} /> ) : null}
        {inscriptionMembres !== null && inscriptionMembres.length > 0 ? ( <FilterModal visibility={inscriptionMembreModalVisible} placeholder={"Select a InscriptionMembre"} onItemSelect={onInscriptionMembreSelect} items={inscriptionMembres} onClose={handleCloseInscriptionMembreModal} variable={'id'} /> ) : null}
        {projectStates !== null && projectStates.length > 0 ? ( <FilterModal visibility={projectStateModalVisible} placeholder={"Select a ProjectState"} onItemSelect={onProjectStateSelect} items={projectStates} onClose={handleCloseProjectStateModal} variable={'code'} /> ) : null}
        {projectTemplates !== null && projectTemplates.length > 0 ? ( <FilterModal visibility={projectTemplateModalVisible} placeholder={"Select a ProjectTemplate"} onItemSelect={onProjectTemplateSelect} items={projectTemplates} onClose={handleCloseProjectTemplateModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default ProjectAdminCreate;

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