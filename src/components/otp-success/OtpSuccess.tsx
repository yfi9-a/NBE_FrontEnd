import { useNavigate } from "react-router-dom";

export default function OtpSuccess() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 pt-10 md:pt-[15vh] text-right max-w-[500px]" dir="rtl">
        <div className="mt-8 p-4 border border-green-300 rounded-lg shadow bg-white">
          <div className="flex items-center justify-end gap-2 text-green-700 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h4 className="font-semibold">تم التحقق من الرمز بنجاح</h4>
          </div>
          <p className="text-gray-700 mb-4">يمكنك المتابعة للخطوة التالية الآن.</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2 shadow"
              onClick={() => navigate("/step2")}
            >
              متابعة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
