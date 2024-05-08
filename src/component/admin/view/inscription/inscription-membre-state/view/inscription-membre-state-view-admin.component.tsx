import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InscriptionMembreStateDto}  from '../../../../../../controller/model/inscription/InscriptionMembreState.model';

type InscriptionMembreStateViewScreenRouteProp = RouteProp<{ InscriptionMembreStateDetails: { inscriptionMembreState : InscriptionMembreStateDto } }, 'InscriptionMembreStateDetails'>;

type Props = { route: InscriptionMembreStateViewScreenRouteProp; };

const InscriptionMembreStateAdminView: React.FC<Props> = ({ route }) => {

    const { inscriptionMembreState } = route.params;
    const [isInscriptionMembreStateCollapsed, setIsInscriptionMembreStateCollapsed] = useState(false);



    const inscriptionMembreStateCollapsible = () => {
        setIsInscriptionMembreStateCollapsed(!isInscriptionMembreStateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={inscriptionMembreStateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription membre state</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionMembreStateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {inscriptionMembreState.id}</Text>
                        <Text style={globalStyle.infos}>Code: {inscriptionMembreState.code}</Text>
                        <Text style={globalStyle.infos}>Name: {inscriptionMembreState.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default InscriptionMembreStateAdminView;
