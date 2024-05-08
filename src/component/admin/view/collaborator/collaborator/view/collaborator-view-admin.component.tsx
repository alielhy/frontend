import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {CollaboratorDto}  from '../../../../../../controller/model/collaborator/Collaborator.model';

type CollaboratorViewScreenRouteProp = RouteProp<{ CollaboratorDetails: { collaborator : CollaboratorDto } }, 'CollaboratorDetails'>;

type Props = { route: CollaboratorViewScreenRouteProp; };

const CollaboratorAdminView: React.FC<Props> = ({ route }) => {

    const { collaborator } = route.params;
    const [isCollaboratorCollapsed, setIsCollaboratorCollapsed] = useState(false);



    const collaboratorCollapsible = () => {
        setIsCollaboratorCollapsed(!isCollaboratorCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={collaboratorCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Collaborator</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCollaboratorCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {collaborator.id}</Text>
                        <Text style={globalStyle.infos}>Description: {collaborator.description}</Text>
                        <Text style={globalStyle.infos}>Rib: {collaborator.rib}</Text>
                        <Text style={globalStyle.infos}>Credentials non expired: {collaborator.credentialsNonExpired}</Text>
                        <Text style={globalStyle.infos}>Enabled: {collaborator.enabled}</Text>
                        <Text style={globalStyle.infos}>Account non expired: {collaborator.accountNonExpired}</Text>
                        <Text style={globalStyle.infos}>Account non locked: {collaborator.accountNonLocked}</Text>
                        <Text style={globalStyle.infos}>Password changed: {collaborator.passwordChanged}</Text>
                        <Text style={globalStyle.infos}>Username: {collaborator.username}</Text>
                        <Text style={globalStyle.infos}>Password: {collaborator.password}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default CollaboratorAdminView;
