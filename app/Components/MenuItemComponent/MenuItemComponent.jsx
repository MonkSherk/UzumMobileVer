import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Animated from 'react-native-reanimated';
import { usePressAnimation } from "../hooks/usePressAnimation";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(require('react-native').TouchableOpacity);

export function MenuItemComponent({ item, navigation }) {
    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

    return (
        <AnimatedTouchableOpacity
            style={[styles.menuItem, animatedStyle]}
            onPress={() => navigation.navigate(item.navigateTo)}
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <View style={styles.menuItemContent}>
                <Icon name={item.icon} size={24} color="#ff6b81" />
                <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#ccc" />
        </AnimatedTouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
