import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CouponDetailAdminView from "../../../../component/admin/view/coupon/coupon-detail/view/coupon-detail-view-admin.component";
import CouponDetailAdminList from "../../../../component/admin/view/coupon/coupon-detail/list/coupon-detail-list-admin.component";
import CouponDetailAdminEdit from "../../../../component/admin/view/coupon/coupon-detail/edit/coupon-detail-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackCouponDetailAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CouponDetailAdminList"
                component={CouponDetailAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponDetailAdminUpdate"
                component={CouponDetailAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CouponDetailAdminDetails"
                component={CouponDetailAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackCouponDetailAdmin;
