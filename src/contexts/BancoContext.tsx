import { createContext, PropsWithChildren, useContext, useState } from "react";
import axios from "axios";

interface BancoContextData {
    signOut: () => void;
    signIn: ({email, password}: {email: string; password: string;}) => Promise<boolean>;
    isLoggedIn: boolean;
    isLoading: boolean;
    user: any;
    token: string;
    fetchAccountInfo: () => void;
    accountInfo: { currency: string; accountBalance: number };
}

const BancoContext = createContext<BancoContextData>({} as BancoContextData);

export function BancoProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ name: "", email: "" });
    const [token, setToken] = useState("");
    const [accountInfo, setAccountInfo] = useState({
        currency: "",
        accountBalance: 0,
    });

     // Função que obtem o dinheiro em conta usando o token do usuario
    const fetchAccountInfo = async () => {
        try {
            const response = await axios.get(
                "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAccountInfo({
                ...response.data,
                accountBalance: parseFloat(
                    response.data.accountBalance
                ).toFixed(2),
            });
        } catch (error) {
            console.log("Erro", "Falha ao obter informações da conta");
        }
    };

    // Função que obtem e efetua o login do usuario
    const signIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<boolean> => {
        try {
            setIsLoading(true);
            console.log(isLoggedIn,"primeiro");
            const response = await axios.post(
                "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login",
                {
                    email,
                    password,
                }
            );
            if (response.data.token) {
                setIsLoggedIn(true);
                setUser(response.data.user);
                setToken(response.data.token);
                console.log("Sucesso", "Login realizado com sucesso!");
                return true;
            } else {
                console.log("Erro", "Credenciais inválidas");
                return false;
            }
        } catch (error) {
            console.log("Erro", "Ocorreu um erro ao fazer login");
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <BancoContext.Provider
            value={{
                signIn,
                signOut: () => {
                    setIsLoggedIn(false);
                    setUser({ name: "", email: "" });
                    setToken("");
                    // Colocar rota para pagina de login
                },
                isLoggedIn,
                isLoading,
                user,
                token,
                fetchAccountInfo,
                accountInfo,
            }}
        >
            {children}
        </BancoContext.Provider>
    );
}

export function useBanco(): BancoContextData {
    const context = useContext(BancoContext);

    if (!context) {
        throw new Error("useBanco must be used within a BancoProvider");
    }

    return context;
}
