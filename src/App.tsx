import { ApiCountryContextProvider } from "./context/ApiCountryContext";
import { DataContextProvider } from "./context/DataContext";
import { MenuContextProvider } from "./context/MenuContext";
import "./globals.css";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <DataContextProvider>
        <MenuContextProvider>
          <ApiCountryContextProvider>
            <MainPage />
          </ApiCountryContextProvider>
        </MenuContextProvider>
      </DataContextProvider>
    </>
  );
}

export default App;
