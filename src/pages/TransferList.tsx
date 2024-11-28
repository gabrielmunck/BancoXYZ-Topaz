import { useEffect, useState } from "react";
import { useBanco } from "../contexts/BancoContext";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";

interface Transaction {
    value: number;
    date: string;
    currency: string;
    payeer: {
        document: string;
        name: string;
    };
}

const TransferList = () => {
    const { fetchTransactionHistory, transactionHistory } = useBanco();
    const [filter, setFilter] = useState("");
    const [filterType, setFilterType] = useState("nome");
    const navigate = useNavigate();

    //Ao montar a pagina, busca as transações
    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    // Componente que renderiza cada item da lista de transações
    const TransactionItem = ({ item }: { item: Transaction }) => (
        <div className="w-full p-4 border-b border-secondary transition-all duration-300 hover:bg-primary/10">
            <div className="text-text-light">
                <p className="font-bold text-base mb-1">Nome:</p>
                <p className="text-base mb-2">{item.payeer.name}</p>
                <p className="font-bold text-base mb-1">RG:</p>
                <p className="text-base mb-2">{item.payeer.document}</p>
                <p className="font-bold text-base mb-1">Valor:</p>
                <p className="text-base mb-2">
                    {item.currency}:{" "}
                    {parseFloat(item.value.toString()).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
                <p className="font-bold text-base mb-1">Data:</p>
                <p className="text-base">{item.date}</p>
            </div>
        </div>
    );

    // Filtra as transações com base no filtro e no tipo de filtro selecionado
    const filteredTransactions = transactionHistory.filter((item) => {
        if (filterType === "nome") {
            return item.payeer.name
                .toLowerCase()
                .includes(filter.toLowerCase());
        } else if (filterType === "valor") {
            return item.value.toString().includes(filter);
        } else if (filterType === "data") {
            return item.date.includes(filter);
        }
        return true;
    });

    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background-darker">
            <div className="h-[100px] w-full bg-primary flex items-center justify-center">
                <h1 className="text-3xl font-bold text-text-light tracking-wider">
                    Transferências
                </h1>
            </div>
            <div className="flex flex-col w-[95%] h-full bg-background-dark pt-5">
                <div className="flex flex-row justify-between items-center w-full px-5 mb-3">
                    <input
                        className="flex-1 h-12 bg-white border border-secondary rounded px-3 text-background-dark transition-all duration-300 focus:border-primary-hover focus:outline-none"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder={`Filtre por ${filterType}`}
                    />
                    <select
                        className="w-32 h-12 ml-3 bg-secondary text-text-light rounded px-2 transition-all duration-300 hover:bg-primary-hover cursor-pointer"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        data-testid="filter-type-picker"
                    >
                        <option value="nome">Nome</option>
                        <option value="valor">Valor</option>
                        <option value="data">Data</option>
                    </select>
                </div>

                <div className="flex-1 w-full overflow-auto">
                    {filteredTransactions.map((item, index) => (
                        <div
                            key={index}
                            className="transform transition-all duration-300 animate-fadeIn"
                        >
                            <TransactionItem item={item} />
                        </div>
                    ))}
                </div>

                <div className="w-full fixed bottom-0 left-0 flex justify-center p-5">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex flex-row items-center bg-secondary px-10 py-2 rounded transition-all duration-300 hover:bg-primary-hover"
                    >
                        <IoHome size={24} className="text-text-light" />
                        <span className="text-text-light font-bold ml-2">
                            Home
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferList;
