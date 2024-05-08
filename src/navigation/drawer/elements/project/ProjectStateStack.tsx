import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProjectStateAdminView from "../../../../component/admin/view/project/project-state/view/project-state-view-admin.component";
import ProjectStateAdminList from "../../../../component/admin/view/project/project-state/list/project-state-list-admin.component";
import ProjectStateAdminEdit from "../../../../component/admin/view/project/project-state/edit/project-state-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackProjectStateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProjectStateAdminList"
                component={ProjectStateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectStateAdminUpdate"
                component={ProjectStateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectStateAdminDetails"
                component={ProjectStateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackProjectStateAdmin;
