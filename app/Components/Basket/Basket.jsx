import React from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const basketData = [
    {
        id: "1",
        image: "https://via.placeholder.com/150",
        price: "$99",
        description: "Товар в корзине 1",
    },

];

function Basket({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Ваша Корзина</Text>
            <FlatList
                data={basketData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.basketItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon name="trash-outline" size={24} color="#ff6b81" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.checkoutButton} onPress={() => Alert.alert("Оформление заказа")}>
                <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Basket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        color: "#333",
    },
    basketItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemDescription: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    itemPrice: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    checkoutButton: {
        backgroundColor: "#ff6b81",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 24,
    },
    checkoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
