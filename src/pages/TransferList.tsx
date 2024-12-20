import { useEffect, useState } from "react";
import { useBanco } from "../contexts/BancoContext";
import HomeButton from "../components/HomeButton";

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

    //Ao montar a pagina, busca as transações
    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    // Componente que renderiza cada item da lista de transações
    const TransactionItem = ({ item }: { item: Transaction }) => (
        <div className="w-full p-4 border-b border-secondary transition-all duration-300 hover:bg-primary/10">
            <div className="text-text-light">
                <div className="flex flex-col md:flex-row">
                    <p className="font-bold text-base md:text-xl mb-1.5 md:mb-5 md:mr-2">Nome:</p>
                    <p className="text-base mb-1.5 md:mb-5 md:text-xl">{item.payeer.name}</p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <p className="font-bold text-base md:text-xl mb-1.5 md:mb-5 md:mr-2">Documento:</p>
                    <p className="text-base mb-1.5 md:mb-5 md:text-xl">{item.payeer.document}</p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <p className="font-bold text-base md:text-xl mb-1.5 md:mb-5 md:mr-2">Valor:</p>
                    <p className="text-base md:text-xl mb-1.5 md:mb-5">
                        {item.currency}:${" "}
                        {parseFloat(item.value.toString()).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <p className="font-bold text-base md:text-xl mb-1.5md:mb-5 md:mr-2">Data:</p>
                    <p className="text-base md:text-xl">{item.date}</p>
                </div>
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
        <div className="flex flex-col h-screen w-full items-center justify-center bg-background-darker">
            <div className="h-[100px] fixed top-0 w-full bg-primary flex items-center justify-center">
                <h1 className="text-3xl font-bold text-text-light tracking-wider">
                    Transferências
                </h1>
            </div>
            <div className="flex flex-col md:w-[75%] h-full bg-background-dark">
                <div className="flex flex-row justify-between items-center w-full px-5 pt-10 mb-3">
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
                <HomeButton />
            </div>
        </div>
    );
};

export default TransferList;
