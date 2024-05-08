import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaimentInfluencerAdminView from "../../../../component/admin/view/paiment/paiment-influencer/view/paiment-influencer-view-admin.component";
import PaimentInfluencerAdminList from "../../../../component/admin/view/paiment/paiment-influencer/list/paiment-influencer-list-admin.component";
import PaimentInfluencerAdminEdit from "../../../../component/admin/view/paiment/paiment-influencer/edit/paiment-influencer-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackPaimentInfluencerAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PaimentInfluencerAdminList"
                component={PaimentInfluencerAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentInfluencerAdminUpdate"
                component={PaimentInfluencerAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PaimentInfluencerAdminDetails"
                component={PaimentInfluencerAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackPaimentInfluencerAdmin;
