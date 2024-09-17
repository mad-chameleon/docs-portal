import {
  createContext, FC, ReactNode, useContext, useMemo, useState,
} from 'react';

// eslint-disable-next-line functional/no-mixed-types
interface AuthContextType {
    isLoggedIn: boolean;
    // eslint-disable-next-line no-unused-vars
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
    const userLoggedIn = localStorage.getItem('authId');
    return !!userLoggedIn;
  });

  const logIn = (data: string) => {
    localStorage.setItem('authId', data);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('authId');
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
