import CustomDrawer from "../../zynerator/CustomDrawer/CustomDrawer";
import HomeScreen from "../../component/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CategoryPackagingAdmin from "../../component/admin/view/category/category-packaging/container/category-packaging-container-admin.component";
import CategoryProjectTemplateAdmin from "../../component/admin/view/template/category-project-template/container/category-project-template-container-admin.component";
import ProjectTemplateAdmin from "../../component/admin/view/template/project-template/container/project-template-container-admin.component";
import DomainTemplateAdmin from "../../component/admin/view/template/domain-template/container/domain-template-container-admin.component";
import PaimentInfluencerAdmin from "../../component/admin/view/paiment/paiment-influencer/container/paiment-influencer-container-admin.component";
import PaimentCollaboratorAdmin from "../../component/admin/view/paiment/paiment-collaborator/container/paiment-collaborator-container-admin.component";
import ProjectAdmin from "../../component/admin/view/project/project/container/project-container-admin.component";
import PaimentCollaboratorStateAdmin from "../../component/admin/view/project/paiment-collaborator-state/container/paiment-collaborator-state-container-admin.component";
import PaimentInfluencerStateAdmin from "../../component/admin/view/project/paiment-influencer-state/container/paiment-influencer-state-container-admin.component";
import ProjectStateAdmin from "../../component/admin/view/project/project-state/container/project-state-container-admin.component";
import PackagingAdmin from "../../component/admin/view/packaging/packaging/container/packaging-container-admin.component";
import InscriptionMembreAdmin from "../../component/admin/view/inscription/inscription-membre/container/inscription-membre-container-admin.component";
import InscriptionCollaboratorStateAdmin from "../../component/admin/view/inscription/inscription-collaborator-state/container/inscription-collaborator-state-container-admin.component";
import InscriptionCollaboratorTypeAdmin from "../../component/admin/view/inscription/inscription-collaborator-type/container/inscription-collaborator-type-container-admin.component";
import InscriptionCollaboratorAdmin from "../../component/admin/view/inscription/inscription-collaborator/container/inscription-collaborator-container-admin.component";
import InscriptionMembreStateAdmin from "../../component/admin/view/inscription/inscription-membre-state/container/inscription-membre-state-container-admin.component";
import CollaboratorAdmin from "../../component/admin/view/collaborator/collaborator/container/collaborator-container-admin.component";
import InfluencerAdmin from "../../component/admin/view/coupon/influencer/container/influencer-container-admin.component";
import CouponAdmin from "../../component/admin/view/coupon/coupon/container/coupon-container-admin.component";
import CouponDetailAdmin from "../../component/admin/view/coupon/coupon-detail/container/coupon-detail-container-admin.component";
import MemberAdmin from "../../component/admin/view/collaborator/member/container/member-container-admin.component";
import AboutScreen from "../../component/AboutScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (

        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#ffa500',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontWeight: 'bold',
                    fontSize: 15,
                },
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Category Packaging"
                component={CategoryPackagingAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Category Project Template"
                component={CategoryProjectTemplateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Project Template"
                component={ProjectTemplateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Domain Template"
                component={DomainTemplateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Paiment Influencer"
                component={PaimentInfluencerAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Paiment Collaborator"
                component={PaimentCollaboratorAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Project"
                component={ProjectAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Paiment Collaborator State"
                component={PaimentCollaboratorStateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Paiment Influencer State"
                component={PaimentInfluencerStateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Project State"
                component={ProjectStateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Packaging"
                component={PackagingAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inscription Membre"
                component={InscriptionMembreAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inscription Collaborator State"
                component={InscriptionCollaboratorStateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inscription Collaborator Type"
                component={InscriptionCollaboratorTypeAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inscription Collaborator"
                component={InscriptionCollaboratorAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inscription Membre State"
                component={InscriptionMembreStateAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Collaborator"
                component={CollaboratorAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Influencer"
                component={InfluencerAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Coupon"
                component={CouponAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Coupon Details"
                component={CouponDetailAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Member"
                component={MemberAdmin}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>

    );
}

export default DrawerNavigation;
