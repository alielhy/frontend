import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InscriptionCollaboratorTypeAdminView from "../../../../component/admin/view/inscription/inscription-collaborator-type/view/inscription-collaborator-type-view-admin.component";
import InscriptionCollaboratorTypeAdminList from "../../../../component/admin/view/inscription/inscription-collaborator-type/list/inscription-collaborator-type-list-admin.component";
import InscriptionCollaboratorTypeAdminEdit from "../../../../component/admin/view/inscription/inscription-collaborator-type/edit/inscription-collaborator-type-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInscriptionCollaboratorTypeAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InscriptionCollaboratorTypeAdminList"
                component={InscriptionCollaboratorTypeAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorTypeAdminUpdate"
                component={InscriptionCollaboratorTypeAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionCollaboratorTypeAdminDetails"
                component={InscriptionCollaboratorTypeAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInscriptionCollaboratorTypeAdmin;
