import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {CategoryProjectTemplateDto}  from '../../../../../../controller/model/template/CategoryProjectTemplate.model';

type CategoryProjectTemplateViewScreenRouteProp = RouteProp<{ CategoryProjectTemplateDetails: { categoryProjectTemplate : CategoryProjectTemplateDto } }, 'CategoryProjectTemplateDetails'>;

type Props = { route: CategoryProjectTemplateViewScreenRouteProp; };

const CategoryProjectTemplateAdminView: React.FC<Props> = ({ route }) => {

    const { categoryProjectTemplate } = route.params;
    const [isCategoryProjectTemplateCollapsed, setIsCategoryProjectTemplateCollapsed] = useState(false);



    const categoryProjectTemplateCollapsible = () => {
        setIsCategoryProjectTemplateCollapsed(!isCategoryProjectTemplateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={categoryProjectTemplateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Category project template</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isCategoryProjectTemplateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {categoryProjectTemplate.id}</Text>
                        <Text style={globalStyle.infos}>Code: {categoryProjectTemplate.code}</Text>
                        <Text style={globalStyle.infos}>Name: {categoryProjectTemplate.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default CategoryProjectTemplateAdminView;
