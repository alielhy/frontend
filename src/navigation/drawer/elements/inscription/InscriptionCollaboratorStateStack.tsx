import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InscriptionCollaboratorStateAdminView from "../../../../component/admin/view/inscription/inscription-collaborator-state/view/inscription-collaborator-state-view-admin.component";
import InscriptionCollaboratorStateAdminList from "../../../../component/admin/view/inscription/inscription-collaborator-state/list/inscription-collaborator-state-list-admin.component";
import InscriptionCollaboratorStateAdminEdit from "../../../../component/admin/view/inscription/inscription-collaborator-state/edit/inscription-collaborator-state-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInscriptionCollaboratorStateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InscriptionCollaboratorStateAdminList"
                component={InscriptionCollaboratorStateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorStateAdminUpdate"
                component={InscriptionCollaboratorStateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorStateAdminDetails"
                component={InscriptionCollaboratorStateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInscriptionCollaboratorStateAdmin;
