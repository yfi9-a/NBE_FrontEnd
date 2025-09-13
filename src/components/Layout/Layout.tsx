import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import Intro from "./Intro";

export default function Layout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();

  const prevStepRef = useRef<number>(1);

  useEffect(() => {
    const pathToStep: Record<string, number> = {
      "/": 1,
      "/step2": 2,
      "/step3": 3,
      "/step5": 4,
      "/step6": 5,
      "/step7": 6,
    };
    const nextStep = pathToStep[location.pathname] || 1;

    // If navigating backward, clear data for the step we just left (cancel filled part)
    if (nextStep < prevStepRef.current) {
      const prevStepKey = `step${prevStepRef.current}`;
      sessionStorage.removeItem(prevStepKey);
    }

    setCurrentStep(nextStep);
    prevStepRef.current = nextStep;
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const steps = [
    "  التحقق من الرقم القومي والهاتف المحمول",
    "التحقق من البريد الالكتروني",
    "تحديد الخدمة و موعد الحضور",
    "تحديد الفرع الأقرب لك",
    "ملء بيانات الخدمة",
    "مراجعة البيانات",
  ];

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("introDone");
    if (seen === "1") setIntroDone(true);
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("introDone", "1");
    setIntroDone(true);
    if (location.pathname === "/") {
      navigate("/step1", { replace: true });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0c6a42]">
      {!introDone && <Intro onDone={handleIntroDone} />}
      {/* Sidebar */}
      <div className="w-full md:w-2/5 md:h-auto flex flex-col items-center text-white text-center py-2 min-h-[120px] md:min-h-0">
        <img src={logo} alt="NBE Logo" className="w-full h-auto md:scale-110 md:origin-top max-h-36 md:max-h-none object-contain px-3" />

        {/* Desktop View */}
        <div className="w-full max-w-sm hidden md:block">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-4" dir="rtl">
              <div className="w-8 flex justify-center">
                {currentStep > index + 1 && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-400">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
              <p
                className={`text-center mx-2 ${
                  currentStep > index + 1
                    ? "text-orange-400 font-semibold"
                    : "text-white"
                } whitespace-nowrap text-base md:text-lg`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="w-full max-w-xs md:hidden hidden">
          <div className="flex items-center mb-4" dir="rtl">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-orange-400">
              <span className="text-white font-bold">{currentStep}</span>
            </div>
            <p className="text-lg text-white font-semibold">
              {steps[currentStep - 1]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/5 bg-white md:rounded-l-[30px] rounded-t-[30px] md:rounded-t-none flex flex-col relative overflow-y-auto max-h-screen pb-0 md:pb-0">
        <Outlet /> {/* هنا بيتعرض محتوى كل Route */}
      </div>
    </div>
  );
}
