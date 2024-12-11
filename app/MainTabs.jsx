// app/MainTabs.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAuth } from "./AuthContext";


import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Basket from "@/app/Components/Basket/Basket";
import ProfileStack from "@/app/Components/ProfileStack/ProfileStack";
import Favorites from "@/app/Components/Favorites/Favorities";
import Main from "@/app/Components/Home/Main";
import Search from "@/app/Components/Search/Search";


const Tab = createBottomTabNavigator();

function BasketWrapper({ navigation }) {
    const { authorized } = useAuth();
    if (!authorized) {
        return (
            <View style={stylesAuthStub.container}>
                <Text style={stylesAuthStub.text}>Вы не авторизованы</Text>
                <TouchableOpacity
                    style={stylesAuthStub.button}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={stylesAuthStub.buttonText}>Войти в профиль</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return <Basket />;
}

function ProfileWrapper({ navigation }) {
    const { authorized } = useAuth();
    if (!authorized) {
        return (
            <View style={stylesAuthStub.container}>
                <Text style={stylesAuthStub.text}>Вы не авторизованы</Text>
                <TouchableOpacity
                    style={stylesAuthStub.button}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={stylesAuthStub.buttonText}>Войти в профиль</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return <ProfileStack />;
}

export default function MainTabs() {
    return (
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
                        case 'Favorites':
                            iconName = focused ? 'heart' : 'heart-outline';
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
            <Tab.Screen name="Basket" component={BasketWrapper} />
            <Tab.Screen name="Profile" component={ProfileWrapper} />
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

const stylesAuthStub = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        color: "#333",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#ff6b81",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
