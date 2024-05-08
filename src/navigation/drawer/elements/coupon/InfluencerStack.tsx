import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InfluencerAdminView from "../../../../component/admin/view/coupon/influencer/view/influencer-view-admin.component";
import InfluencerAdminList from "../../../../component/admin/view/coupon/influencer/list/influencer-list-admin.component";
import InfluencerAdminEdit from "../../../../component/admin/view/coupon/influencer/edit/influencer-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackInfluencerAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InfluencerAdminList"
                component={InfluencerAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InfluencerAdminUpdate"
                component={InfluencerAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InfluencerAdminDetails"
                component={InfluencerAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackInfluencerAdmin;
