import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InscriptionMembreAdminView from "../../../../component/admin/view/inscription/inscription-membre/view/inscription-membre-view-admin.component";
import InscriptionMembreAdminList from "../../../../component/admin/view/inscription/inscription-membre/list/inscription-membre-list-admin.component";
import InscriptionMembreAdminEdit from "../../../../component/admin/view/inscription/inscription-membre/edit/inscription-membre-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInscriptionMembreAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InscriptionMembreAdminList"
                component={InscriptionMembreAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionMembreAdminUpdate"
                component={InscriptionMembreAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InscriptionMembreAdminDetails"
                component={InscriptionMembreAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInscriptionMembreAdmin;
