import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {ProjectTemplateDto}  from '../../../../../../controller/model/template/ProjectTemplate.model';

type ProjectTemplateViewScreenRouteProp = RouteProp<{ ProjectTemplateDetails: { projectTemplate : ProjectTemplateDto } }, 'ProjectTemplateDetails'>;

type Props = { route: ProjectTemplateViewScreenRouteProp; };

const ProjectTemplateAdminView: React.FC<Props> = ({ route }) => {

    const { projectTemplate } = route.params;
    const [isProjectTemplateCollapsed, setIsProjectTemplateCollapsed] = useState(false);



    const projectTemplateCollapsible = () => {
        setIsProjectTemplateCollapsed(!isProjectTemplateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={projectTemplateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Project template</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isProjectTemplateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {projectTemplate.id}</Text>
                        <Text style={globalStyle.infos}>Code: {projectTemplate.code}</Text>
                        <Text style={globalStyle.infos}>Name: {projectTemplate.name}</Text>
                        <Text style={globalStyle.infos}>Yaml: {projectTemplate.yaml}</Text>
                        <Text style={globalStyle.infos}>Adding date: {projectTemplate.addingDate}</Text>
                        <Text style={globalStyle.infos}>Last update date: {projectTemplate.lastUpdateDate}</Text>
                        <Text style={globalStyle.infos}>Category project template: {projectTemplate?.categoryProjectTemplate?.name}</Text>
                        <Text style={globalStyle.infos}>Project template tags: {projectTemplate.projectTemplateTags}</Text>
                        <Text style={globalStyle.infos}>Domain template: {projectTemplate?.domainTemplate?.name}</Text>
                        <Text style={globalStyle.infos}>Price: {projectTemplate.price}</Text>
                        <Text style={globalStyle.infos}>Member: {projectTemplate?.member?.id}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default ProjectTemplateAdminView;
