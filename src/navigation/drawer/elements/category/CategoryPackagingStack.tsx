import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryPackagingAdminView from "../../../../component/admin/view/category/category-packaging/view/category-packaging-view-admin.component";
import CategoryPackagingAdminList from "../../../../component/admin/view/category/category-packaging/list/category-packaging-list-admin.component";
import CategoryPackagingAdminEdit from "../../../../component/admin/view/category/category-packaging/edit/category-packaging-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackCategoryPackagingAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CategoryPackagingAdminList"
                component={CategoryPackagingAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryPackagingAdminUpdate"
                component={CategoryPackagingAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryPackagingAdminDetails"
                component={CategoryPackagingAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackCategoryPackagingAdmin;
