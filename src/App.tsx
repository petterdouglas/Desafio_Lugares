import { ContextProvider } from "./context/Context";
import "./globals.css";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <>
      <ContextProvider>
        <MainPage />
      </ContextProvider>
    </>
  );
}

export default App;
