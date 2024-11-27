import React, { useState } from "react";
import { useBanco } from "../contexts/BancoContext";


const LoginScreen: React.FC = () => {
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
            if (!result) {
                setPasswordError("Dados Incorretos. Por favor, tente novamente.");
            }
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center w-full bg-slate-950">
            <div className="flex flex-1 flex-col w-[95%] h-screen justify-between bg-[#1B262C]">
                <div className="h-[100px] bg-[#0F4C75] flex justify-center items-center">
                    <h1 className="text-white text-3xl font-bold">BancoXYZ</h1>
                </div>
                
                <div className="flex justify-center w-full px-5 ">
                    {isLoading ? (
                        <div className="flex flex-col">
                            Carregando...
                        </div>
                    ) : (
                        <form className="flex flex-col w-full md:w-1/2" onSubmit={handleSignIn}>
                            <label className="text-lg text-white font-bold mb-2.5">Login</label>
                            <input
                                className="h-10 mb-5 pl-2 text-[#f0f0f0] bg-[#3282B8] rounded"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <p className="text-[#FF3B30] text-sm mb-2.5">{emailError}</p>}
                            
                            <label className="text-lg text-[#f0f0f0] font-bold mb-2.5">Senha</label>
                            <input
                                className="h-10 mb-5 pl-2 text-[#f0f0f0 bg-[#3282B8] rounded"
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className="text-[#FF3B30] text-sm mb-2.5">{passwordError}</p>}
                            
                            <button
                                type="submit"
                                className="w-full bg-[#0F4C75] hover:bg-[#3282B8] py-4 rounded text-[#f0f0f0] text-2xl font-bold my-5 cursor-pointer"
                            >
                                Entrar
                            </button>
                        </form>
                    )}
                </div>
                
                <div className="h-[60px] bg-[#3282B8] flex justify-center items-center">
                    <p className="text-[#f0f0f0] text-base font-thin cursor-pointer select-none">
                        Precisa de ajuda? Click aqui e fale conosco.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;

