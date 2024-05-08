import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PackagingAdminView from "../../../../component/admin/view/packaging/packaging/view/packaging-view-admin.component";
import PackagingAdminList from "../../../../component/admin/view/packaging/packaging/list/packaging-list-admin.component";
import PackagingAdminEdit from "../../../../component/admin/view/packaging/packaging/edit/packaging-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackPackagingAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PackagingAdminList"
                component={PackagingAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PackagingAdminUpdate"
                component={PackagingAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PackagingAdminDetails"
                component={PackagingAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackPackagingAdmin;
