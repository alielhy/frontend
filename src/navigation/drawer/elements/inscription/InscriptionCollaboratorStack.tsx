import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InscriptionCollaboratorAdminView from "../../../../component/admin/view/inscription/inscription-collaborator/view/inscription-collaborator-view-admin.component";
import InscriptionCollaboratorAdminList from "../../../../component/admin/view/inscription/inscription-collaborator/list/inscription-collaborator-list-admin.component";
import InscriptionCollaboratorAdminEdit from "../../../../component/admin/view/inscription/inscription-collaborator/edit/inscription-collaborator-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInscriptionCollaboratorAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InscriptionCollaboratorAdminList"
                component={InscriptionCollaboratorAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorAdminUpdate"
                component={InscriptionCollaboratorAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorAdminDetails"
                component={InscriptionCollaboratorAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInscriptionCollaboratorAdmin;
