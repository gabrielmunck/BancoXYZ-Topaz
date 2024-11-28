import { useBanco } from "../contexts/BancoContext";

const Home = () => {
    const { signOut } = useBanco();

    return (
        <div>
            <h1>Bem-vindo à página principal!</h1>
            <button onClick={signOut}>Sair</button>
        </div>
    );
};

export default Home;
