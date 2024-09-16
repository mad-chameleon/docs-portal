import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    logIn: (data: string) => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const userLoggedIn = localStorage.getItem('userData');
        return !!userLoggedIn;
    });

    const logIn = (data: string) => {
        localStorage.setItem('userData', JSON.stringify(data));
        setIsLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
    };

    const contextValue = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
