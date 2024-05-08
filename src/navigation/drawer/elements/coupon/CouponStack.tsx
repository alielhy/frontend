import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CouponAdminView from "../../../../component/admin/view/coupon/coupon/view/coupon-view-admin.component";
import CouponAdminList from "../../../../component/admin/view/coupon/coupon/list/coupon-list-admin.component";
import CouponAdminEdit from "../../../../component/admin/view/coupon/coupon/edit/coupon-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackCouponAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CouponAdminList"
                component={CouponAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponAdminUpdate"
                component={CouponAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponAdminDetails"
                component={CouponAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackCouponAdmin;
