// index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Main from "@/app/Home/Main";
import Search from "@/app/Search/Search";
import Basket from "@/app/Basket/Basket";
import ProfileStack from "@/app/ProfileStack/ProfileStack";
import Favorites from "@/app/Favorites/Favorities";

const Tab = createBottomTabNavigator();

export default function Index() {
    return (
        // index.tsx
        <Tab.Navigator
            initialRouteName="Main"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Main':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = focused ? 'search' : 'search-outline';
                            break;
                        case 'Basket':
                            iconName = focused ? 'basket' : 'basket-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'ellipse';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ff6b81',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 5,
                    height: 60,
                    paddingBottom: 5,
                    justifyContent: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                    fontWeight: '600',
                    textAlign: 'center',
                },
            })}
        >
            <Tab.Screen name="Main" component={Main} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Basket" component={Basket} />
            <Tab.Screen name="Profile" component={ProfileStack} />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>

    );
}
