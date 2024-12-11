// app/Profile/Profile.jsx
import React from "react";
import {
    Text,
    Image,
    StyleSheet,
    FlatList,
    View
} from "react-native";
import { useAuth } from "@/app/AuthContext";
import Animated, { Layout } from 'react-native-reanimated';
import { useFadeIn } from "../hooks/useFadeIn";
import { MenuItemComponent } from "../MenuItemComponent/MenuItemComponent";
import { usePulseAnimation } from "../hooks/usePulseAnimation";
import { useInfiniteRotation } from "../hooks/useInfiniteRotation";

const menuItems = [
    {
        id: "1",
        title: "Корзина",
        icon: "cart-outline",
        navigateTo: "Basket",
    },
    {
        id: "2",
        title: "Активные заказы",
        icon: "list-circle-outline",
        navigateTo: "ActiveOrders",
    },
    {
        id: "3",
        title: "Настройки",
        icon: "settings-outline",
        navigateTo: "Settings",
    },
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(require('react-native').TouchableOpacity);

function Profile({ navigation }) {
    const { user } = useAuth();
    const fadeInStyle = useFadeIn();

    const avatarPulseStyle = usePulseAnimation(1, 1.3, 1500);

    const editButtonRotation = useInfiniteRotation(3000);

    if (!user) {
        return (
            <Animated.View style={[styles.container, fadeInStyle]}>
                <Text style={styles.text}>Вы не авторизованы. Пожалуйста, войдите или зарегистрируйтесь.</Text>
            </Animated.View>
        );
    }

    const renderMenuItem = ({ item }) => {
        return <MenuItemComponent item={item} navigation={navigation} />;
    };

    return (
        <Animated.View style={[styles.container, fadeInStyle]}>
            <Animated.View style={styles.profileSection} layout={Layout.springify()}>
                <Animated.View style={avatarPulseStyle}>
                    <Image
                        source={{ uri: user.avatar || "https://via.placeholder.com/100" }}
                        style={styles.avatar}
                    />
                </Animated.View>
                <View style={styles.userInfo}>
                    <Text style={styles.fullName}>{user.fullName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <AnimatedTouchableOpacity
                    style={[styles.editButton, editButtonRotation]}
                    onPress={() => navigation.navigate("Settings")}
                    activeOpacity={0.9}
                    layout={Layout.springify()}
                >
                    <Text style={{color: '#fff', fontWeight:'700'}}>✏️</Text>
                </AnimatedTouchableOpacity>
            </Animated.View>

            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                contentContainerStyle={styles.menuList}
            />
        </Animated.View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 24,
        position: "relative",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    fullName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
    },
    email: {
        fontSize: 16,
        color: "#777",
        marginTop: 4,
    },
    editButton: {
        position: "absolute",
        top: 16,
        right: 16,
        backgroundColor: "#ff6b81",
        padding: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    menuList: {},
    text: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        marginTop: 20,
    },
});
