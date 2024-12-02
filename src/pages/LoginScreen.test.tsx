import React, { PropsWithChildren } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import LoginScreen from "./LoginScreen";
import Header from "../components/Header";
import { BancoProvider } from "../contexts/BancoContext";

afterEach(() => {
    cleanup();
});

test("renderiza o cabeçalho corretamente", () => {
    render(<Header />);
    const linkElement = screen.getByText(/BancoXYZ/i);
    expect(linkElement).toBeInTheDocument();
});

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}));

jest.mock("../contexts/BancoContext", () => ({
    useBanco: () => ({
        signIn: jest.fn(),
        signOut: jest.fn(),
        isLoggedIn: false,
        isLoading: false,
        user: { name: "", email: "" },
        token: "",
        fetchAccountInfo: jest.fn(),
        accountInfo: { currency: "", accountBalance: 0 },
        fetchTransactionHistory: jest.fn(),
        transactionHistory: [],
    }),
    BancoProvider: ({ children }: PropsWithChildren) => children,
}));

describe("LoginScreen", () => {
    test("should display Login and Senha text", () => {
        render(
            <BancoProvider>
                <LoginScreen />
            </BancoProvider>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Senha")).toBeInTheDocument();
    });
});
