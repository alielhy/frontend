import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaimentCollaboratorAdminView from "../../../../component/admin/view/paiment/paiment-collaborator/view/paiment-collaborator-view-admin.component";
import PaimentCollaboratorAdminList from "../../../../component/admin/view/paiment/paiment-collaborator/list/paiment-collaborator-list-admin.component";
import PaimentCollaboratorAdminEdit from "../../../../component/admin/view/paiment/paiment-collaborator/edit/paiment-collaborator-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackPaimentCollaboratorAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PaimentCollaboratorAdminList"
                component={PaimentCollaboratorAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentCollaboratorAdminUpdate"
                component={PaimentCollaboratorAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentCollaboratorAdminDetails"
                component={PaimentCollaboratorAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackPaimentCollaboratorAdmin;
