import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Header from "./Header"


afterEach(() => {
  cleanup();
});


test('renderiza o cabeçalho corretamente', () => {
  render(<Header />);
  const linkElement = screen.getByText(/BancoXYZ/i);
  expect(linkElement).toBeInTheDocument();
});