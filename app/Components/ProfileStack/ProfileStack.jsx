// app/ProfileStack/ProfileStack.jsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Profile/Profile";
import Settings from "../SettingsPage/SettingsPage";
import ActiveOrders from "../ActiveOrders/ActiveOrdersPage";

const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileMain"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: "Настройки",
                    headerStyle: { backgroundColor: "#ff6b81" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
            <Stack.Screen
                name="ActiveOrders"
                component={ActiveOrders}
                options={{
                    title: "Активные заказы",
                    headerStyle: { backgroundColor: "#ff6b81" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;
