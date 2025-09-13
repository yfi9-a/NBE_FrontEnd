import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serviceFormRegistry } from "./forms";

type Step3Session = {
  selectedService?: string;
};

function SimpleServiceForm({ serviceName }: { serviceName: string }) {
  const [name, setName] = useState<string>(serviceName);

  useEffect(() => {
    const saved = sessionStorage.getItem("step6:" + serviceName);
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v && typeof v.name === "string") setName(v.name);
      } catch {}
    }
  }, [serviceName]);

  useEffect(() => {
    sessionStorage.setItem("step6:" + serviceName, JSON.stringify({ name }));
  }, [name, serviceName]);

  return (
    <div className="w-full" dir="rtl">
      <div className="relative mb-6">
        <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
          <label htmlFor="serviceName" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
            اسم الخدمة
          </label>
          <input
            id="serviceName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            placeholder="ادخل اسم الخدمة"
          />
        </div>
      </div>
    </div>
  );
}

export default function Step6() {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState<string>("");

  useEffect(() => {
    const saved = sessionStorage.getItem("step3");
    if (saved) {
      try {
        const v: Step3Session = JSON.parse(saved);
        if (v.selectedService) setServiceName(v.selectedService);
      } catch {}
    }
  }, []);

  const FormComponent = useMemo(() => {
    if (!serviceName) return null;
    return serviceFormRegistry[serviceName] || null;
  }, [serviceName]);

  const canProceed = Boolean(serviceName);

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 pt-10 md:pt-[15vh] text-right max-w-[500px] pb-24 md:pb-6" dir="rtl">
        <h3 className="text-xl font-semibold mb-6">ملء بيانات الخدمة</h3>

        {!serviceName ? (
          <div className="text-right">
            <p className="text-gray-700 mb-4">لم يتم اختيار خدمة بعد. يرجى الرجوع لاختيار الخدمة أولاً.</p>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-sky-950 rounded-lg px-5 py-3 transition-colors shadow-sm"
              onClick={() => navigate("/step3")}
            >
              الرجوع لاختيار الخدمة
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-right text-sky-950">الخدمة المختارة: <span className="font-semibold">{serviceName}</span></div>
            {FormComponent ? (
              <FormComponent />
            ) : (
              <SimpleServiceForm serviceName={serviceName} />
            )}
          </>
        )}
      </div>

      <div className="pointer-events-none">
        <div className="pointer-events-auto fixed bottom-4 left-1/2 -translate-x-1/2 md:absolute md:bottom-4 md:left-4 md:translate-x-0 flex items-center gap-6 z-40">
          <button
            type="button"
            className="group bg-gray-200 hover:bg-gray-300 text-sky-950 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md relative"
            onClick={() => {
              if (serviceName === "فتح حساب") {
                // لفتح الحساب، استخدم التنقل الداخلي
                const formElement = document.querySelector('[data-form-component]') as any;
                if (formElement && formElement.prevStep) {
                  formElement.prevStep();
                } else {
                  if (window.confirm("بالرجوع سيتم فقدان البيانات المُدخلة في هذه الخطوة. هل تريد المتابعة؟")) { 
                    navigate(-1); 
                  }
                }
              } else {
                if (window.confirm("بالرجوع سيتم فقدان البيانات المُدخلة في هذه الخطوة. هل تريد المتابعة؟")) { 
                  navigate(-1); 
                }
              }
            }}
            aria-label="السابق"
          >
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">السابق</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            type="button"
            className="group bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md relative disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (serviceName === "فتح حساب") {
                // لفتح الحساب، استخدم التنقل الداخلي
                const formElement = document.querySelector('[data-form-component]') as any;
                if (formElement && formElement.nextStep) {
                  formElement.nextStep();
                } else {
                  navigate("/step7");
                }
              } else {
                // للخدمات الأخرى، انتقل مباشرة إلى Step7
                navigate("/step7");
              }
            }}
            aria-label="التالي"
            disabled={!canProceed}
          >
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">التالي</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


