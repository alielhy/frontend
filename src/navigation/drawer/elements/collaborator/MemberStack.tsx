import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MemberAdminView from "../../../../component/admin/view/collaborator/member/view/member-view-admin.component";
import MemberAdminList from "../../../../component/admin/view/collaborator/member/list/member-list-admin.component";
import MemberAdminEdit from "../../../../component/admin/view/collaborator/member/edit/member-edit-admin.component";


const Stack = createNativeStackNavigator();

function StackMemberAdmin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MemberAdminList"
                component={MemberAdminList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MemberAdminUpdate"
                component={MemberAdminEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MemberAdminDetails"
                component={MemberAdminView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackMemberAdmin;
