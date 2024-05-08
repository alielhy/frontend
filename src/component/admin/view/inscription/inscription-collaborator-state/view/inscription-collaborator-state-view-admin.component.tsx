import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InscriptionCollaboratorStateDto}  from '../../../../../../controller/model/inscription/InscriptionCollaboratorState.model';

type InscriptionCollaboratorStateViewScreenRouteProp = RouteProp<{ InscriptionCollaboratorStateDetails: { inscriptionCollaboratorState : InscriptionCollaboratorStateDto } }, 'InscriptionCollaboratorStateDetails'>;

type Props = { route: InscriptionCollaboratorStateViewScreenRouteProp; };

const InscriptionCollaboratorStateAdminView: React.FC<Props> = ({ route }) => {

    const { inscriptionCollaboratorState } = route.params;
    const [isInscriptionCollaboratorStateCollapsed, setIsInscriptionCollaboratorStateCollapsed] = useState(false);



    const inscriptionCollaboratorStateCollapsible = () => {
        setIsInscriptionCollaboratorStateCollapsed(!isInscriptionCollaboratorStateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={inscriptionCollaboratorStateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription collaborator state</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionCollaboratorStateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {inscriptionCollaboratorState.id}</Text>
                        <Text style={globalStyle.infos}>Code: {inscriptionCollaboratorState.code}</Text>
                        <Text style={globalStyle.infos}>Name: {inscriptionCollaboratorState.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default InscriptionCollaboratorStateAdminView;
