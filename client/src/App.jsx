import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./router";
import DefaultLayout from "@components/layout/DefaultLayout";
import ScrollToTop from "./contexts/ScrollToTop";

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
