import { useContext, createContext, type PropsWithChildren } from 'react';
import {setStorageItemAsync, useStorageState} from './useStorageState';
import {router} from "expo-router";
import {FirebaseApp, initializeApp} from "firebase/app";
import {createLogin, login} from "@/services/auth";
import {createTableUser, dropTable} from "@/services/database";

const firebaseConfig = {
    apiKey: "AIzaSyBpptZrYBSeubeKMFlti8z6EkRbTHj9dtg",
    authDomain: "tp3---react-native.firebaseapp.com",
    databaseURL: "https://tp3---react-native-default-rtdb.firebaseio.com",
    projectId: "tp3---react-native",
    storageBucket: "tp3---react-native.appspot.com",
    messagingSenderId: "737059042007",
    appId: "1:737059042007:web:d5676d5564d5df66a9b692"
  };

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);


const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    signUp: (email: string, password: string) => void;
    firebaseApp?: FirebaseApp | null;
    session?: string | null;
    isLoading: boolean;
    changeTheme: (theme: string) => void;
    theme?: string | null;
    isLoadingTheme: boolean;
}>({
    signIn: (email: string, password: string) => null,
    signOut: () => null,
    signUp: (email: string, password: string) => null,
    firebaseApp: firebaseApp,
    session: null,
    isLoading: false,
    changeTheme: async (theme: string) => null,
    theme: null,
    isLoadingTheme: false,
    // @ts-ignore
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');

    return (
        <AuthContext.Provider
            value={{
                signIn: (email: string, password: string) => {
                    return login(email, password, setSession);
                },
                signOut: async () => {
                    setSession(null);
                    await dropTable("user");
                    await createTableUser();
                    return router.replace("/login");
                },
                signUp:(email: string, password: string) => {
                    //console.log(email, password)
                    return createLogin(email, password, setSession);
                },
                    // Perform sign-in logic here
                    //return createLogin(email: string, password, setSession);
                     
                    //setSession('xxx');
                    // @ts-ignore
                    //return router.replace("(tabs)");
                //},
                changeTheme: async (theme: string) => {
                    await setStorageItemAsync('theme', theme);
                },
                firebaseApp: firebaseApp,
                session,
                isLoading,
                theme,
                isLoadingTheme,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
