import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {ProjectDto}  from '../../../../../../controller/model/project/Project.model';

type ProjectViewScreenRouteProp = RouteProp<{ ProjectDetails: { project : ProjectDto } }, 'ProjectDetails'>;

type Props = { route: ProjectViewScreenRouteProp; };

const ProjectAdminView: React.FC<Props> = ({ route }) => {

    const { project } = route.params;
    const [isProjectCollapsed, setIsProjectCollapsed] = useState(false);



    const projectCollapsible = () => {
        setIsProjectCollapsed(!isProjectCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={projectCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Project</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isProjectCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {project.id}</Text>
                        <Text style={globalStyle.infos}>Code: {project.code}</Text>
                        <Text style={globalStyle.infos}>Name: {project.name}</Text>
                        <Text style={globalStyle.infos}>Generated date: {project.generatedDate}</Text>
                        <Text style={globalStyle.infos}>Yaml: {project.yaml}</Text>
                        <Text style={globalStyle.infos}>Project state: {project?.projectState?.code}</Text>
                        <Text style={globalStyle.infos}>Inscription membre: {project?.inscriptionMembre?.id}</Text>
                        <Text style={globalStyle.infos}>Project template: {project?.projectTemplate?.name}</Text>
                        <Text style={globalStyle.infos}>Domain template: {project?.domainTemplate?.name}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default ProjectAdminView;
