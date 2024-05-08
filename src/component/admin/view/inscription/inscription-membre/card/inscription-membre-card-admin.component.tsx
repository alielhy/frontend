import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from "../../../../../../shared/globalStyle";
import {truncateText} from "../../../../../../shared/utils";


const InscriptionMembreAdminCard = ({ inscriptionDate ,memberName ,inscriptionMembreStateName ,inscriptionCollaboratorName ,consumedEntity ,consumedProjet ,consumedAttribut ,consumedIndicator ,affectedEntity ,affectedProjet ,affectedAttribut ,affectedIndicator , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>
        <TouchableOpacity onPress={onDetails} style={globalStyle.card}>
            <ScrollView horizontal>
                <View style={globalStyle.contentContainer}>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Inscription date: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Member: </Text>
                        <Text style={globalStyle.value}>{truncateText(memberName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription membre state: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionMembreStateName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription collaborator: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionCollaboratorName)}</Text>
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
                        <Text style={globalStyle.label}>Affected entity: </Text>
                        <Text style={globalStyle.value}>{truncateText(affectedEntity)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Affected projet: </Text>
                        <Text style={globalStyle.value}>{truncateText(affectedProjet)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Affected attribut: </Text>
                        <Text style={globalStyle.value}>{truncateText(affectedAttribut)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Affected indicator: </Text>
                        <Text style={globalStyle.value}>{truncateText(affectedIndicator)}</Text>
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

export default InscriptionMembreAdminCard;
