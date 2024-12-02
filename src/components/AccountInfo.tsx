import { useState } from "react";
import { useBanco } from "../contexts/BancoContext";
import { IoEye, IoEyeOff } from "react-icons/io5";

const AccountInfo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { accountInfo, fetchAccountInfo } = useBanco();


    // Função que alterna a visibilidade do saldo
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        fetchAccountInfo();
    };
    

    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-auto">
                <div className="mt-5 bg-background-darker w-full lg:max-w-[40%] p-5 rounded-lg">
                    <span className="text-lg text-secondary font-bold">
                        Seu saldo:{" "}
                    </span>
                    <div className="flex justify-between items-center my-2.5">
                        <span className="text-2xl text-text-light font-bold mr-2.5">
                            {isVisible
                                ? `${accountInfo.currency}: ${parseFloat(accountInfo.accountBalance.toString()).
                                toLocaleString('pt-BR', {minimumFractionDigits: 2,maximumFractionDigits: 2,})}`
                                : "********"}
                        </span>
                        <button
                            onClick={toggleVisibility}
                            className="bg-background-dark rounded-full p-2"
                            data-testid="toggle-visibility"
                        >
                            {isVisible ? (
                                <IoEyeOff
                                    size={24}
                                    className="text-text-light"
                                />
                            ) : (
                                <IoEye size={24} className="text-text-light" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
