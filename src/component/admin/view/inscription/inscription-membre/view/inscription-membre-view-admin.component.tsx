import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InscriptionMembreDto}  from '../../../../../../controller/model/inscription/InscriptionMembre.model';

type InscriptionMembreViewScreenRouteProp = RouteProp<{ InscriptionMembreDetails: { inscriptionMembre : InscriptionMembreDto } }, 'InscriptionMembreDetails'>;

type Props = { route: InscriptionMembreViewScreenRouteProp; };

const InscriptionMembreAdminView: React.FC<Props> = ({ route }) => {

    const { inscriptionMembre } = route.params;
    const [isInscriptionMembreCollapsed, setIsInscriptionMembreCollapsed] = useState(false);



    const inscriptionMembreCollapsible = () => {
        setIsInscriptionMembreCollapsed(!isInscriptionMembreCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={inscriptionMembreCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription membre</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionMembreCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {inscriptionMembre.id}</Text>
                        <Text style={globalStyle.infos}>Inscription date: {inscriptionMembre.inscriptionDate}</Text>
                        <Text style={globalStyle.infos}>Member: {inscriptionMembre?.member?.id}</Text>
                        <Text style={globalStyle.infos}>Inscription membre state: {inscriptionMembre?.inscriptionMembreState?.name}</Text>
                        <Text style={globalStyle.infos}>Inscription collaborator: {inscriptionMembre?.inscriptionCollaborator?.id}</Text>
                        <Text style={globalStyle.infos}>Consumed entity: {inscriptionMembre.consumedEntity}</Text>
                        <Text style={globalStyle.infos}>Consumed projet: {inscriptionMembre.consumedProjet}</Text>
                        <Text style={globalStyle.infos}>Consumed attribut: {inscriptionMembre.consumedAttribut}</Text>
                        <Text style={globalStyle.infos}>Consumed indicator: {inscriptionMembre.consumedIndicator}</Text>
                        <Text style={globalStyle.infos}>Affected entity: {inscriptionMembre.affectedEntity}</Text>
                        <Text style={globalStyle.infos}>Affected projet: {inscriptionMembre.affectedProjet}</Text>
                        <Text style={globalStyle.infos}>Affected attribut: {inscriptionMembre.affectedAttribut}</Text>
                        <Text style={globalStyle.infos}>Affected indicator: {inscriptionMembre.affectedIndicator}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default InscriptionMembreAdminView;
