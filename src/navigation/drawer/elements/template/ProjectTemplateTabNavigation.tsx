import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProjectTemplateAdminCreate from "../../../../component/admin/view/template/project-template/create/project-template-create-admin.component";
import ProjectTemplateStack from "./ProjectTemplateStack";


const Tab = createBottomTabNavigator();



function ProjectTemplateAdminTabNavigation() {
    return (


        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    width: "70%",
                    right: 70,
                    left: 70,
                    bottom: 20,
                    elevation: 0,
                    backgroundColor: '#fcae1e',
                    borderRadius: 15,
                    height: 60,

                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Create" component={ProjectTemplateAdminCreate} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="add-outline"
                                  size={27}
                                  color={focused ? 'black' : 'white'}
                        />
                        <Text
                            style={{ color: focused ? 'black' : 'white', fontSize: 15 }}
                        >Create</Text>
                    </View>
                ),
            }} />



            <Tab.Screen name="List" component={ProjectTemplateStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="list-outline"
                                  size={27}
                                  color={focused ? 'black' : 'white'}
                        />
                        <Text
                            style={{ color: focused ? 'black' : 'white', fontSize: 15 }}
                        >List</Text>
                    </View>
                ),
            }}
            />
        </Tab.Navigator>


    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default ProjectTemplateAdminTabNavigation;
