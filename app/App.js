// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./Home/Main";
import SearchPage from "./Search/Search";
import ProfilePage from "./Profile/Profile";
import CartPage from "./CartPage/CartPage";
import ActiveOrdersPage from "./ActiveOrders/ActiveOrdersPage";
import SettingsPage from "./SettingsPage/SettingsPage";


const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: "Главная" }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchPage}
                    options={{ title: "Поиск" }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfilePage}
                    options={{ title: "Профиль" }}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartPage}
                    options={{ title: "Корзина" }}
                />
                <Stack.Screen
                    name="ActiveOrders"
                    component={ActiveOrdersPage}
                    options={{ title: "Активные заказы" }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={{ title: "Настройки" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
