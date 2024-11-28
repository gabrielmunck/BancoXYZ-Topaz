import { useBanco } from "../contexts/BancoContext";
import Header from "../components/Header";

const Home = () => {
    const { signOut, user } = useBanco();

    return (
        <div className="flex flex-1 items-center justify-center w-full bg-slate-950">
            <div className="flex flex-1 flex-col w-[95%] h-screen justify-between bg-background-dark">
                <Header />
                <div className=" w-full flex justify-center">
                    <div className="bg-primary ">
                        <h1 className="text-text-light text-2xl font-bold">
                            Bem-vindo(a) de volta! {user.name}
                        </h1>
                    </div>
                </div>
                <button
                    onClick={signOut}
                    className="text-text-light text-2xl font-bold"
                >
                    Sair
                </button>
            </div>
        </div>
    );
};

export default Home;
