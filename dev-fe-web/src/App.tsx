import i18next from "@/locales/i18n.config";
import { I18nextProvider } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { routes } from "@/routes";
import { ThemeProvider } from "@/components/custom/theme-provider";

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider storageKey="vite-ui-theme">
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
