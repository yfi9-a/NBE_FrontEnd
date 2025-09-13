import { useEffect, useState } from "react";

export default function SalaryTransferForm() {
  const [serviceName, setServiceName] = useState<string>("طلب تحويل مرتب");

  useEffect(() => {
    const saved = sessionStorage.getItem("step6:طلب تحويل مرتب");
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v && typeof v.serviceName === "string") setServiceName(v.serviceName);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("step6:طلب تحويل مرتب", JSON.stringify({ serviceName }));
  }, [serviceName]);

  return (
    <div className="w-full" dir="rtl">
      <div className="relative mb-6">
        <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
          <label htmlFor="serviceName_salary" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
            اسم الخدمة
          </label>
          <input
            id="serviceName_salary"
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            placeholder="ادخل اسم الخدمة"
          />
        </div>
      </div>
    </div>
  );
}


