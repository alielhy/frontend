import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {InfluencerDto}  from '../../../../../../controller/model/coupon/Influencer.model';

type InfluencerViewScreenRouteProp = RouteProp<{ InfluencerDetails: { influencer : InfluencerDto } }, 'InfluencerDetails'>;

type Props = { route: InfluencerViewScreenRouteProp; };

const InfluencerAdminView: React.FC<Props> = ({ route }) => {

    const { influencer } = route.params;
    const [isInfluencerCollapsed, setIsInfluencerCollapsed] = useState(false);



    const influencerCollapsible = () => {
        setIsInfluencerCollapsed(!isInfluencerCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={influencerCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Influencer</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isInfluencerCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {influencer.id}</Text>
                        <Text style={globalStyle.infos}>Nick name: {influencer.nickName}</Text>
                        <Text style={globalStyle.infos}>Rib: {influencer.rib}</Text>
                        <Text style={globalStyle.infos}>Credentials non expired: {influencer.credentialsNonExpired}</Text>
                        <Text style={globalStyle.infos}>Enabled: {influencer.enabled}</Text>
                        <Text style={globalStyle.infos}>Account non expired: {influencer.accountNonExpired}</Text>
                        <Text style={globalStyle.infos}>Account non locked: {influencer.accountNonLocked}</Text>
                        <Text style={globalStyle.infos}>Password changed: {influencer.passwordChanged}</Text>
                        <Text style={globalStyle.infos}>Username: {influencer.username}</Text>
                        <Text style={globalStyle.infos}>Password: {influencer.password}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default InfluencerAdminView;
