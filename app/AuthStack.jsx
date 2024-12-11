// app/AuthStack.jsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "@/app/Components/Auth/Login";
import Register from "@/app/Components/Auth/Register";


const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

export default AuthStack;
