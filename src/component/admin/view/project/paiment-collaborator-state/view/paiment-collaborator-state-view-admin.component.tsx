import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {PaimentCollaboratorStateDto}  from '../../../../../../controller/model/project/PaimentCollaboratorState.model';

type PaimentCollaboratorStateViewScreenRouteProp = RouteProp<{ PaimentCollaboratorStateDetails: { paimentCollaboratorState : PaimentCollaboratorStateDto } }, 'PaimentCollaboratorStateDetails'>;

type Props = { route: PaimentCollaboratorStateViewScreenRouteProp; };

const PaimentCollaboratorStateAdminView: React.FC<Props> = ({ route }) => {

    const { paimentCollaboratorState } = route.params;
    const [isPaimentCollaboratorStateCollapsed, setIsPaimentCollaboratorStateCollapsed] = useState(false);



    const paimentCollaboratorStateCollapsible = () => {
        setIsPaimentCollaboratorStateCollapsed(!isPaimentCollaboratorStateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={paimentCollaboratorStateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Paiment collaborator state</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentCollaboratorStateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {paimentCollaboratorState.id}</Text>
                        <Text style={globalStyle.infos}>Code: {paimentCollaboratorState.code}</Text>
                        <Text style={globalStyle.infos}>Libelle: {paimentCollaboratorState.libelle}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default PaimentCollaboratorStateAdminView;
