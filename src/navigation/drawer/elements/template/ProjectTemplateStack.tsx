import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProjectTemplateAdminView from "../../../../component/admin/view/template/project-template/view/project-template-view-admin.component";
import ProjectTemplateAdminList from "../../../../component/admin/view/template/project-template/list/project-template-list-admin.component";
import ProjectTemplateAdminEdit from "../../../../component/admin/view/template/project-template/edit/project-template-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackProjectTemplateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProjectTemplateAdminList"
                component={ProjectTemplateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectTemplateAdminUpdate"
                component={ProjectTemplateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProjectTemplateAdminDetails"
                component={ProjectTemplateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackProjectTemplateAdmin;
