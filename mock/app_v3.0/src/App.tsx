import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Header from "@/components/feature/Header";
import BottomNav from "@/components/feature/BottomNav";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <div className="min-h-screen bg-white font-sans relative">
          <Header />
          <main className="pt-14 md:pt-16 pb-16 md:pb-0">
            <AppRoutes />
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;