import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaimentCollaboratorStateAdminView from "../../../../component/admin/view/project/paiment-collaborator-state/view/paiment-collaborator-state-view-admin.component";
import PaimentCollaboratorStateAdminList from "../../../../component/admin/view/project/paiment-collaborator-state/list/paiment-collaborator-state-list-admin.component";
import PaimentCollaboratorStateAdminEdit from "../../../../component/admin/view/project/paiment-collaborator-state/edit/paiment-collaborator-state-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackPaimentCollaboratorStateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PaimentCollaboratorStateAdminList"
                component={PaimentCollaboratorStateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentCollaboratorStateAdminUpdate"
                component={PaimentCollaboratorStateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentCollaboratorStateAdminDetails"
                component={PaimentCollaboratorStateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackPaimentCollaboratorStateAdmin;
