import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";

export function MainPage() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <main className="w-full flex-grow-[1] bg-white "></main>
    </>
  );
}
