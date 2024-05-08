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

import {ProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/ProjectTemplateAdminService.service';
import  {ProjectTemplateDto}  from '../../../../../../controller/model/template/ProjectTemplate.model';

import {CategoryProjectTemplateDto} from '../../../../../../controller/model/template/CategoryProjectTemplate.model';
import {CategoryProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/CategoryProjectTemplateAdminService.service';
import {DomainTemplateDto} from '../../../../../../controller/model/template/DomainTemplate.model';
import {DomainTemplateAdminService} from '../../../../../../controller/service/admin/template/DomainTemplateAdminService.service';
import {MemberDto} from '../../../../../../controller/model/collaborator/Member.model';
import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';

type ProjectTemplateUpdateScreenRouteProp = RouteProp<{ ProjectTemplateUpdate: { projectTemplate: ProjectTemplateDto } }, 'ProjectTemplateUpdate'>;

type Props = { route: ProjectTemplateUpdateScreenRouteProp; };

const ProjectTemplateAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { projectTemplate } = route.params;
    const [showSavedModal, setShowSavedModal] = useState(false);

    const emptyDomainTemplate = new DomainTemplateDto();
    const [domainTemplates, setDomainTemplates] = useState<DomainTemplateDto[]>([]);
    const [domainTemplateModalVisible, setDomainTemplateModalVisible] = useState(false);
    const [selectedDomainTemplate, setSelectedDomainTemplate] = useState<DomainTemplateDto>(emptyDomainTemplate);

    const emptyMember = new MemberDto();
    const [members, setMembers] = useState<MemberDto[]>([]);
    const [memberModalVisible, setMemberModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberDto>(emptyMember);

    const emptyCategoryProjectTemplate = new CategoryProjectTemplateDto();
    const [categoryProjectTemplates, setCategoryProjectTemplates] = useState<CategoryProjectTemplateDto[]>([]);
    const [categoryProjectTemplateModalVisible, setCategoryProjectTemplateModalVisible] = useState(false);
    const [selectedCategoryProjectTemplate, setSelectedCategoryProjectTemplate] = useState<CategoryProjectTemplateDto>(emptyCategoryProjectTemplate);


    const service = new ProjectTemplateAdminService();
    const categoryProjectTemplateAdminService = new CategoryProjectTemplateAdminService();
    const domainTemplateAdminService = new DomainTemplateAdminService();
    const memberAdminService = new MemberAdminService();


    const { control, handleSubmit } = useForm<ProjectTemplateDto>({
        defaultValues: {
            id: projectTemplate.id ,
            code: projectTemplate.code ,
            name: projectTemplate.name ,
            yaml: projectTemplate.yaml ,
            addingDate: projectTemplate.addingDate ,
            lastUpdateDate: projectTemplate.lastUpdateDate ,
            projectTemplateTags: projectTemplate.projectTemplateTags ,
            price: projectTemplate.price ,
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
    const handleCloseMemberModal = () => {
        setMemberModalVisible(false);
    };

    const onMemberSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedMember(item);
        setMemberModalVisible(false);
    };
    const handleCloseCategoryProjectTemplateModal = () => {
        setCategoryProjectTemplateModalVisible(false);
    };

    const onCategoryProjectTemplateSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedCategoryProjectTemplate(item);
        setCategoryProjectTemplateModalVisible(false);
    };


    useEffect(() => {
        categoryProjectTemplateAdminService.getList().then(({data}) => setCategoryProjectTemplates(data)).catch(error => console.log(error));
        domainTemplateAdminService.getList().then(({data}) => setDomainTemplates(data)).catch(error => console.log(error));
        memberAdminService.getList().then(({data}) => setMembers(data)).catch(error => console.log(error));
    }, []);



    const handleUpdate = async (item: ProjectTemplateDto) => {
        item.categoryProjectTemplate = selectedCategoryProjectTemplate;
        item.domainTemplate = selectedDomainTemplate;
        item.member = selectedMember;
        Keyboard.dismiss();
        try {
            await service.update(item);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
            navigation.navigate('ProjectTemplate');
        } catch (error) {
            console.error('Error saving project template:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewEdit}>

        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <Text style={globalStyle.textHeaderEdit} >Update Project template</Text>

            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
            <CustomInput control={control} name={'yaml'} placeholder={'Yaml'} keyboardT="default" />
            <CustomInput control={control} name={'addingDate'} placeholder={'Adding date'} keyboardT="numeric" />
            <CustomInput control={control} name={'lastUpdateDate'} placeholder={'Last update date'} keyboardT="numeric" />

            <TouchableOpacity onPress={() => setCategoryProjectTemplateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedCategoryProjectTemplate?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>
            <CustomInput control={control} name={'projectTemplateTags'} placeholder={'Project template tags'} keyboardT="default" />

            <TouchableOpacity onPress={() => setDomainTemplateModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedDomainTemplate?.name}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMemberModalVisible(true)} style={styles.placeHolder} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>{selectedMember?.id}</Text>
                    <Ionicons name="caret-down-outline" size={22} color={'black'} />
                </View>

            </TouchableOpacity>

            <CustomButton onPress={handleSubmit(handleUpdate)} text={"Update Project template"} bgColor={'#ffa500'} fgColor={'white'} />

        </ScrollView>

        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on updating'} iconColor={'red'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'checkmark-done-sharp'} message={'updated with success'} iconColor={'#32cd32'} />
        {categoryProjectTemplates &&
            <FilterModal visibility={categoryProjectTemplateModalVisible} placeholder={"Select a CategoryProjectTemplate"} onItemSelect={onCategoryProjectTemplateSelect} items={categoryProjectTemplates} onClose={handleCloseCategoryProjectTemplateModal} variable={'name'} />
        }
        {domainTemplates &&
            <FilterModal visibility={domainTemplateModalVisible} placeholder={"Select a DomainTemplate"} onItemSelect={onDomainTemplateSelect} items={domainTemplates} onClose={handleCloseDomainTemplateModal} variable={'name'} />
        }
        {members &&
            <FilterModal visibility={memberModalVisible} placeholder={"Select a Member"} onItemSelect={onMemberSelect} items={members} onClose={handleCloseMemberModal} variable={'id'} />
        }

    </SafeAreaView>
);
};

export default ProjectTemplateAdminEdit;
