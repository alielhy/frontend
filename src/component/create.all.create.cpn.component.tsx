import {Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import Collapsible from 'react-native-collapsible';


import {${pojo.name}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${pojo.subModule.folder}/${pojo.name}${role.name?cap_first}Service.service';
import  {${pojo.name?cap_first}Dto}  from '../../../../../../controller/model/${pojo.subModule.folder}/${pojo.name?cap_first}.model';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name?cap_first}Dto} from '../../../../../../controller/model/${dependency.subModule.folder}/${dependency.name?cap_first}.model';
import {${dependency.name?cap_first}${role.name?cap_first}Service} from '../../../../../../controller/service/${role.name}/${dependency.subModule.folder}/${dependency.name?cap_first}${role.name?cap_first}Service.service';
import {globalStyle} from "../../Downloads/frontend/src/shared/globalStyle";

</#if>
    </#list>
</#if>

const ${pojo.name}${role.name?cap_first}Create = () => {

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [is${pojo.name}Collapsed, setIs${pojo.name}Collapsed] = useState(true);


    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const empty${fieldGeneric.name?cap_first} = new ${fieldGeneric.typeAsPojo.name}Dto();
    const [${fieldGeneric.name}s, set${fieldGeneric.name?cap_first}s] = useState<${fieldGeneric.typeAsPojo.name}Dto[]>([]);
    const [${fieldGeneric.name}ModalVisible, set${fieldGeneric.name?cap_first}ModalVisible] = useState(false);
    const [selected${fieldGeneric.name?cap_first}, setSelected${fieldGeneric.name?cap_first}] = useState<${fieldGeneric.name?cap_first}Dto>(empty${fieldGeneric.name?cap_first});

    </#list>

    const service = new ${pojo.name}${role.name?cap_first}Service();
    <#if  pojo.dependencies??>
        <#list pojo.dependencies as dependency>
            <#if dependency?? && dependency.name??>
    const ${dependency.name?uncap_first}${role.name?cap_first}Service = new ${dependency.name}${role.name?cap_first}Service();
            </#if>
        </#list>
    </#if>

      <#list pojo.fields as field>
        <#if field.list && !field.association>
    const [${field.name?uncap_first}Elements, set${field.name?cap_first}Elements] = useState<${field.typeAsPojo.name}Dto[]>([]);
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto>(new ${field.typeAsPojo.name}Dto());
    const [isEditMode${field.name?cap_first}, setIsEditMode${field.name?cap_first}] = useState(false);
    const [editIndex${field.name?cap_first}, setEditIndex${field.name?cap_first}] = useState(null);

    const [is${field.name?cap_first}ElementCollapsed, setIs${field.name?cap_first}ElementCollapsed] = useState(true);
    const [is${field.name?cap_first}ElementsCollapsed, setIs${field.name?cap_first}ElementsCollapsed] = useState(true);
    const [is${field.name?cap_first}, setIs${field.name?cap_first}] = useState(false);
    const [isEdit${field.name?cap_first}Mode, setIsEdit${field.name?cap_first}Mode] = useState(false);

        <#elseif field.list && field.association>
    const [${field.name?uncap_first}, set${field.name?cap_first}] = useState<${field.typeAsPojo.name}Dto[]>(new Array<${field.typeAsPojo.name}Dto>());
            </#if>
      </#list>

    const { control, handleSubmit, reset } = useForm<${pojo.name}Dto>({
        defaultValues: {
    <#list pojo.fields as field>
        <#if field.generic>
        ${field.name}: undefined,
        <#elseif field.simple && !field.id>
            <#if field.large>
        ${field.name}: '' ,
            <#elseif field.pureString>
        ${field.name}: '' ,
            <#elseif field.nombre>
        ${field.name}: null ,
             </#if>
        </#if>
    </#list>
        },
    });

    const ${pojo.name?uncap_first}Collapsible = () => {
        setIs${pojo.name}Collapsed(!is${pojo.name}Collapsed);
    };

    <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
    const handleClose${fieldGeneric.name?cap_first}Modal = () => {
        set${fieldGeneric.name?cap_first}ModalVisible(false);
    };

    const on${fieldGeneric.name?cap_first}Select = (item) => {
        console.log('Selected Item:', item);
        setSelected${fieldGeneric.name?cap_first}(item);
        set${fieldGeneric.name?cap_first}ModalVisible(false);
    };
    </#list>


    useEffect(() => {
    <#list pojo.fieldsGeneric as fieldGeneric>
        ${fieldGeneric.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
    </#list>
    <#list pojo.fields as field>
        <#if field.list>
            <#if field.association>
        ${field.fieldOfAssociation.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => {
            const ${field.name?cap_first} = data?.map(prepare${field.typeAsPojo.name})
            set${field.name?cap_first}(${field.name})
        })
            </#if>

            <#list field.typeAsPojo.fieldsGeneric as fieldGeneric>
                <#if fieldGeneric.typeAsPojo.name != pojo.name && !field.association>
        ${fieldGeneric.typeAsPojo.name?uncap_first}${role.name?cap_first}Service.getList().then(({data}) => set${fieldGeneric.name?cap_first}s(data)).catch(error => console.log(error));
                </#if>
            </#list>
        </#if>
    </#list>
    }, []);

    <#list pojo.fields as field>
        <#if field.list && field.association>
    const prepare${field.typeAsPojo.name?cap_first} = (${field.fieldOfAssociation.typeAsPojo.name?uncap_first}: ${field.fieldOfAssociation.typeAsPojo.name}Dto) => {
        const ${field.typeAsPojo.name?uncap_first} = new ${field.typeAsPojo.name?cap_first}Dto();
        ${field.typeAsPojo.name?uncap_first}.${field.fieldOfAssociation.name?uncap_first} = ${field.fieldOfAssociation.typeAsPojo.name?uncap_first};
        return ${field.typeAsPojo.name?uncap_first};
    }
        <#elseif field.list && (field.associationComplex || field.fakeAssociation)>
            <#list field.typeAsPojo.fields as innerField>
                <#if innerField.list && innerField.association>
    const prepare${innerField.typeAsPojo.name?cap_first} =  (${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first}: ${innerField.fieldOfAssociation.typeAsPojo.name}Dto) => {
        ${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first}s.forEach(e => {
        const ${innerField.typeAsPojo.name?uncap_first} = new ${innerField.typeAsPojo.name?cap_first}Dto();
        ${innerField.typeAsPojo.name?uncap_first}.${innerField.fieldOfAssociation.name?uncap_first} = ${innerField.fieldOfAssociation.typeAsPojo.name?uncap_first};
        return ${innerField.typeAsPojo.name?uncap_first};
    }
                </#if>
            </#list>
        </#if>
    </#list>

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<${field.typeAsPojo.name}Dto>({
        defaultValues: {
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic>
            ${innerField.name}: undefined,
        <#elseif innerField.simple && !innerField.id>
            <#if innerField.large || innerField.pureString>
            ${innerField.name}: '' ,
            <#elseif innerField.nombre>
            ${innerField.name}: null ,
            </#if>
        </#if>
    </#list>
        },
    });

    <#list pojo.fields as field>
        <#if field.list && !field.association>
    const ${field.name}ElementCollapsible = () => {
        setIs${field.name?cap_first}ElementCollapsed(!is${field.name?cap_first}ElementCollapsed);
    };

    const ${field.name}ElementsCollapsible = () => {
        setIs${field.name?cap_first}ElementsCollapsed(!is${field.name?cap_first}ElementsCollapsed);
    };

        </#if>
    </#list>
    const handleAdd${field.name?cap_first} = (data: ${field.typeAsPojo.name}Dto) => {
        if (data) {
            const new${field.typeAsPojo.name}: ${field.typeAsPojo.name}Dto = { <#list field.typeAsPojo.fields as innerField><#if innerField.generic && innerField.typeAsPojo.name == pojo.name >${innerField.name}: undefined ,<#elseif innerField.generic && innerField.name != pojo.name?uncap_first>${innerField.name}: selected${innerField.name?cap_first}, <#elseif innerField.simple && innerField.id>${innerField.name}: null  , <#elseif innerField.simple && !innerField.id>${innerField.name}: data.${innerField.name} ,</#if></#list> };
            set${field.name?cap_first}Elements((prevItems) => [...prevItems, new${field.typeAsPojo.name}]);
            resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id><#if innerField.large || innerField.pureString>${innerField.name}: '' ,<#elseif innerField.nombre>${innerField.name}: null ,</#if></#if></#list>});
        <#list field.typeAsPojo.fields as innerField>
            <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                setSelected${innerField.name?cap_first}(empty${innerField.name?cap_first});
            </#if>
        </#list>
        }
    };

    const handleDelete${field.name?cap_first} = (index) => {
        const updatedItems = ${field.name}Elements.filter((item, i) => i !== index);
        set${field.name?cap_first}Elements(updatedItems);
    };

    const handleUpdate${field.name?cap_first} = (data: ${field.typeAsPojo.name?cap_first}Dto) => {
        if (data) {
            ${field.name}Elements.map((item, i) => {
                if (i === editIndex${field.name?cap_first}) {
                    <#list field.typeAsPojo.fields as innerField>
                        <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                    ${innerField.name}: undefined ;
                    item.${innerField.name} = selected${innerField.name?cap_first};
                        <#elseif innerField.simple && !innerField.id>
                    item.${innerField.name} = data.${innerField.name};
                        </#if>
                    </#list>
                }
            });
            resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id><#if innerField.large || innerField.pureString>${innerField.name}: '' ,<#elseif innerField.nombre>${innerField.name}: null ,</#if></#if></#list>});
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
            setSelected${innerField.name?cap_first}(empty${innerField.name?cap_first});
        </#if>
    </#list>
            setIsEditMode${field.name?cap_first}(false);
        }
        setIs${field.name?cap_first}ElementCollapsed(!is${field.name?cap_first}ElementCollapsed);
        setIs${field.name?cap_first}ElementsCollapsed(!is${field.name?cap_first}ElementsCollapsed);
    }

    const updateFormDefaultValues${field.name?cap_first} = (index: number) => {
        let updated${field.typeAsPojo.name?cap_first}: ${field.typeAsPojo.name?cap_first}Dto;
        setEditIndex${field.name?cap_first}(index);
        setIsEditMode${field.name?cap_first}(true);
        ${field.name}Elements.map((item, i) => {
            if (i === index) {
                updated${field.typeAsPojo.name?cap_first} = item;
            }
        });
        resetItem({<#list field.typeAsPojo.fields as innerField><#if innerField.simple && !innerField.id>${innerField.name}: updated${field.typeAsPojo.name?cap_first}.${innerField.name} ,</#if></#list>});
    <#list field.typeAsPojo.fields as innerField>
        <#if innerField.generic  && innerField.typeAsPojo.name != pojo.name>
        setSelected${innerField.name?cap_first}(updated${field.typeAsPojo.name?cap_first}.${innerField.name});
        </#if>
    </#list>
        setIs${field.name?cap_first}ElementCollapsed(!is${field.name?cap_first}ElementCollapsed);
        setIs${field.name?cap_first}ElementsCollapsed(!is${field.name?cap_first}ElementsCollapsed);
    };
        </#if>
    </#list>


    const handleSave = async (item: ${pojo.name}Dto) => {
    <#list pojo.fields as field>
        <#if field.list && !field.association>
        item.${field.name} = ${field.name}Elements;
        <#elseif field.generic>
        item.${field.name} = selected${field.name?cap_first};
        </#if>
    </#list>
        Keyboard.dismiss();
        try {
            await service.save( item );
            reset();
    <#list pojo.fields as field>
        <#if field.generic>
            setSelected${field.name?cap_first}(empty${field.typeAsPojo.name?cap_first});
        </#if>
    </#list>
            setShowSavedModal(true);
            setTimeout(() => setShowSavedModal(false), 1500);
    <#list pojo.fields as field>
        <#if field.list && !field.association>
            item.${field.name} = ${field.name}Elements;
            set${field.name?cap_first}Elements([]);
        </#if>
    </#list>
        } catch (error) {
            console.error('Error saving ${pojo.name?uncap_first}:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };

return(
    <SafeAreaView style={globalStyle.safeAreaViewCreate} >
        <ScrollView style={globalStyle.scrolllViewCreate} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
            <Text style={globalStyle.textHeaderCreate} >Create ${pojo.name}</Text>

            <TouchableOpacity onPress={${pojo.name?uncap_first}Collapsible} style={globalStyle.touchableOpacityCreate}>
                <Text style={globalStyle.touchableOpacityButtonCreate}>${pojo.name}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${pojo.name}Collapsed}>
                <#list pojo.fields as field>
                    <#if field.simple && !field.notVisibleInCreatePage>
                        <#if  field.large>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
                        <#elseif field.pureString>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="default" />
                        <#elseif field.nombre == false>
                            <CustomInput control={control} name={'${field.name}'} placeholder={'${field.formatedName?cap_first}'} keyboardT="numeric" />
                        </#if>
                    <#elseif field.generic && !field.notVisibleInCreatePage && field.typeAsPojo.name != pojo.name>
                        <TouchableOpacity onPress={() => set${field.name?cap_first}ModalVisible(true)} style={globalStyle.placeHolder} >
                            <View style={globalStyle.viewCreate}>
                                <Text>{selected${field.name?cap_first}.<#if field.typeAsPojo??>${field.typeAsPojo.labelOrReferenceOrId.name}<#else>${field.name}</#if>}</Text>
                                <Ionicons name="caret-down-outline" size={22} color={'black'} />
                            </View>
                        </TouchableOpacity>
                    </#if>
                </#list>
            </Collapsible>
            <#list pojo.fields as field>
            <#if  field.list && !field.association>
            <TouchableOpacity onPress={${field.name}ElementCollapsible} style={globalStyle.touchableOpacityYellow}>
                <Text style={globalStyle.touchableOpacityButtonCreate}>Add ${field.formatedName}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={is${field.name?cap_first}ElementCollapsed}>
                <#list field.typeAsPojo.fields as innerField>
                    <#if innerField.generic && innerField.typeAsPojo.name != pojo.name>
                <TouchableOpacity onPress={() => set${innerField.name?cap_first}ModalVisible(true)} style={globalStyle.placeHolder} >
                    <View style={globalStyle.viewCreate}>
                        <Text>{selected${innerField.name?cap_first}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>
                    </#if>
                    <#if innerField.simple && !innerField.id>
                        <#if innerField.large>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="default" />
                        <#elseif innerField.pureString>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="default" />
                        <#elseif innerField.nombre>
                            <CustomInput control={itemControl} name={'${innerField.name}'} placeholder={'${innerField.formatedName}'} keyboardT="numeric" />
                        </#if>
                    </#if>
                 </#list>
                <TouchableOpacity onPress={ isEdit${field.name?cap_first}Mode ? handleItemSubmit((data) => { handleUpdate${field.name?cap_first}(data); }) : handleItemSubmit(handleAdd${field.name?cap_first}) } style={globalStyle.touchableOpacityGreen} >
                    <Text style={globalStyle.touchableOpacityButtonCreate}>
                    {isEditMode${field.name?cap_first} ? <Ionicons name="pencil-outline" size={25} color={'blue'} /> : '+' }
                    </Text>
                </TouchableOpacity>

            </Collapsible>
            <TouchableOpacity onPress={${field.name}ElementsCollapsible} style={globalStyle.touchableOpacityYellow}>
                <Text style={globalStyle.touchableOpacityButtonCreate}>List ${field.formatedName}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={is${field.name?cap_first}ElementsCollapsed}>
                { ${field.name} && ${field.name}Elements.length > 0 ? ( ${field.name}Elements.map((item, index) => (
                    <View key={index} style={globalStyle.itemCard}>
                        <View>
                             <#list field.typeAsPojo.fields as innerField>
                                 <#if innerField.simple && !innerField.id>
                            <Text style={globalStyle.infos}>'${innerField.formatedName}: {item.${innerField.name}}</Text>
                                 <#elseif innerField.generic && innerField.typeAsPojo.name != pojo.name>
                            <Text style={globalStyle.infos}>'${innerField.formatedName}: {item.${innerField.name}.${innerField.typeAsPojo.labelOrReferenceOrId.name}}</Text>
                                 </#if>
                            </#list>
                        </View>
                        <View style={globalStyle.viewIcon}>
                            <TouchableOpacity onPress={() => handleDelete${field.name?cap_first}(index)}>
                                <Ionicons name="trash-outline" size={22} color={'red'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => updateFormDefaultValues${field.name?cap_first}(index)}>
                                <Ionicons name="pencil-outline" size={22} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )) ) : (
                    <View style={globalStyle.itemCard}>
                        <Text style={globalStyle.infos}>No ${field.formatedName?uncap_first} yet.</Text>
                    </View>
                )}
            </Collapsible>
            </#if>
            </#list>
        <CustomButton onPress={handleSubmit(handleSave)} text={"Save ${pojo.name}"} bgColor={'#000080'} fgColor={'white'} />
        </ScrollView>
        <SaveFeedbackModal isVisible={showSavedModal} icon={'checkmark-done-sharp'} message={'saved successfully'} iconColor={'#32cd32'} />
        <SaveFeedbackModal isVisible={showErrorModal} icon={'close-sharp'} message={'Error on saving'} iconColor={'red'} />
        <#list pojo.fieldsGenericIncludingInnerTypeInListField as fieldGeneric>
        {${fieldGeneric.name}s !== null && ${fieldGeneric.name}s.length > 0 ? ( <FilterModal visibility={${fieldGeneric.name}ModalVisible} placeholder={"Select a ${fieldGeneric.name?cap_first}"} onItemSelect={on${fieldGeneric.name?cap_first}Select} items={${fieldGeneric.name}s} onClose={handleClose${fieldGeneric.name?cap_first}Modal} variable={'${fieldGeneric.typeAsPojo.labelOrReferenceOrId.name}'} /> ) : null}
        </#list>
    </SafeAreaView>
);
};
export default ${pojo.name}${role.name?cap_first}Create;
