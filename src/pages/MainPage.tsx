import { CardContainer } from "../components/Cards";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { useDataCountries } from "../context/DataContext";

export function MainPage() {
  const { chosenCountries } = useDataCountries();

  return (
    <>
      <NavBar />
      <SearchBar />
      <main className="w-full flex-grow-[1] flex flex-row flex-wrap gap-5 bg-white p-5 justify-center items-center md:items-start">
        {chosenCountries.map((country) => (
          <CardContainer
            id={country.id}
            key={country.id}
            countryName={country.countryName}
            flag={country.flag}
            local={country.local}
            date={country.date}
          />
        ))}
      </main>
    </>
  );
}
