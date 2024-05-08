import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InscriptionMembreStateAdminView from "../../../../component/admin/view/inscription/inscription-membre-state/view/inscription-membre-state-view-admin.component";
import InscriptionMembreStateAdminList from "../../../../component/admin/view/inscription/inscription-membre-state/list/inscription-membre-state-list-admin.component";
import InscriptionMembreStateAdminEdit from "../../../../component/admin/view/inscription/inscription-membre-state/edit/inscription-membre-state-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInscriptionMembreStateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InscriptionMembreStateAdminList"
                component={InscriptionMembreStateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionMembreStateAdminUpdate"
                component={InscriptionMembreStateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionMembreStateAdminDetails"
                component={InscriptionMembreStateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInscriptionMembreStateAdmin;
