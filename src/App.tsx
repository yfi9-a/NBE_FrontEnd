import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Step1 from "./components/Step1/Step1.tsx";
import Step2 from "./components/Step2/Step2.tsx";
import Step3 from "./components/Step3/Step3.tsx";
import Step5 from "./components/Step5/Step5.tsx";
import Step6 from "./components/Step6/Step6.tsx";
import Step7 from "./components/Step7/Step7.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Step1 />} />
            <Route path="validation" element={<Step1 />} />
            <Route path="step1" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
            <Route path="step3" element={<Step3 />} />
            <Route path="step5" element={<Step5 />} />
            <Route path="step6" element={<Step6 />} />
            <Route path="step7" element={<Step7 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
