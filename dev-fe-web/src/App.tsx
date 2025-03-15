import i18next from "@/locales/i18n.config";
import { I18nextProvider } from "react-i18next";
import {  RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/admin/custom/theme-provider";
import { AuthProvider } from "@/context/AuthProvider";
import { RootRouter } from "@/routes/RootRouter";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider storageKey="vite-ui-theme">
          <RouterProvider router={RootRouter}></RouterProvider>
          <Toaster />
        </ThemeProvider>
      </I18nextProvider>
    </AuthProvider>
  );
}

export default App;
