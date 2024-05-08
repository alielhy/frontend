import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {PaimentCollaboratorDto}  from '../../../../../../controller/model/paiment/PaimentCollaborator.model';

type PaimentCollaboratorViewScreenRouteProp = RouteProp<{ PaimentCollaboratorDetails: { paimentCollaborator : PaimentCollaboratorDto } }, 'PaimentCollaboratorDetails'>;

type Props = { route: PaimentCollaboratorViewScreenRouteProp; };

const PaimentCollaboratorAdminView: React.FC<Props> = ({ route }) => {

    const { paimentCollaborator } = route.params;
    const [isPaimentCollaboratorCollapsed, setIsPaimentCollaboratorCollapsed] = useState(false);



    const paimentCollaboratorCollapsible = () => {
        setIsPaimentCollaboratorCollapsed(!isPaimentCollaboratorCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={paimentCollaboratorCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Paiment collaborator</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPaimentCollaboratorCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {paimentCollaborator.id}</Text>
                        <Text style={globalStyle.infos}>Name: {paimentCollaborator.name}</Text>
                        <Text style={globalStyle.infos}>Description: {paimentCollaborator.description}</Text>
                        <Text style={globalStyle.infos}>Code: {paimentCollaborator.code}</Text>
                        <Text style={globalStyle.infos}>Coupon detail: {paimentCollaborator?.couponDetail?.id}</Text>
                        <Text style={globalStyle.infos}>Amount to paid: {paimentCollaborator.amountToPaid}</Text>
                        <Text style={globalStyle.infos}>Total: {paimentCollaborator.total}</Text>
                        <Text style={globalStyle.infos}>Discount: {paimentCollaborator.discount}</Text>
                        <Text style={globalStyle.infos}>Remaining: {paimentCollaborator.remaining}</Text>
                        <Text style={globalStyle.infos}>Paiement date: {paimentCollaborator.paiementDate}</Text>
                        <Text style={globalStyle.infos}>Inscription collaborator: {paimentCollaborator?.inscriptionCollaborator?.id}</Text>
                        <Text style={globalStyle.infos}>Paiment collaborator state: {paimentCollaborator?.paimentCollaboratorState?.code}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default PaimentCollaboratorAdminView;
