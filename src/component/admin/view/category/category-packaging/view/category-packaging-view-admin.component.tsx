import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {CategoryPackagingDto}  from '../../../../../../controller/model/category/CategoryPackaging.model';

type CategoryPackagingViewScreenRouteProp = RouteProp<{ CategoryPackagingDetails: { categoryPackaging : CategoryPackagingDto } }, 'CategoryPackagingDetails'>;

type Props = { route: CategoryPackagingViewScreenRouteProp; };

const CategoryPackagingAdminView: React.FC<Props> = ({ route }) => {

    const { categoryPackaging } = route.params;
    const [isCategoryPackagingCollapsed, setIsCategoryPackagingCollapsed] = useState(false);



    const categoryPackagingCollapsible = () => {
        setIsCategoryPackagingCollapsed(!isCategoryPackagingCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={categoryPackagingCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Category packaging</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCategoryPackagingCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {categoryPackaging.id}</Text>
                        <Text style={globalStyle.infos}>Code: {categoryPackaging.code}</Text>
                        <Text style={globalStyle.infos}>Name: {categoryPackaging.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default CategoryPackagingAdminView;
