import { useBanco } from "../contexts/BancoContext";
import { useState } from "react";
import Header from "../components/Header";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Home = () => {
    const { signOut, user, accountInfo, fetchAccountInfo  } = useBanco();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        fetchAccountInfo();
    };
    return (
        <div className="flex flex-1 items-center justify-center w-full bg-background-darker">
            <div className="flex flex-1 w-[95%] h-screen bg-background-dark">
                <div className="flex flex-col w-full">
                    <Header/>
                    <div className="px-10 pt-20">
                        <h2 className="text-text-light text-center lg:text-left lg:pl-20 text-4xl mb-10">
                            Olá, {user.name}!
                        </h2>

                        <div className="flex flex-col items-center justify-center w-full h-auto">
                            <div className="mt-5 bg-background-darker w-full lg:max-w-[50%] p-5 rounded-lg">
                                <span className="text-lg text-secondary font-bold">
                                    Seu saldo:{" "}
                                </span>
                                <div className="flex justify-between items-center my-2.5">
                                    <span className="text-2xl text-text-light font-bold mr-2.5">
                                        {isVisible
                                            ? `${accountInfo.currency}: ${parseFloat(
                                                accountInfo.accountBalance.toString()
                                            ).toLocaleString('pt-BR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}`
                                            : "********"}
                                    </span>
                                    <button
                                        onClick={toggleVisibility}
                                        className="bg-background-dark rounded-full p-2"
                                        data-testid="toggle-visibility"
                                    >
                                        {isVisible ? (
                                            <IoEyeOff size={24} className="text-text-light" />
                                        ) : (
                                            <IoEye size={24} className="text-text-light" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5 w-full flex">
                                <button
                                    onClick={signOut}
                                    className="max-w-[50%] w-full mx-auto bg-primary hover:bg-primary-hover py-1.5 rounded"
                                >
                                    <span className="text-text-light text-base font-bold text-center">
                                        Sair
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;