
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

function CartPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Корзина</Text>
        </View>
    );
}

export default CartPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
});
