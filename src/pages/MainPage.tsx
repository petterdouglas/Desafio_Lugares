import { CardContainer } from "../components/Cards";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { useChosenCountries } from "../context/Context";

export function MainPage() {
  const { chosenCountries } = useChosenCountries();

  return (
    <>
      <NavBar />
      <SearchBar />
      <main className="w-full flex-grow-[1] flex flex-row flex-wrap gap-5 bg-white p-5 justify-center items-center md:items-start md:justify-start">
        {chosenCountries.map((country, index: number) => (
          <CardContainer
            id={index}
            key={index}
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
