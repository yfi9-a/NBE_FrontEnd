import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Validation from "./components/Validation/Validation.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Validation />} />
            <Route path="validation" element={<Validation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
