import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {PaimentInfluencerStateDto}  from '../../../../../../controller/model/project/PaimentInfluencerState.model';

type PaimentInfluencerStateViewScreenRouteProp = RouteProp<{ PaimentInfluencerStateDetails: { paimentInfluencerState : PaimentInfluencerStateDto } }, 'PaimentInfluencerStateDetails'>;

type Props = { route: PaimentInfluencerStateViewScreenRouteProp; };

const PaimentInfluencerStateAdminView: React.FC<Props> = ({ route }) => {

    const { paimentInfluencerState } = route.params;
    const [isPaimentInfluencerStateCollapsed, setIsPaimentInfluencerStateCollapsed] = useState(false);



    const paimentInfluencerStateCollapsible = () => {
        setIsPaimentInfluencerStateCollapsed(!isPaimentInfluencerStateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={paimentInfluencerStateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Paiment influencer state</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentInfluencerStateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {paimentInfluencerState.id}</Text>
                        <Text style={globalStyle.infos}>Code: {paimentInfluencerState.code}</Text>
                        <Text style={globalStyle.infos}>Libelle: {paimentInfluencerState.libelle}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default PaimentInfluencerStateAdminView;
