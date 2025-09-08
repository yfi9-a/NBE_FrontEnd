import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();

  const prevStepRef = useRef<number>(1);

  useEffect(() => {
    const pathToStep: Record<string, number> = {
      "/": 1,
      "/validation": 1,
      "/step2": 2,
      "/step3": 3,
      "/step4": 4,
      "/step5": 5,
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
    "ادخال الرقم القومي والهاتف المحمول",
    "التحقق من البريد الالكتروني",
    "تحديد الخدمة و موعد الحضور",
    "تحديد الفرع الأقرب لك",
    "ادخال البيانات المطلوبة",
    "تأكيد الحجز",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-[#006633] h-48 md:h-auto flex flex-col justify-center items-center p-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-8" dir="rtl">
          مرحبا بك في البنك الأهلي المصري
        </h2>

        {/* Desktop View */}
        <div className="w-full max-w-xs hidden md:block">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-4" dir="rtl">
              {currentStep > index + 1 ? (
                <div className="w-8 h-8 rounded-full flex items-center justify-center p-1 mr-3 bg-orange-400">
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
              ) : (
                <div className="mr-3" />
              )}
              <p
                className={`text-lg mx-2 ${
                  currentStep > index + 1
                    ? "text-orange-400 font-semibold"
                    : "text-white"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="w-full max-w-xs md:hidden">
          <div className="flex items-center mb-4" dir="rtl">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-orange-400 hidden">
              <span className="text-white font-bold">{currentStep}</span>
            </div>
            <p className="text-lg text-white font-semibold">
              {steps[currentStep - 1]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 bg-white p-0 rounded-r-[50px] flex flex-col relative min-h-screen">
        <Outlet /> {/* هنا بيتعرض محتوى كل Route */}
      </div>
    </div>
  );
}
