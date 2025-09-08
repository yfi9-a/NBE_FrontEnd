import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Validation from "./components/Step1/Step1.tsx";
import Step2 from "./components/Step2/Step2.tsx";
import Step3 from "./components/Step3/Step3.tsx";
import Step5 from "./components/Step5/Step5.tsx";
import OtpSuccess from "./components/otp-success/OtpSuccess.tsx";
import Step1 from "./components/Step1/Step1.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Validation />} />
            <Route path="validation" element={<Validation />} />
            <Route path="step1" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
            <Route path="step3" element={<Step3 />} />
            <Route path="step5" element={<Step5 />} />
            <Route path="otp-success" element={<OtpSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
