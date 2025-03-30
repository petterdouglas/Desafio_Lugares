/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../helpers/axios";

interface Country {
  name: string;
  flag: string;
}

interface ChosenCountry {
  countryName: string;
  flag: string | null;
  local: string;
  date: string;
}

interface CountriesType {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

interface MenuType {
  isActived: boolean;
  setIsActived: (value: boolean) => void;
}

interface ChosenCountriesType {
  chosenCountries: ChosenCountry[];
  addChosenCountry: (country: ChosenCountry) => void;
  removeChosenCountry: (index: number) => void;
}

const Countries = createContext<CountriesType | undefined>(undefined);
const Menu = createContext<MenuType | undefined>(undefined);
const ChosenCountries = createContext<ChosenCountriesType | undefined>(
  undefined
);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActived, setIsActived] = useState<boolean>(false);
  const [chosenCountries, setChosenCountries] = useState<ChosenCountry[]>([]);

  const addChosenCountry = (newCountry: ChosenCountry) => {
    setChosenCountries((prev) => [...prev, newCountry]);
  };

  const removeChosenCountry = (index: number) => {
    setChosenCountries((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/all");
        const sortedCountries = response.data.sort((a: Country, b: Country) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);
      } catch (err) {
        setError("Failed to fetch countries");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);
  return (
    <ChosenCountries.Provider
      value={{ chosenCountries, addChosenCountry, removeChosenCountry }}
    >
      <Menu.Provider value={{ isActived, setIsActived }}>
        <Countries.Provider value={{ countries, loading, error }}>
          {children}
        </Countries.Provider>
      </Menu.Provider>
    </ChosenCountries.Provider>
  );
}

export function useCountries() {
  const context = useContext(Countries);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
}

export function useMenuBar() {
  const context = useContext(Menu);
  if (context === undefined) {
    throw new Error("useMenuBar must be used whitin a MenuProvider");
  }
  return context;
}

export function useChosenCountries() {
  const context = useContext(ChosenCountries);
  if (context === undefined) {
    throw new Error("useMenuBar must be used whitin a MenuProvider");
  }
  return context;
}
