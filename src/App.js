import { BrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
// import { CurrentPageProvider } from './hooks/currentPageContext';
import TailWindCssLoader from "./components/others/tailwindcssLoader";
import { AuthProvider } from "./hooks/authContext";

export default function App() {
  return (
    <>
      <TailWindCssLoader />
      <BrowserRouter>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
