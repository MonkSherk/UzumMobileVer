
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './AuthContext';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuth } from './AuthContext';

function RootNavigator() {
    const { authorized } = useAuth();
    return authorized ? <MainTabs /> : <AuthStack />;
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
