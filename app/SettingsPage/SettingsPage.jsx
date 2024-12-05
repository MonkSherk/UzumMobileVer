
import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Settings({ navigation }) {
    const [fullName, setFullName] = useState("Фамилия Имя");
    const [email, setEmail] = useState("email@example.com");

    const handleSave = () => {
        Alert.alert("Успех", "Ваш профиль был обновлён.");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Icon name="person-outline" size={24} color="#ff6b81" />
                <TextInput
                    style={styles.input}
                    placeholder="ФИО"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>
            <View style={styles.inputGroup}>
                <Icon name="mail-outline" size={24} color="#ff6b81" />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: "#333",
    },
    saveButton: {
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
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
