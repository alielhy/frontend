import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaimentInfluencerStateAdminView from "../../../../component/admin/view/project/paiment-influencer-state/view/paiment-influencer-state-view-admin.component";
import PaimentInfluencerStateAdminList from "../../../../component/admin/view/project/paiment-influencer-state/list/paiment-influencer-state-list-admin.component";
import PaimentInfluencerStateAdminEdit from "../../../../component/admin/view/project/paiment-influencer-state/edit/paiment-influencer-state-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackPaimentInfluencerStateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PaimentInfluencerStateAdminList"
                component={PaimentInfluencerStateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentInfluencerStateAdminUpdate"
                component={PaimentInfluencerStateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentInfluencerStateAdminDetails"
                component={PaimentInfluencerStateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackPaimentInfluencerStateAdmin;
