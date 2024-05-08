import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProjectAdminView from "../../../../component/admin/view/project/project/view/project-view-admin.component";
import ProjectAdminList from "../../../../component/admin/view/project/project/list/project-list-admin.component";
import ProjectAdminEdit from "../../../../component/admin/view/project/project/edit/project-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackProjectAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProjectAdminList"
                component={ProjectAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectAdminUpdate"
                component={ProjectAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectAdminDetails"
                component={ProjectAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackProjectAdmin;
