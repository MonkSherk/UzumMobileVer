// app/authContext.js
import React, { createContext, useState, useContext } from "react";

const usersDB = {
    "Test@mail.ru": {
        fullName: "Test",
        password: "123456",
        token: "token",
    },
};

const AuthContext = createContext({
    token: null,
    authorized: false,
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    checkUserExists: () => false,
});

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    const login = ({ email, password }) => {
        if (usersDB[email] && usersDB[email].password === password) {
            setToken(usersDB[email].token);
            setUser({ email, fullName: usersDB[email].fullName });
            setAuthorized(true);
        } else {
            setAuthorized(false);
            setToken(null);
            setUser(null);
            alert("Неверный email или пароль.");
        }
    };

    const register = ({ fullName, email, password }) => {
        if (usersDB[email]) {
            // Пользователь уже существует
            setAuthorized(false);
            alert("Пользователь с таким email уже существует.");
            return;
        }
        const newToken = "fake_jwt_token_" + email;
        usersDB[email] = { fullName, password, token: newToken };
        setUser({ email, fullName });
        setToken(newToken);
        setAuthorized(true);
        alert("Регистрация успешна!");
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setAuthorized(false);
    };

    const checkUserExists = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                authorized,
                user,
                login,
                logout,
                register,
                checkUserExists,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
