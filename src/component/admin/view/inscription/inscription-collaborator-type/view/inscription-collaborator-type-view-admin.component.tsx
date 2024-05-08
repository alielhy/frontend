import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InscriptionCollaboratorTypeDto}  from '../../../../../../controller/model/inscription/InscriptionCollaboratorType.model';

type InscriptionCollaboratorTypeViewScreenRouteProp = RouteProp<{ InscriptionCollaboratorTypeDetails: { inscriptionCollaboratorType : InscriptionCollaboratorTypeDto } }, 'InscriptionCollaboratorTypeDetails'>;

type Props = { route: InscriptionCollaboratorTypeViewScreenRouteProp; };

const InscriptionCollaboratorTypeAdminView: React.FC<Props> = ({ route }) => {

    const { inscriptionCollaboratorType } = route.params;
    const [isInscriptionCollaboratorTypeCollapsed, setIsInscriptionCollaboratorTypeCollapsed] = useState(false);



    const inscriptionCollaboratorTypeCollapsible = () => {
        setIsInscriptionCollaboratorTypeCollapsed(!isInscriptionCollaboratorTypeCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={inscriptionCollaboratorTypeCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Inscription collaborator type</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInscriptionCollaboratorTypeCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {inscriptionCollaboratorType.id}</Text>
                        <Text style={globalStyle.infos}>Code: {inscriptionCollaboratorType.code}</Text>
                        <Text style={globalStyle.infos}>Name: {inscriptionCollaboratorType.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default InscriptionCollaboratorTypeAdminView;
