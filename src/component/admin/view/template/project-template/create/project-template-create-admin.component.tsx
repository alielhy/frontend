import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';
import FilterModal from '../../../../../../zynerator/FilterModal';
import { Ionicons } from '@expo/vector-icons';

import {ProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/ProjectTemplateAdminService.service';
import  {ProjectTemplateDto}  from '../../../../../../controller/model/template/ProjectTemplate.model';

import {CategoryProjectTemplateDto} from '../../../../../../controller/model/template/CategoryProjectTemplate.model';
import {CategoryProjectTemplateAdminService} from '../../../../../../controller/service/admin/template/CategoryProjectTemplateAdminService.service';
import {DomainTemplateDto} from '../../../../../../controller/model/template/DomainTemplate.model';
import {DomainTemplateAdminService} from '../../../../../../controller/service/admin/template/DomainTemplateAdminService.service';
import {MemberDto} from '../../../../../../controller/model/collaborator/Member.model';
import {MemberAdminService} from '../../../../../../controller/service/admin/collaborator/MemberAdminService.service';

const ProjectTemplateAdminCreate = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isProjectTemplateCollapsed, setIsProjectTemplateCollapsed] = useState(true);


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


    const { control, handleSubmit, reset } = useForm<ProjectTemplateDto>({
        defaultValues: {
        code: '' ,
        name: '' ,
        yaml: '' ,
        categoryProjectTemplate: undefined,
        projectTemplateTags: '' ,
        domainTemplate: undefined,
        price: null ,
        member: undefined,
        },
    });

    const projectTemplateCollapsible = () => {
        setIsProjectTemplateCollapsed(!isProjectTemplateCollapsed);
    };

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




    const handleSave = async (item: ProjectTemplateDto) => {
        item.categoryProjectTemplate = selectedCategoryProjectTemplate;
        item.domainTemplate = selectedDomainTemplate;
        item.member = selectedMember;
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
            setSelectedCategoryProjectTemplate(emptyCategoryProjectTemplate);
            setSelectedDomainTemplate(emptyDomainTemplate);
            setSelectedMember(emptyMember);
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
        } catch (error) {
            console.error('Error saving projectTemplate:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={styles.safeAreaViewCreate} >
        <ScrollView style={styles.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={styles.textHeaderCreate} > Project Template</Text>

                            <CustomInput control={control} name={'code'} placeholder={'Code'} keyboardT="default" />
                            <CustomInput control={control} name={'name'} placeholder={'Name'} keyboardT="default" />
                            <CustomInput control={control} name={'yaml'} placeholder={'Yaml'} keyboardT="default" />
                            <CustomInput control={control} name={'addingDate'} placeholder={'Adding date'} keyboardT="numeric" />
                            <CustomInput control={control} name={'lastUpdateDate'} placeholder={'Last update date'} keyboardT="numeric" />
                        <TouchableOpacity onPress={() => setCategoryProjectTemplateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedCategoryProjectTemplate.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                            <CustomInput control={control} name={'projectTemplateTags'} placeholder={'Project template tags'} keyboardT="default" />
                        <TouchableOpacity onPress={() => setDomainTemplateModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedDomainTemplate.name}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMemberModalVisible(true)} style={styles.placeHolder} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>{selectedMember.id}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
            
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save"} bgColor={'#fcae1e'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        {domainTemplates !== null && domainTemplates.length > 0 ? ( <FilterModal visibility={domainTemplateModalVisible} placeholder={"Select a DomainTemplate"} onItemSelect={onDomainTemplateSelect} items={domainTemplates} onClose={handleCloseDomainTemplateModal} variable={'name'} /> ) : null}
        {members !== null && members.length > 0 ? ( <FilterModal visibility={memberModalVisible} placeholder={"Select a Member"} onItemSelect={onMemberSelect} items={members} onClose={handleCloseMemberModal} variable={'id'} /> ) : null}
        {categoryProjectTemplates !== null && categoryProjectTemplates.length > 0 ? ( <FilterModal visibility={categoryProjectTemplateModalVisible} placeholder={"Select a CategoryProjectTemplate"} onItemSelect={onCategoryProjectTemplateSelect} items={categoryProjectTemplates} onClose={handleCloseCategoryProjectTemplateModal} variable={'name'} /> ) : null}
    </SafeAreaView>
);
};
export default ProjectTemplateAdminCreate;


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