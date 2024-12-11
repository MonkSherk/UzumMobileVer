import React, { createContext, useState, useContext } from "react";

const usersDB = {
    "ivan@example.com": {
        fullName: "Иван Иванов",
        password: "123456",
        token: "fake_jwt_token_ivan",
    },
};

const AuthContext = createContext({
    token: null,
    authorized: false,
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    updateProfile: () => {},
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

    const updateProfile = ({ fullName, email }) => {
        if (!user) {
            alert("Пользователь не авторизован.");
            return;
        }

        const oldEmail = user.email;
        if (email !== oldEmail) {
            if (usersDB[email]) {
                alert("Пользователь с таким email уже существует.");
                return;
            }
            const oldUserData = usersDB[oldEmail];
            delete usersDB[oldEmail];
            usersDB[email] = {
                ...oldUserData,
                fullName,
            };
            setUser({ email, fullName });
            setAuthorized(true);
            alert("Профиль обновлён успешно!");
        } else {
            usersDB[email].fullName = fullName;
            setUser({ email, fullName });
            alert("Профиль обновлён успешно!");
        }
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
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
