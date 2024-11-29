import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBanco } from "../contexts/BancoContext";
import Header from "../components/Header";
import AnimatedLoading from "../components/AnimatedLoading";

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const { signIn, isLoading } = useBanco();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateInputs = () => {
        let isValid = true;

        if (!email) {
            setEmailError("Um email é necessário para ter acesso");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("O Email esta incorreto");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Uma senha é necessária para ter acesso");
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError("A senha precisa no minimo 4 caracteres");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateInputs()) {
            const result = await signIn({ email, password });
            if (result) {
                navigate("/home");
            } else {
                setPasswordError(
                    "Dados Incorretos. Por favor, tente novamente."
                );
            }
        }
    };

    return (
        <>
            <div className="flex flex-1 items-center justify-center w-full bg-slate-950">
                <div className="flex flex-1 flex-col w-[95%] h-screen justify-between bg-background-dark">
                    <Header/>
                    <div className="flex justify-center w-full px-5 ">
                        {isLoading ? (
                            <AnimatedLoading />
                        ) : (
                            <form
                                className="flex flex-col w-full md:w-1/2"
                                onSubmit={handleSignIn}
                            >
                                <label className="text-lg text-text-light font-bold mb-2.5">
                                    Login
                                </label>
                                <input
                                    className="h-10 mb-5 pl-2 text-text-light bg-secondary rounded"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <p className="text-error text-sm mb-2.5">
                                        {emailError}
                                    </p>
                                )}

                                <label className="text-lg text-text-light font-bold mb-2.5">
                                    Senha
                                </label>
                                <input
                                    className="h-10 mb-5 pl-2 text-text-light bg-secondary rounded"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {passwordError && (
                                    <p className="text-error text-sm mb-2.5">
                                        {passwordError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-hover py-4 rounded text-text-light text-2xl font-bold my-5 cursor-pointer"
                                >
                                    Entrar
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="h-[60px] bg-secondary flex justify-center items-center">
                        <p className="text-text-light text-base font-thin cursor-pointer select-none">
                            Precisa de ajuda? Click aqui e fale conosco.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginScreen;