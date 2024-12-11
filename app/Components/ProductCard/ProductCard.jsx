import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStaggeredFadeIn } from '../hooks/useStaggeredFadeIn';
export function ProductCard({ item, index, width }) {
    const staggerStyle = useStaggeredFadeIn(index, 100, 300);
    return (
        <Animated.View style={[styles.productCard, staggerStyle, { width: (width - 48) / 2 }]}>
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
            />
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#ffd700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.productDescription}>
                {item.description}
            </Text>
        </Animated.View>
    );
}



const styles = StyleSheet.create({
    productCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 12,
        margin: 6,
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
