import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MainPage } from "./MainPage";
import { SearchBar } from "../components/SearchBar";
import { NavBar } from "../components/NavBar";

// 1. Mock do NavBar para verificar se foi renderizado
vi.mock("../components/NavBar.tsx", () => ({
  NavBar: () => <nav data-testid="navbar-mock">NavBar Mock</nav>
}));

// 2. Mock do SearchBar para isolar o teste
vi.mock("../components/SearchBar.tsx", () => ({
  SearchBar: () => <div data-testid="searchbar-mock">SearchBar Mock</div>
}));

// 3. Mock do DataContext
vi.mock("../context/DataContext", () => ({
  useDataCountries: () => ({
    chosenCountries: [],
    loading: false,
    error: null
  })
}));

describe("MainPage", () => {
  test("deve renderizar o componente NavBar corretamente", () => {
    render(<NavBar />);
    
    // Verifica se o mock do NavBar foi renderizado
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
    expect(screen.getByText("NavBar Mock")).toBeInTheDocument();
  });

  test("deve renderizar o componente SearchBar corretamente", () => {
    render(<SearchBar />);
    
    // Verifica se o mock do NavBar foi renderizado
    expect(screen.getByTestId("searchbar-mock")).toBeInTheDocument();
    expect(screen.getByText("SearchBar Mock")).toBeInTheDocument();
  });

  test("não deve renderizar mensagens de loading ou erro inicialmente", () => {
    render(<MainPage />);
    
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    expect(screen.queryByText("Erro ao carregar")).not.toBeInTheDocument();
  });
});