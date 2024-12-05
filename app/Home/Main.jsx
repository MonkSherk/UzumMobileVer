// Main.jsx
import React, { useRef } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    FlatList,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const newsData = [
    { id: "1", title: "Новость 1", description: "Описание новости 1" },
    { id: "2", title: "Новость 2", description: "Описание новости 2" },
    { id: "3", title: "Новость 3", description: "Описание новости 3" },
    // Добавьте больше новостей по необходимости
];

const categoriesData = [
    { id: "1", title: "Со скидкой" },
    { id: "2", title: "Скоро кончатся" },
    { id: "3", title: "К зиме" },
    // Добавьте больше категорий по необходимости
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
    // Добавьте больше товаров по необходимости
];

function Main({ navigation, data }) {
    const newsScrollViewRef = useRef(null);

    const handleScrollEnd = (e) => {
        const contentOffset = e.nativeEvent.contentOffset.x;
        const contentWidth = e.nativeEvent.contentSize.width;
        const layoutWidth = e.nativeEvent.layoutMeasurement.width;

        // Проверяем, достиг ли пользователь конца ScrollView
        if (contentOffset + layoutWidth >= contentWidth - 1) { // -1 для учета погрешностей
            if (newsScrollViewRef.current) {
                newsScrollViewRef.current.scrollTo({ x: 0, animated: false });
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate("Search")}
                >
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск..."
                        placeholderTextColor="#aaa"
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.favoritesButton}
                    onPress={() => navigation.navigate("Favorites")}
                >
                    <Icon name="heart-outline" size={24} color="#ff6b81" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.profileSection}
                onPress={() => navigation.navigate("Profile")}
            >
                <Image
                    source={{ uri: "https://via.placeholder.com/80" }}
                    style={styles.avatar}
                />
                <Text style={styles.fullName}>Фамилия Имя</Text>
            </TouchableOpacity>

            <View style={styles.newsSection}>
                <Text style={styles.sectionTitle}>Новости</Text>
                <ScrollView
                    ref={newsScrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                    // Устанавливаем начальную позицию на 0
                    contentOffset={{ x: 0, y: 0 }}
                >
                    {newsData.map((news) => (
                        <View key={news.id} style={styles.newsCard}>
                            <Text style={styles.newsTitle}>{news.title}</Text>
                            <Text style={styles.newsDescription}>{news.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Категории</Text>
                <FlatList
                    data={categoriesData}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryCard}>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.productsSection}>
                <Text style={styles.sectionTitle}>Товары</Text>
                <FlatList
                    data={productsData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
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
                        </View>
                    )}
                />
            </View>
        </View>
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
