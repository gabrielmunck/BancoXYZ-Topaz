import axios from "axios";
import { useState } from "react";
import { useBanco } from "../contexts/BancoContext";
import HomeButton from "../components/HomeButton";
import { useNavigate } from "react-router-dom";

const NewTransfer = () => {
    const { token } = useBanco();
    const navigate = useNavigate();

    const [value, setValue] = useState("");
    const [document, setDocument] = useState("");
    const [date, setDate] = useState("");

    const [valueError, setValueError] = useState("");
    const [documentError, setDocumentError] = useState("");
    const [dateError, setDateError] = useState("");

    // Função que envia os dados do formulario para o banco
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValueValid = validateValue(value);
        const isDocumentValid = validateDocument(document);
        const isDateValid = validateDate(date);

        if (isValueValid && isDocumentValid && isDateValid) {
            try {
                await axios.post(
                    "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
                    {
                        value: parseFloat(value),
                        currency: "USD",
                        payeerDocument: document,
                        transferDate: date.split("/").reverse().join("-"),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Transferência realizada com sucesso!");
                navigate("/Home");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Funções de validação dos campos
    const validateValue = (val: string): boolean => {
        if (!val) {
            setValueError("Valor é obrigatório");
            return false;
        }
        if (isNaN(parseFloat(val)) || parseFloat(val) <= 0) {
            setValueError("Valor deve ser um número positivo");
            return false;
        }
        setValueError("");
        return true;
    };

    const validateDocument = (document: string): boolean => {
        const numberRegex = /^\d{11}$/;
        
        if (!document) {
            setDocumentError("Documento é obrigatório");
            return false;
        }
        
        if (!numberRegex.test(document)) {
            setDocumentError("Documento deve conter exatamente 11 números");
            return false;
        }
        
        setDocumentError("");
        return true;
    };

    const validateDate = (date: string): boolean => {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!date || !regex.test(date)) {
            setDateError(
                "Data inválida. Use o formato DD/MM/YYYY, exemplo: 01/01/2023"
            );
            return false;
        }
        setDateError("");
        return true;
    };

    return (
        <div className="flex flex-col justify-center min-h-screen bg-background-dark p-5">
            <h1 className="text-4xl font-bold text-text-light mb-14 text-center">
                Nova Transferência
            </h1>

            <div className="flex items-center justify-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className=" w-full max-w-[540px] p-6 rounded-lg shadow-lg bg-background-darker"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="value"
                            className="block text-text-light text-lg font-bold mb-2"
                        >
                            Valor
                        </label>
                        <input
                            id="value"
                            className="w-full px-3 py-2 bg-text-light text-background-dark rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Digite o valor"
                            type="number"
                            required
                            maxLength={20}
                        />
                        {valueError && (
                            <p className="mt-2 p-2 bg-error/10 text-error rounded">
                                {valueError}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="document"
                            className="block text-text-light text-lg font-bold mb-2"
                        >
                            Documento
                        </label>
                        <input
                            id="document"
                            className="w-full px-3 py-2 bg-text-light text-background-dark rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            placeholder="Digite o documento"
                            maxLength={11}
                        />
                        {documentError && (
                            <p className="mt-2 p-2 bg-error/10 text-error rounded">
                                {documentError}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="date"
                            className="block text-text-light text-lg font-bold mb-2"
                        >
                            Data
                        </label>
                        <input
                            id="date"
                            className="w-full px-3 py-2 bg-text-light text-background-dark rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            required
                        />
                        {dateError && (
                            <p className="mt-2 p-2 bg-error/10 text-error rounded">
                                {dateError}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-text-light font-bold py-3 px-4 rounded hover:bg-primary-hover transition duration-200"
                    >
                        Transferir
                    </button>
                </form>
            </div>
            <HomeButton />
        </div>
    );
};

export default NewTransfer;
