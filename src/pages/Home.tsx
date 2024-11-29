import { useBanco } from "../contexts/BancoContext";
import Header from "../components/Header";
import AccountInfo from "../components/AccountInfo";
import { useNavigate } from "react-router-dom";
import { RiFileListLine, RiCashLine } from "react-icons/ri";

const Home = () => {
    const { signOut, user } = useBanco();
    const navigate = useNavigate();

    const handleTransferList = () => {
        navigate("/transferlist");
    };

    const handleNewTransfer = () => {
        navigate("/newtransfer");
    };

    return (
        <div className="flex flex-1 items-center justify-center w-full h-full bg-background-darker">
            <div className="flex flex-1 w-[95%] h-screen bg-background-dark">
                <div className="absolute inset-0 pt-10 h-screen overflow-y-hidden">
                    <svg
                        className="absolute opacity-5 -left-[200px] h-screen overflow-visible"
                        viewBox="0 0 256 512"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z" />
                    </svg>
                </div>
                <div className="flex flex-col w-full z-50">
                    <Header />
                    <div className="flex flex-col px-10 pt-20">
                        <h2
                            className="text-text-light text-center text-4xl font-bold mb-10"
                            style={{
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                            }}
                        >
                            Olá, {user.name}!
                        </h2>
                        <div className="flex flex-col items-center justify-between w-full h-auto">
                            <AccountInfo />
                            <div className="w-full lg:max-w-[50%] pt-10 rounded-lg">
                                <button
                                    onClick={handleNewTransfer}
                                    className="w-full mx-auto bg-primary hover:bg-primary-hover py-3  rounded"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <RiCashLine className="text-text-light w-6 h-6" />
                                        <p className="text-text-light text-lg font-bold text-center tracking-wider">
                                            Nova Transferência
                                        </p>
                                    </div>
                                </button>
                            </div>
                            <div className="w-full lg:max-w-[50%] pt-10 rounded-lg">
                                <button
                                    onClick={handleTransferList}
                                    className="w-full mx-auto bg-primary hover:bg-primary-hover py-3  rounded"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <RiFileListLine className="text-text-light w-6 h-6" />
                                        <p className="text-text-light text-lg font-bold text-center tracking-wider">
                                            Lista de Transferências
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="pt-20 w-full flex">
                            <button
                                onClick={signOut}
                                className="max-w-[50%] w-full mx-auto bg-primary hover:bg-primary-hover py-1.5 rounded"
                            >
                                <span className="text-text-light text-xl font-bold text-center">
                                    Sair
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
