import React, { PropsWithChildren } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BancoProvider } from "../contexts/BancoContext";
import Home from "./Home";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("../contexts/BancoContext", () => ({
    useBanco: () => ({
        signIn: jest.fn(),
        signOut: jest.fn(),
        isLoggedIn: false,
        isLoading: false,
        user: { name: "Gabriel Munck", email: "gabriel@exemplo.com" },
        token: "",
        fetchAccountInfo: jest.fn(),
        accountInfo: { currency: "USD", accountBalance: 1000.0 },
        fetchTransactionHistory: jest.fn(),
        transactionHistory: [],
    }),
    BancoProvider: ({ children }: PropsWithChildren) => children,
}));

jest.mock("../components/Carousel", () => {
    return function MockCarousel() {
        return <div data-testid="mock-carousel">Carousel Mock</div>;
    };
});

describe("Home Screen", () => {
    test("Should render user name in welcome message", () => {
        render(
            <BancoProvider>
                <Home />
            </BancoProvider>
        );
        expect(screen.getByText("Olá, Gabriel Munck!")).toBeInTheDocument();
    });

    test("Deveria renderizar os botões de transferência e lista de transferências", () => {
        render(<Home />);
        expect(screen.getByText("Nova Transferência")).toBeInTheDocument();
        expect(screen.getByText("Lista de Transferências")).toBeInTheDocument();
    });

    test("Deveria deslogar quando o botão de sair é clicado", () => {
        const mockSignOut = jest.fn();
        jest.spyOn(
            require("../contexts/BancoContext"),
            "useBanco"
        ).mockImplementation(() => ({
            signOut: mockSignOut,
            user: { name: "Gabriel Munck", email: "gabriel@example.com" },
            accountInfo: { currency: "USD", accountBalance: 1000.0 },
            transactionHistory: [],
        }));
        render(<Home />);
        const logoutButton = screen.getByText("Sair");
        fireEvent.click(logoutButton);
        expect(mockSignOut).toHaveBeenCalled();
    });

    test("Deveria navegar para a tela de transferências quando o botão de Lista de transferências é clicado", () => {
        const mockNavigate = jest.fn();
        const mockSignOut = jest.fn();

        jest.spyOn(
            require("react-router-dom"),
            "useNavigate"
        ).mockImplementation(() => mockNavigate);

        jest.spyOn(
            require("../contexts/BancoContext"),
            "useBanco"
        ).mockImplementation(() => ({
            signOut: mockSignOut,
            isLoggedIn: true,
            isLoading: false,
            user: { name: "Gabriel Munck", email: "gabriel@example.com" },
            token: "mock-token",
            accountInfo: { currency: "USD", accountBalance: 1000.0 },
            transactionHistory: [],
            fetchAccountInfo: jest.fn(),
            fetchTransactionHistory: jest.fn(),
        }));

        render(
            <BancoProvider>
                <Home />
            </BancoProvider>
        );
        const transferListButton = screen.getByText("Lista de Transferências");
        fireEvent.click(transferListButton);
        expect(mockNavigate).toHaveBeenCalledWith("/transferlist");
    });

    test("Deveria navegar para a tela de nova transferência quando o botão de Nova Transferência é clicado", () => {
        const mockNavigate = jest.fn();
        const mockSignOut = jest.fn();

        jest.spyOn(
            require("react-router-dom"),
            "useNavigate"
        ).mockImplementation(() => mockNavigate);

        jest.spyOn(
            require("../contexts/BancoContext"),
            "useBanco"
        ).mockImplementation(() => ({
            signOut: mockSignOut,
            isLoggedIn: true,
            isLoading: false,
            user: { name: "Gabriel Munck", email: "gabriel@example.com" },
            token: "mock-token",
            accountInfo: { currency: "USD", accountBalance: 1000.0 },
            transactionHistory: [],
            fetchAccountInfo: jest.fn(),
            fetchTransactionHistory: jest.fn(),
        }));

        render(<Home />);
        const newTransferButton = screen.getByText("Nova Transferência");
        fireEvent.click(newTransferButton);
        expect(mockNavigate).toHaveBeenCalledWith("/newtransfer");
    });
});
