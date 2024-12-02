import React, { PropsWithChildren } from "react";
import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup,
} from "@testing-library/react";
import LoginScreen from "./LoginScreen";
import { BancoProvider } from "../contexts/BancoContext";

afterEach(() => {
    cleanup();
});

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
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
    test("Deve renderizar os textos Login e Senha", () => {
        render(
            <BancoProvider>
                <LoginScreen />
            </BancoProvider>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Senha")).toBeInTheDocument();
    });

    test("Deveria mostrar mensagem de email necessario", async () => {
        const { getByText } = render(<LoginScreen />);
        const submitButton = getByText("Entrar");
        fireEvent.click(submitButton);
        expect(
            getByText("Um email é necessário para ter acesso")
        ).toBeInTheDocument();
    });

    test("Deve mostrar erro na senha caso a senha seja menor que 4 caracteres ", async () => {
        const { getByText } = render(<LoginScreen />);
        const submitButton = getByText("Entrar");
        fireEvent.click(submitButton);
        expect(
            getByText("Uma senha é necessária para ter acesso")
        ).toBeInTheDocument();
    });

    test("Deve mostrar erro após colocar um email em formato diferente do padrao", async () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText("Email");
        fireEvent.change(emailInput, { target: { value: "invalidemail" } });
        const submitButton = getByText("Entrar");
        fireEvent.click(submitButton);
        expect(getByText("O Email esta incorreto")).toBeInTheDocument();
    });

    test("Caso os dados estajam corretos, deve ser chamado a funcao signIn", async () => {
        const mockSignIn = jest.fn().mockResolvedValue(true);
        jest.spyOn(require("../contexts/BancoContext"),"useBanco").mockImplementation(() => ({
            signIn: mockSignIn,
            isLoading: false,
        }));

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Senha");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        const submitButton = getByText("Entrar");
        fireEvent.click(submitButton);

        expect(mockSignIn).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
        });
    });
});
