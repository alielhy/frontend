import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CollaboratorAdminView from "../../../../component/admin/view/collaborator/collaborator/view/collaborator-view-admin.component";
import CollaboratorAdminList from "../../../../component/admin/view/collaborator/collaborator/list/collaborator-list-admin.component";
import CollaboratorAdminEdit from "../../../../component/admin/view/collaborator/collaborator/edit/collaborator-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackCollaboratorAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CollaboratorAdminList"
                component={CollaboratorAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CollaboratorAdminUpdate"
                component={CollaboratorAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CollaboratorAdminDetails"
                component={CollaboratorAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackCollaboratorAdmin;
