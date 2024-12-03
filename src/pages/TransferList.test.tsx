import React, { PropsWithChildren } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TransferList from "./TransferList";
import { BancoProvider } from "../contexts/BancoContext";

const mockTransactions = [
    {
        value: 1000.00,
        date: "2023-10-20",
        currency: "USD",
        payeer: {
            document: "123.456.789-00",
            name: "John Doe"
        }
    },
    {
        value: 2000.00,
        date: "2023-10-21",
        currency: "USD",
        payeer: {
            document: "987.654.321-00",
            name: "Jane Smith"
        }
    }
];

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn()
}));

jest.mock("../contexts/BancoContext", () => ({
    useBanco: () => ({
        fetchTransactionHistory: jest.fn(),
        transactionHistory: mockTransactions,
        isLoggedIn: true,
        isLoading: false,
        user: { name: "Test User", email: "test@example.com" },
        token: "mock-token",
        accountInfo: { currency: "USD", accountBalance: 1000.0 }
    }),
    BancoProvider: ({ children }: PropsWithChildren) => children
}));

describe("TransferList Screen", () => {
    test("Deveria renderizar o cabeçalho da tela", () => {
        render(
            <BancoProvider>
                <TransferList />
            </BancoProvider>
        );
        expect(screen.getByText("Transferências")).toBeInTheDocument();
    });

    test("Deveria renderizar todas as transferências do contexto", () => {
        render(
            <BancoProvider>
                <TransferList />
            </BancoProvider>
        );
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    test("Funcionalidade do filtro por nome", () => {
        render(<TransferList />);
        const filterInput = screen.getByPlaceholderText("Filtre por nome");
        fireEvent.change(filterInput, { target: { value: "John" } });
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });

    test("Funcionalidade do Filtro por valor", () => {
        render(<TransferList />);
        const filterTypePicker = screen.getByTestId("filter-type-picker");
        fireEvent.change(filterTypePicker, { target: { value: "valor" } });
        
        const filterInput = screen.getByPlaceholderText("Filtre por valor");
        fireEvent.change(filterInput, { target: { value: "1000" } });
        
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
    
    test("Funcionalidade do Filtro por data", () => {
        render(<TransferList />);
        const filterTypePicker = screen.getByTestId("filter-type-picker");
        fireEvent.change(filterTypePicker, { target: { value: "data" } });
        
        const filterInput = screen.getByPlaceholderText("Filtre por data");
        fireEvent.change(filterInput, { target: { value: "2023-10-21" } });
        
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
    
    test("Ao montar o componente deve chamar a funcao fetchTransactionHistory", () => {
        const mockFetch = jest.fn();
        jest.spyOn(require("../contexts/BancoContext"), "useBanco").mockImplementation(() => ({
            fetchTransactionHistory: mockFetch,
            transactionHistory: mockTransactions
        }));
        
        render(<TransferList />);
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });



});


