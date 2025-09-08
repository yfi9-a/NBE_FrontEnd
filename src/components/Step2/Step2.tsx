import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import joi from "joi";

export default function Step2() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", confirmEmail: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState("");
  const [showOtpConfirmation, setShowOtpConfirmation] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(180);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (showOtpInput && otpTimer > 0) {
      timerId = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    } else if (otpTimer === 0) {
      setIsResendingOtp(false);
    }
    return () => clearInterval(timerId);
  }, [showOtpInput, otpTimer]);

  const schema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "البريد الالكتروني مطلوب",
      "string.email": "صيغة البريد الالكتروني غير صحيحة",
    }),
    confirmEmail: joi.any().valid(joi.ref("email")).required().messages({
      "any.only": "تأكيد البريد يجب أن يطابق البريد الالكتروني",
      "any.required": "تأكيد البريد مطلوب",
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    sessionStorage.setItem("step2", JSON.stringify(updated));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const { error } = schema.validate(form, { abortEarly: false });
    if (error) {
      const grouped: Record<string, string[]> = {};
      error.details.forEach((d) => {
        const field = (d.context?.key as string) || "general";
        if (!grouped[field]) grouped[field] = [];
        grouped[field].push(d.message);
      });
      setErrors(grouped);
      setShowOtpConfirmation(false);
      setShowOtpInput(false);
    } else {
      setErrors({});
      setServerError("");
      setShowOtpConfirmation(true);
      setShowOtpInput(false);
    }
  };

  const handleConfirmOtp = () => {
    setShowOtpConfirmation(false);
    setShowOtpInput(true);
    setOtpTimer(180);
    setIsResendingOtp(false);
  };

  const handleResendOtp = () => {
    setIsResendingOtp(true);
    setTimeout(() => {
      setOtpTimer(180);
      setIsResendingOtp(false);
      alert("تم إعادة إرسال رمز التحقق.");
    }, 2000);
  };

  const handleVerifyOtp = () => {
    if (!otpCode.trim()) return;
    setOtpVerified(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 md:px-10 pt-6 md:pt-[15vh] text-right max-w-[500px]" dir="rtl">
        {otpVerified ? (
          <div className="w-full flex items-center justify-center">
            <div className="mt-8 p-5 border border-green-300 rounded-lg shadow bg-white text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h4 className="font-semibold">تم التحقق من البريد الالكتروني بنجاح</h4>
              </div>
              <div className="flex justify-center">
                <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2 shadow" onClick={() => navigate("/step3")}>متابعة</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-6">التحقق من البريد الالكتروني</h3>
            {serverError && (
              <div className="text-red-500 text-sm text-right mb-4">{serverError}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative mb-8">
                <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
                  <label htmlFor="email" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                    البريد الالكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ادخل البريد الالكتروني"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full py-3 px-3 pt-5 bg-transparent outline-none placeholder:text-right text-right text-base"
                  />
                </div>
                {errors.email?.map((msg, i) => (
                  <div key={i} className="absolute bottom-[-20px] right-0 text-red-500 text-sm text-right">
                    {msg}
                  </div>
                ))}
              </div>

              {/* Confirm Email */}
              <div className="relative mb-8">
                <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
                  <label htmlFor="confirmEmail" className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                    تأكيد البريد الالكتروني
                  </label>
                  <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    placeholder="أعد إدخال البريد الالكتروني"
                    value={form.confirmEmail}
                    onChange={handleChange}
                    className="w-full py-3 px-3 pt-5 bg-transparent outline-none placeholder:text-right text-right text-base"
                  />
                </div>
                {errors.confirmEmail?.map((msg, i) => (
                  <div key={i} className="absolute bottom-[-20px] right-0 text-red-500 text-sm text-right">
                    {msg}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className={`w-full px-6 py-3 text-white text-lg font-bold rounded-md shadow-md transform hover:scale-105 transition-all duration-300 ${
                    showOtpConfirmation || showOtpInput ? "bg-gray-400" : "bg-orange-400 hover:bg-orange-500"
                  }`}
                  disabled={showOtpConfirmation || showOtpInput}
                >
                  {showOtpConfirmation || showOtpInput ? "جاري المعالجة .." : "تنفيذ"}
                </button>
              </div>
            </form>

            {/* OTP Confirmation */}
            {showOtpConfirmation && (
              <div className="mt-8 p-4 border border-orange-400 rounded-lg shadow-lg bg-white" dir="rtl">
                <p className="text-base text-gray-700 mb-4 text-right">
                  سيتم إرسال رمز تحقق إلى بريدك الالكتروني. هذه الرسالة سرية، لا تشاركها مع أحد.
                </p>
                <div className="flex  gap-4">
                  <button type="button" className="px-6 py-2 bg-orange-400 text-white rounded-md text-sm hover:bg-orange-500" onClick={handleConfirmOtp}>
                    تأكيد
                  </button>
                  <button type="button" className="px-6 py-2 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500" onClick={() => setShowOtpConfirmation(false)}>
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {/* OTP Input */}
            {showOtpInput && (
              <div className="mt-8 p-4 border border-orange-400 rounded-lg shadow-lg bg-white" dir="rtl">
                {!otpVerified && (
                  <p className="text-base text-gray-700 mb-4 text-right">الرجاء إدخال رمز التحقق الذي وصلك على بريدك الالكتروني.</p>
                )}
                <div className="flex flex-col items-end gap-4 w-full">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="ادخل رمز التحقق"
                    className="w-full self-end p-3 border-2 border-orange-400 rounded-md text-right text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="flex  gap-3 w-full self-end">
                    <span className="text-sm text-gray-600 self-center">الوقت المتبقي: {formatTime(otpTimer)}</span>
                    <button
                      type="button"
                      className={`px-5 py-2 text-white rounded-md text-sm transition-colors ${
                        otpTimer === 0 && !isResendingOtp ? "bg-orange-400 hover:bg-orange-500" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={handleResendOtp}
                      disabled={otpTimer > 0 || isResendingOtp}
                    >
                      إعادة الإرسال
                    </button>
                    <button
                      type="button"
                      className={`px-6 py-2 text-white rounded-md text-sm transition-colors ${
                        otpCode.trim() ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"
                      }`}
                      onClick={handleVerifyOtp}
                      disabled={!otpCode.trim()}
                    >
                      تحقق
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Corner Navigation Buttons */}
      {!otpVerified && (
        <div className="pointer-events-none">
          <button
            type="button"
            className="pointer-events-auto absolute bottom-2 left-2 bg-gray-200 hover:bg-gray-300 text-sky-950 rounded-lg px-5 py-3 flex items-center gap-2 transition-colors shadow-sm"
            onClick={() => {
              if (window.confirm("بالرجوع سيتم فقدان البيانات المُدخلة في هذه الخطوة. هل تريد المتابعة؟")) {
                navigate(-1);
              }
            }}
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
            onClick={() => navigate("/step3")}
            aria-label="التالي"
          >
            <span>التالي</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}


