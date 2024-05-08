import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryProjectTemplateAdminView from "../../../../component/admin/view/template/category-project-template/view/category-project-template-view-admin.component";
import CategoryProjectTemplateAdminList from "../../../../component/admin/view/template/category-project-template/list/category-project-template-list-admin.component";
import CategoryProjectTemplateAdminEdit from "../../../../component/admin/view/template/category-project-template/edit/category-project-template-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackCategoryProjectTemplateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CategoryProjectTemplateAdminList"
                component={CategoryProjectTemplateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryProjectTemplateAdminUpdate"
                component={CategoryProjectTemplateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryProjectTemplateAdminDetails"
                component={CategoryProjectTemplateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackCategoryProjectTemplateAdmin;
