// app/Home/Main.jsx
import React, { useRef } from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    FlatList,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "@/app/AuthContext";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useFadeIn } from "../hooks/useFadeIn";
import { usePressAnimation } from "../hooks/usePressAnimation";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductCard } from "../ProductCard/ProductCard";
import { NewsItem } from "../NewsItem/NewsItem";
import { use3DPressAnimation } from "../hooks/use3DPressAnimation";

const { width } = Dimensions.get("window");

const newsData = [
    { id: "1", title: "Новость 1", description: "Описание новости 1" },
    { id: "2", title: "Новость 2", description: "Описание новости 2" },
    { id: "3", title: "Новость 3", description: "Описание новости 3" },
];

const categoriesData = [
    { id: "1", title: "Со скидкой" },
    { id: "2", title: "Скоро кончатся" },
    { id: "3", title: "К зиме" },
];

const productsData = [
    {
        id: "1",
        image: "https://via.placeholder.com/150",
        price: "$99",
        rating: 4.5,
        description: "Описание товара 1",
    },
    {
        id: "2",
        image: "https://via.placeholder.com/150",
        price: "$149",
        rating: 4.8,
        description: "Описание товара 2",
    },
];

function Main({ navigation }) {
    const { user } = useAuth();
    const fadeInStyle = useFadeIn();
    const newsScrollViewRef = useRef(null);

    const bounceScale = useSharedValue(1);
    const bounceStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: bounceScale.value }],
        };
    });

    const handleScrollEnd = (e) => {
        const contentOffset = e.nativeEvent.contentOffset.x;
        const contentWidth = e.nativeEvent.contentSize.width;
        const layoutWidth = e.nativeEvent.layoutMeasurement.width;

        if (contentOffset + layoutWidth >= contentWidth - 1) {
            // Bounce effect
            bounceScale.value = withSequence(
                withTiming(1.05, { duration: 150 }),
                withTiming(1, { duration: 150 })
            );
        }
    };

    const { animatedStyle: favButtonStyle, onPressIn: favPressIn, onPressOut: favPressOut } = usePressAnimation();
    const { animatedStyle: profilePressStyle, onPressIn: profilePressIn, onPressOut: profilePressOut } = usePressAnimation();

    const { animatedStyle: avatar3DStyle, onPressIn: avatarIn, onPressOut: avatarOut } = use3DPressAnimation();

    const renderProduct = ({ item, index }) => {
        return <ProductCard item={item} index={index} width={width} />;
    };

    return (
        <Animated.View style={[styles.container, fadeInStyle]}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate("Search")}
                >
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Поиск...${user ? `, ${user.fullName}` : ""}`}
                        placeholderTextColor="#aaa"
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
                <Animated.View style={[styles.favoritesButton, favButtonStyle]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Favorites")}
                        onPressIn={favPressIn}
                        onPressOut={favPressOut}
                    >
                        <Icon name="heart-outline" size={24} color="#ff6b81" />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <Animated.View style={[styles.profileSection, profilePressStyle]}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => navigation.navigate("Profile")}
                    onPressIn={profilePressIn}
                    onPressOut={profilePressOut}
                >
                    <Animated.View style={avatar3DStyle}>
                        <Image
                            source={{ uri: user?.avatar || "https://via.placeholder.com/80" }}
                            style={styles.avatar}
                            onTouchStart={avatarIn}
                            onTouchEnd={avatarOut}
                        />
                    </Animated.View>
                    <Text style={styles.fullName}>{user?.fullName || "Фамилия Имя"}</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.newsSection}>
                <Text style={styles.sectionTitle}>Новости</Text>
                <Animated.ScrollView
                    style={bounceStyle}
                    ref={newsScrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                    contentOffset={{ x: 0, y: 0 }}
                >
                    {newsData.map((news, index) => (
                        <NewsItem key={news.id} news={news} index={index} />
                    ))}
                </Animated.ScrollView>
            </View>

            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Категории</Text>
                <FlatList
                    data={categoriesData}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.categoryCard}>
                                <Text style={styles.categoryText}>{item.title}</Text>
                            </View>
                        );
                    }}
                />
            </View>

            <View style={styles.productsSection}>
                <Text style={styles.sectionTitle}>Товары</Text>
                <FlatList
                    data={productsData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderProduct}
                />
            </View>
        </Animated.View>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    favoritesButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    fullName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    newsSection: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
        color: "#333",
    },
    categoriesSection: {
        marginBottom: 16,
    },
    categoryCard: {
        backgroundColor: "#ff6b81",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
    },
    categoryText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    productsSection: {
        flex: 1,
    },
});
