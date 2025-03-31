/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../helpers/axiosApiLocal";

interface ChosenCountry {
  id: number;
  countryName: string;
  flag: string | null;
  local: string;
  date: string;
}

interface ChosenCountriesType {
  chosenCountries: ChosenCountry[];
  loading: boolean;
  error: string | null;
  addChosenCountry: (country: Omit<ChosenCountry, "id">) => Promise<void>;
  editChosenCountry: (
    index: number,
    updates: Partial<ChosenCountry>
  ) => Promise<void>;
  removeChosenCountry: (index: number) => Promise<void>;
}

const ChosenCountries = createContext<ChosenCountriesType | undefined>(
  undefined
);

export function DataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chosenCountries, setChosenCountries] = useState<ChosenCountry[]>([]);

  useEffect(() => {
    const fetchChosenCountries = async () => {
      try {
        const response = await axiosInstance.get("/countries");
        setChosenCountries(response.data);
      } catch (err) {
        setError("Failed to fetch countries");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChosenCountries();
  }, []);

  const addChosenCountry = async (country: Omit<ChosenCountry, "id">) => {
    try {
      const response = await axiosInstance.post("/countries", country);
      setChosenCountries((prev) => [...prev, response.data]);
    } catch (err) {
      setError("Erro ao adicionar país");
      throw err;
    }
  };

  const editChosenCountry = async (
    id: number,
    updates: Partial<ChosenCountry>
  ) => {
    try {
      await axiosInstance.patch(`countries/${id}`, updates);
      setChosenCountries((prev) =>
        prev.map((country) =>
          country.id === id ? { ...country, ...updates } : country
        )
      );
    } catch (err) {
      setError("Erro ao editar país");
      throw err;
    }
  };

  const removeChosenCountry = async (id: number) => {
    try {
      await axiosInstance.delete(`countries/${id}`);
      setChosenCountries((prev) => prev.filter((country) => country.id !== id));
    } catch (err) {
      setError("Erro ao remover país");
      throw err;
    }
  };

  return (
    <ChosenCountries.Provider
      value={{
        chosenCountries,
        loading,
        error,
        addChosenCountry,
        editChosenCountry,
        removeChosenCountry,
      }}
    >
      {children}
    </ChosenCountries.Provider>
  );
}

export function useDataCountries() {
  const context = useContext(ChosenCountries);
  if (context === undefined) {
    throw new Error("useDataCountries must be used whitin a MenuProvider");
  }
  return context;
}
