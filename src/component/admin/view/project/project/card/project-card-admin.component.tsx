import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from "../../../../../../shared/globalStyle";
import {truncateText} from "../../../../../../shared/utils";


const ProjectAdminCard = ({ code ,name ,generatedDate ,yaml ,projectStateName ,inscriptionMembreName ,projectTemplateName ,domainTemplateName , onPressDelete, onUpdate, onDetails }) =>{

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
                        <Text style={globalStyle.label}>Generated date: </Text>
                        <Text style={globalStyle.value}>{truncateText(generatedDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Yaml: </Text>
                        <Text style={globalStyle.value}>{truncateText(yaml)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Project state: </Text>
                        <Text style={globalStyle.value}>{truncateText(projectStateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription membre: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionMembreName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Project template: </Text>
                        <Text style={globalStyle.value}>{truncateText(projectTemplateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Domain template: </Text>
                        <Text style={globalStyle.value}>{truncateText(domainTemplateName)}</Text>
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

export default ProjectAdminCard;
