// Favorites.jsx
import React from "react";
import { Text, View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const favoritesData = [
    {
        id: "1",
        image: "https://via.placeholder.com/150",
        price: "$199",
        rating: 4.9,
        description: "Избранный товар 1",
    },
];

function Favorites({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Избранные товары</Text>
            <FlatList
                data={favoritesData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={16} color="#ffd700" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.productDescription}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default Favorites;

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
    productCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 12,
        margin: 6,
        width: (width - 48) / 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    productImage: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ff6b81",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        color: "#555",
    },
    productDescription: {
        fontSize: 14,
        color: "#777",
    },
});
