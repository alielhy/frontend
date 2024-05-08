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

type ProjectUpdateScreenRouteProp = RouteProp<{ ProjectUpdate: { project: ProjectDto } }, 'ProjectUpdate'>;

type Props = { route: ProjectUpdateScreenRouteProp; };

const ProjectAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { project } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

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


    const { control, handleSubmit } = useForm<ProjectDto>({
        defaultValues: {
            id: project.id ,
            code: project.code ,
            name: project.name ,
            generatedDate: project.generatedDate ,
            yaml: project.yaml ,
        },
    });



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



    const handleUpdate = async (item: ProjectDto) => {
        item.projectState = selectedProjectState;
        item.inscriptionMembre = selectedInscriptionMembre;
        item.projectTemplate = selectedProjectTemplate;
        item.domainTemplate = selectedDomainTemplate;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('Project');
        } catch (error) {
            console.error('Error saving project:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Project</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
            <CustomInput control={control} name={'generatedDate'} placeholder={'Generated date'} keyboardT="numeric" />
            <CustomInput control={control} name={'yaml'} placeholder={'Yaml'} keyboardT="default" />

            <TouchableOpacity onPress={() => setProjectStateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedProjectState?.code}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInscriptionMembreModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedInscriptionMembre?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setProjectTemplateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedProjectTemplate?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDomainTemplateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedDomainTemplate?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Project"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {projectStates &&
            <FilterModal visibility={projectStateModalVisible} placeholder={"Select a ProjectState"} onItemSelect={onProjectStateSelect} items={projectStates} onClose={handleCloseProjectStateModal} variable={'code'} />
        }
        {inscriptionMembres &&
            <FilterModal visibility={inscriptionMembreModalVisible} placeholder={"Select a InscriptionMembre"} onItemSelect={onInscriptionMembreSelect} items={inscriptionMembres} onClose={handleCloseInscriptionMembreModal} variable={'id'} />
        }
        {projectTemplates &&
            <FilterModal visibility={projectTemplateModalVisible} placeholder={"Select a ProjectTemplate"} onItemSelect={onProjectTemplateSelect} items={projectTemplates} onClose={handleCloseProjectTemplateModal} variable={'name'} />
        }
        {domainTemplates &&
            <FilterModal visibility={domainTemplateModalVisible} placeholder={"Select a DomainTemplate"} onItemSelect={onDomainTemplateSelect} items={domainTemplates} onClose={handleCloseDomainTemplateModal} variable={'name'} />
        }

    </SafeAreaView>
);
};

export default ProjectAdminEdit;
