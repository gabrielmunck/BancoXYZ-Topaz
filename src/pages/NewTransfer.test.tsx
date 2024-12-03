import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import NewTransfer from "./NewTransfer";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock("../contexts/BancoContext", () => ({
    useBanco: () => ({
        token: "mock-token",
    }),
}));

describe("NewTransfer Screen", () => {

    beforeAll(() => {
        window.alert = jest.fn();
    });
    

    test("Deve renderizar o formulário de transferência com botão", () => {
        render(<NewTransfer />);
        
        expect(screen.getByLabelText("Valor")).toBeInTheDocument();
        expect(screen.getByLabelText("Documento")).toBeInTheDocument();
        expect(screen.getByLabelText("Data")).toBeInTheDocument();
        expect(screen.getByText("Transferir")).toBeInTheDocument();
    });

    test("Deve mostrar o erro de cada campo do formulario", async () => {
        render(<NewTransfer />);
        
        const submitButton = screen.getByText("Transferir");
        fireEvent.click(submitButton);

        expect(await screen.findByText("Valor é obrigatório")).toBeInTheDocument();
        expect(await screen.findByText("Documento é obrigatório")).toBeInTheDocument();
        expect(await screen.findByText("Data inválida. Use o formato DD/MM/YYYY, exemplo: 01/01/2023")).toBeInTheDocument();
    });

    test("Should validate document format", () => {
        render(<NewTransfer />);
        
        const documentInput = screen.getByLabelText("Documento");
        fireEvent.change(documentInput, { target: { value: "123" } });
        
        const submitButton = screen.getByText("Transferir");
        fireEvent.click(submitButton);

        expect(screen.getByText("Documento deve conter exatamente 11 números")).toBeInTheDocument();
    });

    test("Should validate value format", () => {
        render(<NewTransfer />);
        
        const valueInput = screen.getByLabelText("Valor");
        fireEvent.change(valueInput, { target: { value: "-100" } });
        
        const submitButton = screen.getByText("Transferir");
        fireEvent.click(submitButton);

        expect(screen.getByText("Valor deve ser um número positivo")).toBeInTheDocument();
    });

    test("Should submit form with valid data", async () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate")
            .mockImplementation(() => mockNavigate);
        
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

        render(<NewTransfer />);
        
        fireEvent.change(screen.getByLabelText("Valor"), { target: { value: "100" } });
        fireEvent.change(screen.getByLabelText("Documento"), { target: { value: "12345678911" } });
        fireEvent.change(screen.getByLabelText("Data"), { target: { value: "01/01/2025" } });
        
        const submitButton = screen.getByText("Transferir");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
                {
                    value: 100,
                    currency: "USD",
                    payeerDocument: "12345678911",
                    transferDate: "2025-01-01"
                },
                {
                    headers: {
                        Authorization: "Bearer mock-token"
                    }
                }
            );
            expect(window.alert).toHaveBeenCalledWith("Transferência realizada com sucesso!");
            expect(mockNavigate).toHaveBeenCalledWith("/Home");
        });
    });
});
