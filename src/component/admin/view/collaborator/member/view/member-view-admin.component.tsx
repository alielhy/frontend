import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {MemberDto}  from '../../../../../../controller/model/collaborator/Member.model';

type MemberViewScreenRouteProp = RouteProp<{ MemberDetails: { member : MemberDto } }, 'MemberDetails'>;

type Props = { route: MemberViewScreenRouteProp; };

const MemberAdminView: React.FC<Props> = ({ route }) => {

    const { member } = route.params;
    const [isMemberCollapsed, setIsMemberCollapsed] = useState(false);



    const memberCollapsible = () => {
        setIsMemberCollapsed(!isMemberCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={memberCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Member</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isMemberCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {member.id}</Text>
                        <Text style={globalStyle.infos}>Description: {member.description}</Text>
                        <Text style={globalStyle.infos}>Collaborator: {member?.collaborator?.description}</Text>
                        <Text style={globalStyle.infos}>Credentials non expired: {member.credentialsNonExpired}</Text>
                        <Text style={globalStyle.infos}>Enabled: {member.enabled}</Text>
                        <Text style={globalStyle.infos}>Account non expired: {member.accountNonExpired}</Text>
                        <Text style={globalStyle.infos}>Account non locked: {member.accountNonLocked}</Text>
                        <Text style={globalStyle.infos}>Password changed: {member.passwordChanged}</Text>
                        <Text style={globalStyle.infos}>Username: {member.username}</Text>
                        <Text style={globalStyle.infos}>Password: {member.password}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default MemberAdminView;
