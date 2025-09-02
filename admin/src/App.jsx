import { Route, Routes } from "react-router-dom";

import { routes } from "./routers";
import ScrollToTop from "./contexts/ScrollToTop";
import DefaultLayout from "./components/layout/DefaultLayout";

import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, page: Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <DefaultLayout>
                <Page />
              </DefaultLayout>
            }
          />
        ))}
        <Route path="/login" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
