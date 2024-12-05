
import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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

function Profile({ navigation }) {
    const user = {
        avatar: "https://via.placeholder.com/100",
        fullName: "Фамилия Имя",
        email: "email@example.com",
    };

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.navigateTo)}
        >
            <View style={styles.menuItemContent}>
                <Icon name={item.icon} size={24} color="#ff6b81" />
                <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.fullName}>{user.fullName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Icon name="create-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                contentContainerStyle={styles.menuList}
            />
        </View>
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
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 24,
        position: "relative",
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
    menuList: {
        // Дополнительные отступы, если нужно
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    menuItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginLeft: 12,
    },
});
