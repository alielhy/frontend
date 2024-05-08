import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InscriptionCollaboratorDto}  from '../../../../../../controller/model/inscription/InscriptionCollaborator.model';

type InscriptionCollaboratorViewScreenRouteProp = RouteProp<{ InscriptionCollaboratorDetails: { inscriptionCollaborator : InscriptionCollaboratorDto } }, 'InscriptionCollaboratorDetails'>;

type Props = { route: InscriptionCollaboratorViewScreenRouteProp; };

const InscriptionCollaboratorAdminView: React.FC<Props> = ({ route }) => {

    const { inscriptionCollaborator } = route.params;
    const [isInscriptionCollaboratorCollapsed, setIsInscriptionCollaboratorCollapsed] = useState(false);

    const [isInscriptionMembresCollapsed, setIsInscriptionMembresCollapsed] = useState(true);

    const inscriptionMembresCollapsible = () => {
        setIsInscriptionMembresCollapsed(!isInscriptionMembresCollapsed);
    };

    const inscriptionCollaboratorCollapsible = () => {
        setIsInscriptionCollaboratorCollapsed(!isInscriptionCollaboratorCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={inscriptionCollaboratorCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription collaborator</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionCollaboratorCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {inscriptionCollaborator.id}</Text>
                        <Text style={globalStyle.infos}>Start date: {inscriptionCollaborator.startDate}</Text>
                        <Text style={globalStyle.infos}>End date: {inscriptionCollaborator.endDate}</Text>
                        <Text style={globalStyle.infos}>Renew date: {inscriptionCollaborator.renewDate}</Text>
                        <Text style={globalStyle.infos}>Packaging: {inscriptionCollaborator?.packaging?.id}</Text>
                        <Text style={globalStyle.infos}>Consumed entity: {inscriptionCollaborator.consumedEntity}</Text>
                        <Text style={globalStyle.infos}>Consumed projet: {inscriptionCollaborator.consumedProjet}</Text>
                        <Text style={globalStyle.infos}>Consumed attribut: {inscriptionCollaborator.consumedAttribut}</Text>
                        <Text style={globalStyle.infos}>Consumed indicator: {inscriptionCollaborator.consumedIndicator}</Text>
                        <Text style={globalStyle.infos}>Collaborator: {inscriptionCollaborator?.collaborator?.description}</Text>
                        <Text style={globalStyle.infos}>Inscription collaborator state: {inscriptionCollaborator?.inscriptionCollaboratorState?.name}</Text>
                        <Text style={globalStyle.infos}>Inscription collaborator type: {inscriptionCollaborator?.inscriptionCollaboratorType?.name}</Text>

                    </View>

                </View>

            </Collapsible>

            <TouchableOpacity onPress={inscriptionMembresCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription membres</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionMembresCollapsed}>

                {inscriptionCollaborator.inscriptionMembres && inscriptionCollaborator.inscriptionMembres.length > 0 ? ( inscriptionCollaborator.inscriptionMembres.map((item, index) => (
                    <View key={index} style={globalStyle.itemCard}>
                        <View>
                            <Text style={globalStyle.infos}>Inscription date : {item.inscriptionDate}</Text>
                            <Text style={globalStyle.infos}>Member: {item?.member?.id}</Text>
                            <Text style={globalStyle.infos}>Inscription membre state: {item?.inscriptionMembreState?.name}</Text>
                            <Text style={globalStyle.infos}>Consumed entity : {item.consumedEntity}</Text>
                            <Text style={globalStyle.infos}>Consumed projet : {item.consumedProjet}</Text>
                            <Text style={globalStyle.infos}>Consumed attribut : {item.consumedAttribut}</Text>
                            <Text style={globalStyle.infos}>Consumed indicator : {item.consumedIndicator}</Text>
                            <Text style={globalStyle.infos}>Affected entity : {item.affectedEntity}</Text>
                            <Text style={globalStyle.infos}>Affected projet : {item.affectedProjet}</Text>
                            <Text style={globalStyle.infos}>Affected attribut : {item.affectedAttribut}</Text>
                            <Text style={globalStyle.infos}>Affected indicator : {item.affectedIndicator}</Text>

                        </View>
                    </View>
                    )) ) : (
                    <View style={globalStyle.itemCard}>
                        <Text style={globalStyle.infos}>No inscription membres</Text>
                    </View>
                )}

            </Collapsible>

        </ScrollView>

    </View>
);
};

export default InscriptionCollaboratorAdminView;
