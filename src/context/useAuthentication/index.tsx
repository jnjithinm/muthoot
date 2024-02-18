import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, FC, ReactNode, useContext} from 'react';

interface AuthenticationContextTypes {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  ActivateLoggingIn: () => void;
  ActivateLoggingOut: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextTypes>({
  isLoggedIn: false,
  isLoggedOut: false,
  ActivateLoggingIn: () => {},
  ActivateLoggingOut: () => {},
});

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const ActivateLoggingIn = () => {
    setIsLoggedIn(true);
  };

  const ActivateLoggingOut = async () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    await AsyncStorage.removeItem('employeeId');
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthenticationContext.Provider
      value={{isLoggedIn, isLoggedOut, ActivateLoggingIn, ActivateLoggingOut}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
export const useAuthentication = (): AuthenticationContextTypes =>
  useContext(AuthenticationContext);
