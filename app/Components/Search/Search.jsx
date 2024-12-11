
import React, { useState, useEffect } from "react";
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

const categoriesData = [
    { id: "1", title: "Все" },
    { id: "2", title: "Со скидкой" },
    { id: "3", title: "Скоро кончатся" },
    { id: "4", title: "К зиме" },
];

const allProductsData = [
    {
        id: "1",
        image: "https://via.placeholder.com/150",
        price: "$99",
        rating: 4.5,
        description: "Описание товара 1",
        category: "Со скидкой",
    },
    {
        id: "2",
        image: "https://via.placeholder.com/150",
        price: "$149",
        rating: 4.8,
        description: "Описание товара 2",
        category: "Скоро кончатся",
    },
    {
        id: "3",
        image: "https://via.placeholder.com/150",
        price: "$199",
        rating: 4.9,
        description: "Описание товара 3",
        category: "К зиме",
    },
];

function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [filteredProducts, setFilteredProducts] = useState(allProductsData);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, selectedCategory]);

    const filterProducts = () => {
        let filtered = allProductsData;

        if (selectedCategory !== "Все") {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Поиск товаров..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="filter-outline" size={24} color="#ff6b81" />
                </TouchableOpacity>
            </View>

            <View style={styles.filtersSection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categoriesData.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryCard,
                                selectedCategory === category.title && styles.categoryCardSelected,
                            ]}
                            onPress={() => setSelectedCategory(category.title)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.title && styles.categoryTextSelected,
                                ]}
                            >
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.productsSection}>
                {filteredProducts.length === 0 ? (
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>Нет товаров по заданным критериям.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.productsList}
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
                )}
            </View>
        </View>
    );
}

export default Search;

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
    filterButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    filtersSection: {
        marginBottom: 16,
    },
    categoryCard: {
        backgroundColor: "#ffffff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    categoryCardSelected: {
        backgroundColor: "#ff6b81",
    },
    categoryText: {
        color: "#555",
        fontSize: 14,
        fontWeight: "600",
    },
    categoryTextSelected: {
        color: "#fff",
    },
    productsSection: {
        flex: 1,
    },
    productsList: {
        paddingBottom: 16,
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
    noResults: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    noResultsText: {
        fontSize: 16,
        color: "#555",
    },
});
