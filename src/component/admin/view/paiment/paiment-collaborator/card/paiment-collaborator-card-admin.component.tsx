import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from "../../../../../../shared/globalStyle";
import {truncateText} from "../../../../../../shared/utils";


const PaimentCollaboratorAdminCard = ({ name ,description ,code ,couponDetailName ,amountToPaid ,total ,discount ,remaining ,paiementDate ,inscriptionCollaboratorName ,paimentCollaboratorStateName , onPressDelete, onUpdate, onDetails }) =>{

return (

    <SafeAreaView>
        <TouchableOpacity onPress={onDetails} style={globalStyle.card}>
            <ScrollView horizontal>
                <View style={globalStyle.contentContainer}>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Name: </Text>
                        <Text style={globalStyle.value}>{truncateText(name)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Description: </Text>
                        <Text style={globalStyle.value}>{truncateText(description)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Code: </Text>
                        <Text style={globalStyle.value}>{truncateText(code)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Coupon detail: </Text>
                        <Text style={globalStyle.value}>{truncateText(couponDetailName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Amount to paid: </Text>
                        <Text style={globalStyle.value}>{truncateText(amountToPaid)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Total: </Text>
                        <Text style={globalStyle.value}>{truncateText(total)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Discount: </Text>
                        <Text style={globalStyle.value}>{truncateText(discount)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Remaining: </Text>
                        <Text style={globalStyle.value}>{truncateText(remaining)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>Paiement date: </Text>
                        <Text style={globalStyle.value}>{truncateText(paiementDate)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Inscription collaborator: </Text>
                        <Text style={globalStyle.value}>{truncateText(inscriptionCollaboratorName)}</Text>
                    </View>
                    <View style={globalStyle.infos}>
                        <Text style={globalStyle.label}>- Paiment collaborator state: </Text>
                        <Text style={globalStyle.value}>{truncateText(paimentCollaboratorStateName)}</Text>
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

export default PaimentCollaboratorAdminCard;
