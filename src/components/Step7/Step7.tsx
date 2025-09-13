import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Step1Data = { national_id?: string; phone?: string };
type Step2Data = { email?: string };
type Step3Data = { choice?: string; date?: string; time?: string; selectedDept?: string; selectedService?: string };
type Step5Data = { selectedId?: string };

export default function Step7() {
  const navigate = useNavigate();
  const [s1, setS1] = useState<Step1Data>({});
  const [s2, setS2] = useState<Step2Data>({});
  const [s3, setS3] = useState<Step3Data>({});
  const [s5, setS5] = useState<Step5Data>({});

  useEffect(() => {
    try { const v = sessionStorage.getItem("step1"); if (v) setS1(JSON.parse(v)); } catch {}
    try { const v = sessionStorage.getItem("step2"); if (v) setS2(JSON.parse(v)); } catch {}
    try { const v = sessionStorage.getItem("step3"); if (v) setS3(JSON.parse(v)); } catch {}
    try { const v = sessionStorage.getItem("step5"); if (v) setS5(JSON.parse(v)); } catch {}
  }, []);

  const rows = useMemo(() => {
    const data: Array<{ label: string; value: string | undefined }> = [];
    data.push({ label: "الرقم القومي", value: s1.national_id });
    data.push({ label: "الهاتف", value: s1.phone });
    data.push({ label: "البريد الالكتروني", value: s2.email });
    data.push({ label: "القسم", value: s3.selectedDept });
    data.push({ label: "الخدمة", value: s3.selectedService });
    if (s3.choice === "later") {
      data.push({ label: "التاريخ", value: s3.date });
      data.push({ label: "الوقت", value: s3.time });
    }
    data.push({ label: "الفرع", value: s5.selectedId });
    return data;
  }, [s1, s2, s3, s5]);

  const handleFinish = () => {
    alert("تم تأكيد الحجز. شكراً لك!");
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 md:px-10 pt-6 md:pt-[15vh] text-right max-w-[700px]" dir="rtl">
        <h3 className="text-xl font-semibold mb-6">مراجعة البيانات</h3>

        <div className="w-full rounded-xl border border-orange-600/30 bg-white divide-y divide-orange-600/10">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <span className="text-sky-950">{r.label}</span>
              <span className="text-black font-medium">{r.value || "—"}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8 justify-end">
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-sky-950 shadow"
            onClick={() => navigate("/step3")}
          >
            طلب خدمة أخرى
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow"
            onClick={handleFinish}
          >
            انهاء
          </button>
        </div>
      </div>
    </div>
  );
}


