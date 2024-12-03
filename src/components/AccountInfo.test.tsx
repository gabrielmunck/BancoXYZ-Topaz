import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountInfo from "./AccountInfo";
import { BancoProvider } from "../contexts/BancoContext";

jest.mock("../contexts/BancoContext", () => ({
    useBanco: () => ({
        accountInfo: {
            currency: "USD",
            accountBalance: 1000.0,
        },
        fetchAccountInfo: jest.fn(),
    }),
    BancoProvider: ({ children }: React.PropsWithChildren) => children,
}));

describe("AccountInfo Component", () => {
    test("Deveria renderizar o aplicativo", () => {
        render(
            <BancoProvider>
                <AccountInfo />
            </BancoProvider>
        );
        expect(screen.getByText("********")).toBeInTheDocument();
    });
});

    test("Should toggle visibility and fetch account info when eye button is clicked", () => {
        const mockFetchAccountInfo = jest.fn();
        jest.spyOn(
            require("../contexts/BancoContext"),
            "useBanco"
        ).mockImplementation(() => ({
            accountInfo: { currency: "USD", accountBalance: 1000.0 },
            fetchAccountInfo: mockFetchAccountInfo,
        }));

        render(<AccountInfo />);

        // Initial state should show masked balance
        expect(screen.getByText("********")).toBeInTheDocument();

        // Click eye button to show balance
        const toggleButton = screen.getByTestId("toggle-visibility");
        fireEvent.click(toggleButton);

        // Balance should be visible and fetchAccountInfo should be called
        expect(screen.getByText(/USD: 1/)).toBeInTheDocument();
        expect(mockFetchAccountInfo).toHaveBeenCalled();

        // // Click again to hide balance
        fireEvent.click(toggleButton);
        expect(screen.getByText("********")).toBeInTheDocument();
        expect(mockFetchAccountInfo).toHaveBeenCalledTimes(2);
    });
