import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {DomainTemplateDto}  from '../../../../../../controller/model/template/DomainTemplate.model';

type DomainTemplateViewScreenRouteProp = RouteProp<{ DomainTemplateDetails: { domainTemplate : DomainTemplateDto } }, 'DomainTemplateDetails'>;

type Props = { route: DomainTemplateViewScreenRouteProp; };

const DomainTemplateAdminView: React.FC<Props> = ({ route }) => {

    const { domainTemplate } = route.params;
    const [isDomainTemplateCollapsed, setIsDomainTemplateCollapsed] = useState(false);



    const domainTemplateCollapsible = () => {
        setIsDomainTemplateCollapsed(!isDomainTemplateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={domainTemplateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Domain template</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isDomainTemplateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {domainTemplate.id}</Text>
                        <Text style={globalStyle.infos}>Code: {domainTemplate.code}</Text>
                        <Text style={globalStyle.infos}>Name: {domainTemplate.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default DomainTemplateAdminView;
