// app/SettingsPage/Settings.jsx
import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    Alert,
    StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "@/app/AuthContext";
import Animated from 'react-native-reanimated';
import { useFadeIn } from "../hooks/useFadeIn";
import { usePressAnimation } from "../hooks/usePressAnimation";
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

function Settings({ navigation }) {
    const { user, updateProfile } = useAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const fadeInStyle = useFadeIn();

    const { animatedStyle: saveButtonStyle, onPressIn: savePressIn, onPressOut: savePressOut } = usePressAnimation();

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = () => {
        if (fullName.trim() === "" || email.trim() === "") {
            Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Ошибка", "Пожалуйста, введите корректный email.");
            return;
        }

        updateProfile({ fullName, email });
        navigation.goBack();
    };

    return (
        <Animated.View style={[styles.container, fadeInStyle]}>
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
                    autoCapitalize="none"
                />
            </View>
            <AnimatedTouchableOpacity
                style={[styles.saveButton, saveButtonStyle]}
                onPress={handleSave}
                onPressIn={savePressIn}
                onPressOut={savePressOut}
            >
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </AnimatedTouchableOpacity>
        </Animated.View>
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
