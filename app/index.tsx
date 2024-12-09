
import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";

function RootNavigator() {
    const { authorized } = useAuth();
    return authorized ? <MainTabs /> : <AuthStack />;
}

export default function Index() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
