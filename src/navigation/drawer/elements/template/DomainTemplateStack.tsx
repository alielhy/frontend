import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DomainTemplateAdminView from "../../../../component/admin/view/template/domain-template/view/domain-template-view-admin.component";
import DomainTemplateAdminList from "../../../../component/admin/view/template/domain-template/list/domain-template-list-admin.component";
import DomainTemplateAdminEdit from "../../../../component/admin/view/template/domain-template/edit/domain-template-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackDomainTemplateAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DomainTemplateAdminList"
                component={DomainTemplateAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DomainTemplateAdminUpdate"
                component={DomainTemplateAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DomainTemplateAdminDetails"
                component={DomainTemplateAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackDomainTemplateAdmin;
