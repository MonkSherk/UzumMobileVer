
import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useAuth } from "@/app/AuthContext";

function Login({ navigation }) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "" || password === "") {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        login({ email, password });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formCard}>
                <Text style={styles.title}>Вход</Text>
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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Нет аккаунта?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.link}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Login;

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
