import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {PaimentInfluencerDto}  from '../../../../../../controller/model/paiment/PaimentInfluencer.model';

type PaimentInfluencerViewScreenRouteProp = RouteProp<{ PaimentInfluencerDetails: { paimentInfluencer : PaimentInfluencerDto } }, 'PaimentInfluencerDetails'>;

type Props = { route: PaimentInfluencerViewScreenRouteProp; };

const PaimentInfluencerAdminView: React.FC<Props> = ({ route }) => {

    const { paimentInfluencer } = route.params;
    const [isPaimentInfluencerCollapsed, setIsPaimentInfluencerCollapsed] = useState(false);



    const paimentInfluencerCollapsible = () => {
        setIsPaimentInfluencerCollapsed(!isPaimentInfluencerCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={paimentInfluencerCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Paiment influencer</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentInfluencerCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {paimentInfluencer.id}</Text>
                        <Text style={globalStyle.infos}>Name: {paimentInfluencer.name}</Text>
                        <Text style={globalStyle.infos}>Description: {paimentInfluencer.description}</Text>
                        <Text style={globalStyle.infos}>Code: {paimentInfluencer.code}</Text>
                        <Text style={globalStyle.infos}>Influencer: {paimentInfluencer?.influencer?.id}</Text>
                        <Text style={globalStyle.infos}>Coupon: {paimentInfluencer?.coupon?.name}</Text>
                        <Text style={globalStyle.infos}>Total: {paimentInfluencer.total}</Text>
                        <Text style={globalStyle.infos}>Nbr utilisation: {paimentInfluencer.nbrUtilisation}</Text>
                        <Text style={globalStyle.infos}>Date paiement: {paimentInfluencer.datePaiement}</Text>
                        <Text style={globalStyle.infos}>Paiment influencer state: {paimentInfluencer?.paimentInfluencerState?.code}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default PaimentInfluencerAdminView;
