import { Route, Routes } from "react-router-dom";

import { routes } from "./routers";
import ScrollToTop from "./contexts/ScrollToTop";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
