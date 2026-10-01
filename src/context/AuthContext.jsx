import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

    const login = (newToken) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    };

    const authValue = {
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

