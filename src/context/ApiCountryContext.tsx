/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../helpers/axiosApiCountry";

interface Country {
  flag: string;
  translations: {
    pt: string;
  };
}

interface CountriesType {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const Countries = createContext<CountriesType | undefined>(undefined);

export function ApiCountryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/all");
        const sortedCountries = response.data
          .map((country: Country) => ({
            flag: country.flag, 
            translations: {
              pt: country.translations.pt
            },
          }))
          .sort((a: Country, b: Country) => a.translations.pt.localeCompare(b.translations.pt));
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
    <Countries.Provider value={{ countries, loading, error }}>
      {children}
    </Countries.Provider>
  );
}

export function useCountries() {
  const context = useContext(Countries);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
}
