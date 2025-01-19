import i18next from "@/locales/i18n.config";
import { I18nextProvider } from "react-i18next";
import {  Routes, Route } from "react-router-dom";
import { routes } from "@/routes";

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </I18nextProvider>
  );
}

export default App;
