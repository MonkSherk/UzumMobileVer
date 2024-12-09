
import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useAuth } from "../AuthContext";

function Register({ navigation }) {
    const { register } = useAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (fullName === "" || email === "" || password === "") {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        register({ fullName, email, password });
        // После регистрации состояние `authorized` изменится, и `RootNavigator` покажет `MainTabs`
    };

    return (
        <View style={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.title}>Регистрация</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Полное имя"
                    placeholderTextColor="#aaa"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Уже есть аккаунт?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.link}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        padding: 16,
    },
    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#333",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: "#333",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#ff6b81",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    footerText: {
        fontSize: 14,
        color: "#333",
        marginRight: 4,
    },
    link: {
        fontSize: 14,
        color: "#ff6b81",
        fontWeight: "600",
    },
});
