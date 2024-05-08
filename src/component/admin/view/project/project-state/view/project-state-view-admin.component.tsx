import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import {globalStyle} from "../../../../../../shared/globalStyle";

import  {ProjectStateDto}  from '../../../../../../controller/model/project/ProjectState.model';

type ProjectStateViewScreenRouteProp = RouteProp<{ ProjectStateDetails: { projectState : ProjectStateDto } }, 'ProjectStateDetails'>;

type Props = { route: ProjectStateViewScreenRouteProp; };

const ProjectStateAdminView: React.FC<Props> = ({ route }) => {

    const { projectState } = route.params;
    const [isProjectStateCollapsed, setIsProjectStateCollapsed] = useState(false);



    const projectStateCollapsible = () => {
        setIsProjectStateCollapsed(!isProjectStateCollapsed);
    };

return(
    <View style={{ padding: 20 }}>

        <ScrollView>

            <TouchableOpacity onPress={projectStateCollapsible} style={{ backgroundColor: '#ffd700', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Project state</Text>
            </TouchableOpacity>

            <Collapsible collapsed={isProjectStateCollapsed}>

                <View style={globalStyle.itemCard}>

                    <View>

                        <Text style={globalStyle.infos}>Id: {projectState.id}</Text>
                        <Text style={globalStyle.infos}>Code: {projectState.code}</Text>
                        <Text style={globalStyle.infos}>Libelle: {projectState.libelle}</Text>

                    </View>

                </View>

            </Collapsible>


        </ScrollView>

    </View>
);
};

export default ProjectStateAdminView;
