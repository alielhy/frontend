import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from "../../../../../../shared/globalStyle";
import {truncateText} from "../../../../../../shared/utils";


const InscriptionCollaboratorAdminCard = ({ startDate ,endDate ,renewDate ,packagingName ,consumedEntity ,consumedProjet ,consumedAttribut ,consumedIndicator ,collaboratorName ,inscriptionCollaboratorStateName ,inscriptionCollaboratorTypeName , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>
        <TouchableOpacity onPress={onDetails} style={globalStyle.card}>
            <ScrollView horizontal>
                <View style={globalStyle.contentContainer}>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Start date: </Text>
                        <Text style={globalStyle.value}>{truncateText(startDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>End date: </Text>
                        <Text style={globalStyle.value}>{truncateText(endDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Renew date: </Text>
                        <Text style={globalStyle.value}>{truncateText(renewDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Packaging: </Text>
                        <Text style={globalStyle.value}>{truncateText(packagingName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Consumed entity: </Text>
                        <Text style={globalStyle.value}>{truncateText(consumedEntity)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Consumed projet: </Text>
                        <Text style={globalStyle.value}>{truncateText(consumedProjet)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Consumed attribut: </Text>
                        <Text style={globalStyle.value}>{truncateText(consumedAttribut)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Consumed indicator: </Text>
                        <Text style={globalStyle.value}>{truncateText(consumedIndicator)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Collaborator: </Text>
                        <Text style={globalStyle.value}>{truncateText(collaboratorName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription collaborator state: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionCollaboratorStateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription collaborator type: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionCollaboratorTypeName)}</Text>
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

export default InscriptionCollaboratorAdminCard;
