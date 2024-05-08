import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {PackagingDto}  from '../../../../../../controller/model/packaging/Packaging.model';

type PackagingViewScreenRouteProp = RouteProp<{ PackagingDetails: { packaging : PackagingDto } }, 'PackagingDetails'>;

type Props = { route: PackagingViewScreenRouteProp; };

const PackagingAdminView: React.FC<Props> = ({ route }) => {

    const { packaging } = route.params;
    const [isPackagingCollapsed, setIsPackagingCollapsed] = useState(false);



    const packagingCollapsible = () => {
        setIsPackagingCollapsed(!isPackagingCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={packagingCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Packaging</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isPackagingCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {packaging.id}</Text>
                        <Text style={globalStyle.infos}>Name: {packaging.name}</Text>
                        <Text style={globalStyle.infos}>Code: {packaging.code}</Text>
                        <Text style={globalStyle.infos}>Description: {packaging.description}</Text>
                        <Text style={globalStyle.infos}>Date start: {packaging.dateStart}</Text>
                        <Text style={globalStyle.infos}>Date end: {packaging.dateEnd}</Text>
                        <Text style={globalStyle.infos}>Price: {packaging.price}</Text>
                        <Text style={globalStyle.infos}>Max entity: {packaging.maxEntity}</Text>
                        <Text style={globalStyle.infos}>Max projet: {packaging.maxProjet}</Text>
                        <Text style={globalStyle.infos}>Max attribut: {packaging.maxAttribut}</Text>
                        <Text style={globalStyle.infos}>Max indicator: {packaging.maxIndicator}</Text>
                        <Text style={globalStyle.infos}>Category packaging: {packaging?.categoryPackaging?.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default PackagingAdminView;
