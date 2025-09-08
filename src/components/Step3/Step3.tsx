import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type DayChoice = "today" | "later";

export default function Step3() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState<DayChoice>("today");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const saved = sessionStorage.getItem("step3");
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v.choice) setChoice(v.choice);
        if (v.date) setDate(v.date);
        if (v.time) setTime(v.time);
        if (v.selectedDept) setSelectedDept(v.selectedDept);
        if (v.selectedService) setSelectedService(v.selectedService);
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "step3",
      JSON.stringify({ choice, date, time, selectedDept, selectedService })
    );
  }, [choice, date, time, selectedDept, selectedService]);

  // Clamp past date if loaded or changed to a past value
  useEffect(() => {
    if (date && date < todayStr) {
      setDate(todayStr);
    }
  }, [date, todayStr]);

  const slots = useMemo(() => {
    const result: string[] = [];
    const start = 9 * 60;
    const end = 15 * 60;
    for (let m = start; m <= end; m += 30) {
      const hh = Math.floor(m / 60).toString().padStart(2, "0");
      const mm = (m % 60).toString().padStart(2, "0");
      result.push(`${hh}:${mm}`);
    }
    return result;
  }, []);

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 md:px-10 pt-6 md:pt-[15vh] text-right max-w-[500px]" dir="rtl">
        <h3 className="text-xl font-semibold mb-6">تحديد موعد الحضور</h3>

        <div className="mb-6" dir="rtl">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="dayChoice" value="today" checked={choice === "today"} onChange={() => setChoice("today")} className="accent-orange-500" />
              <span>هذا اليوم</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="dayChoice" value="later" checked={choice === "later"} onChange={() => setChoice("later")} className="accent-orange-500" />
              <span>يوم لاحق</span>
            </label>
          </div>
        </div>

        {choice === "later" && (
          <div className="mb-6">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label htmlFor="date" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">اختر التاريخ</label>
              <input id="date" type="date" min={todayStr} value={date} onChange={(e) => setDate(e.target.value)} className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right" />
            </div>
          </div>
        )}

        {choice === "later" && (
          <div className="mb-6">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label htmlFor="timeslot" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">اختر التوقيت</label>
              <select
                id="timeslot"
                dir="rtl"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent outline-none text-right py-3 px-3 pt-5 appearance-none"
              >
                <option value="" disabled>
                  اختر التوقيت
                </option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-950">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Departments dropdown */}
        <div className="mb-6">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label htmlFor="department" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">اختيار القسم</label>
            <select
              id="department"
              dir="rtl"
              value={selectedDept}
              onChange={(e) => { setSelectedDept(e.target.value); setSelectedService(""); }}
              className="w-full bg-transparent outline-none text-right py-3 px-3 pt-5 appearance-none"
            >
              <option value="" disabled>
                اختر القسم
              </option>
              <option value="customer">خدمة عملاء</option>
              <option value="reception">استقبال</option>
              <option value="treasury">الخزينة</option>
            </select>
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-950">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Services dropdown under departments */}
        <div className="mb-10">
          {selectedDept ? (
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label htmlFor="service" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">الخدمات</label>
              <select
                id="service"
                dir="rtl"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent outline-none text-right py-3 px-3 pt-5 appearance-none"
              >
                <option value="" disabled>
                  اختر الخدمة
                </option>
                {(
                  {
                    customer: ["فتح حساب", "تحديث بيانات"],
                    reception: [
                      "طباعة كشف حساب",
                      "طباعة شهادة بالآرصده",
                      "طلب حفظ مراسلات",
                      "طلب اغلاق حساب",
                      "طلب تحويل مرتب",
                      "طلب تحويل معاش",
                      "طباعة مركز عميل",
                    ],
                    treasury: [],
                  } as Record<string, string[]>
                )[selectedDept].map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-950">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">اختر القسم أولاً لعرض الخدمات المتاحة.</div>
          )}
        </div>
      </div>

      {/* Corner Navigation Buttons */}
      <div className="pointer-events-none">
        <button
          type="button"
          className="pointer-events-auto absolute bottom-2 left-2 bg-gray-200 hover:bg-gray-300 text-sky-950 rounded-lg px-5 py-3 flex items-center gap-2 transition-colors shadow-sm"
          onClick={() => { if (window.confirm("بالرجوع سيتم فقدان البيانات المُدخلة في هذه الخطوة. هل تريد المتابعة؟")) { navigate(-1); } }}
          aria-label="السابق"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>السابق</span>
        </button>
        <button
          type="button"
          className="pointer-events-auto absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-3 flex items-center gap-2 transition-colors shadow-md"
          onClick={() => navigate("/step5")}
          aria-label="التالي"
          disabled={choice === "later" ? !(date && time && selectedDept && selectedService) : !(selectedDept && selectedService)}
        >
          <span>التالي</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}


