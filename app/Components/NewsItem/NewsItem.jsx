import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { useStaggeredFadeIn } from '../hooks/useStaggeredFadeIn';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get("window");

export function NewsItem({ news, index }) {
    const newsItemFade = useStaggeredFadeIn(index, 100, 200);
    return (
        <Animated.View style={[styles.newsCard, newsItemFade]}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsDescription}>{news.description}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    newsCard: {
        width: width * 0.7,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 12,
        marginRight: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#555",
    },
    newsDescription: {
        fontSize: 14,
        color: "#777",
    },
});
