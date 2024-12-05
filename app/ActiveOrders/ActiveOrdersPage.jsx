
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

function ActiveOrders() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Активные заказы</Text>
        </View>
    );
}

export default ActiveOrders;

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
