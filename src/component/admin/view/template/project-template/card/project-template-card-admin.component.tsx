import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from "../../../../../../shared/globalStyle";
import {truncateText} from "../../../../../../shared/utils";


const ProjectTemplateAdminCard = ({ code ,name ,yaml ,addingDate ,lastUpdateDate ,categoryProjectTemplateName ,projectTemplateTags ,domainTemplateName ,price ,memberName , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>
        <TouchableOpacity onPress={onDetails} style={globalStyle.card}>
            <ScrollView horizontal>
                <View style={globalStyle.contentContainer}>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Code: </Text>
                        <Text style={globalStyle.value}>{truncateText(code)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Name: </Text>
                        <Text style={globalStyle.value}>{truncateText(name)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Yaml: </Text>
                        <Text style={globalStyle.value}>{truncateText(yaml)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Adding date: </Text>
                        <Text style={globalStyle.value}>{truncateText(addingDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Last update date: </Text>
                        <Text style={globalStyle.value}>{truncateText(lastUpdateDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Category project template: </Text>
                        <Text style={globalStyle.value}>{truncateText(categoryProjectTemplateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Project template tags: </Text>
                        <Text style={globalStyle.value}>{truncateText(projectTemplateTags)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Domain template: </Text>
                        <Text style={globalStyle.value}>{truncateText(domainTemplateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Price: </Text>
                        <Text style={globalStyle.value}>{truncateText(price)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Member: </Text>
                        <Text style={globalStyle.value}>{truncateText(memberName)}</Text>
                    </View>

                </View>
    </ScrollView>
    <View style={globalStyle.buttonsContainer}>
        <TouchableOpacity onPress={onPressDelete} style={globalStyle.button}>
            <Ionicons name="trash" size={25} color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onUpdate} style={globalStyle.button}>
            <Ionicons name="create" size={25} color={'green'} />
        </TouchableOpacity>
    </View>
</TouchableOpacity>
</SafeAreaView>
);
};

export default ProjectTemplateAdminCard;
