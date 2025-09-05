import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import joi from "joi";

export default function Validation() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ national_id: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState("");
  const [showOtpConfirmation, setShowOtpConfirmation] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpTimer, setOtpTimer] = useState(180); // 3 minutes in seconds
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // New state for tracking current step

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (showOtpInput && otpTimer > 0) {
      timerId = setInterval(() => {
        setOtpTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsResendingOtp(false); // Enable resend button when timer runs out
    }
    return () => clearInterval(timerId);
  }, [showOtpInput, otpTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const schema = joi.object({
    national_id: joi
      .string()
      .pattern(
        /^(2|3)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(0[1-9]|[1-4][0-9]|5[0-5]|6[0-6]|7[0-7]|88)\d{4}\d$/
      )
      .required()
      .messages({
        "string.empty": "الرقم القومي مطلوب",
        "string.pattern.base":
          "الرقم القومي غير صحيح. يجب أن يكون 14 رقمًا ويحتوي على تاريخ ميلاد + كود محافظة صحيح",
      }),
    phone: joi
      .string()
      .pattern(/^01[0-9]{9}$/)
      .required()
      .messages({
        "string.empty": "رقم الهاتف مطلوب",
        "string.pattern.base":
          "رقم الهاتف يجب أن يبدأ بـ 01 ويكون 11 رقمًا صحيحًا",
      }),
  });

  const registerUser = async () => {
    try {
      const res = await axios.post("http://localhost:3000/signup", user);
      if (res.status === 200) {
        alert("تم التسجيل بنجاح!");
        navigate("/login");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.msg || "حدث خطأ أثناء التسجيل");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = schema.validate(user, { abortEarly: false });

    if (error) {
      const grouped: Record<string, string[]> = {};
      error.details.forEach((d) => {
        const field = d.context?.label || "general";
        if (!grouped[field]) grouped[field] = [];
        grouped[field].push(d.message);
      });
      setErrors(grouped);
      setShowOtpConfirmation(false); // Hide confirmation if validation fails
      setShowOtpInput(false); // Hide OTP input if validation fails
    } else {
      setErrors({});
      registerUser();
      setShowOtpConfirmation(true); // Show confirmation on successful validation
      setShowOtpInput(false); // Hide OTP input initially
    }
  };

  const handleConfirmOtp = () => {
    setShowOtpConfirmation(false);
    setShowOtpInput(true);
    setOtpTimer(180); // Reset timer
    setIsResendingOtp(false); // Enable resend button
  };


  const handleResendOtp = () => {
    setIsResendingOtp(true);
    // Simulate API call to resend OTP
    setTimeout(() => {
      setOtpTimer(180); // Reset timer
      setIsResendingOtp(false);
      alert("تم إعادة إرسال رمز التحقق.");
    }, 2000);
  };

  const handleVerifyOtp = () => {
    setCurrentStep(2); // Move to step 2 after successful initial validation
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const steps = [
    "ادخال الرقم القومي والهاتف المحمول",
    "التحقق من البريد الالكتروني",
    "تحديد موعد الحضور",
    "تحديد الخدمة المطلوبة",
    "تحديد الفرع الأقرب لك",
    "ادخال البيانات المطلوبة",
    "تأكيد الحجز",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/3 bg-[#006633] h-48 md:h-auto flex flex-col justify-center items-center p-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-8" dir="rtl">مرحبا بك في البنك الأهلي المصري</h2>
        {/* Desktop/Tablet View: Show all steps */}
        <div className="w-full max-w-xs hidden md:block">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-4" dir="rtl">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center p-1 mr-3 
                ${currentStep > index + 1 ? 'bg-orange-400' : 'border-2 border-white'}`}>
                {currentStep > index + 1 ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  <span className="text-white font-bold"></span>
                )}
              </div>
              <p className={`text-lg mx-2 ${currentStep > index + 1 ? 'text-orange-400 font-semibold' : 'text-white'}`}>{step}</p>
            </div>
          ))}
        </div>
        {/* Mobile View: Show only current step */}
        <div className="w-full max-w-xs md:hidden">
          <div className="flex items-center mb-4" dir="rtl">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-orange-400 hidden`}>
              <span className="text-white font-bold">{currentStep}</span>
            </div>
            <p className="text-lg text-white font-semibold">{steps[currentStep - 1]}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 bg-white p-8 md:p-16 md:pt-32 rounded-r-[50px] flex flex-col justify-center items-center md:items-end relative min-h-screen pb-8 md:rounded-t-[50px] md:items-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            {serverError && (
              <div className="text-red-500 text-sm text-right mb-4">
                {serverError}
              </div>
            )}

            <div className="relative mb-8">
              <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
                <label
                  htmlFor="national_id"
                  className="absolute -top-3 right-4 bg-white px-2 text-sm text-sky-950"
                >
                  الرقم القومي
                </label>
                <input
                  type="text"
                  id="national_id"
                  name="national_id"
                  placeholder="ادخل الرقم القومي"
                  value={user.national_id}
                  onChange={handleChange}
                  className="w-full p-3 pt-5 bg-transparent outline-none placeholder:text-right text-right"
                />
              </div>
              {errors.national_id?.map((msg, i) => (
                <div key={i} className="absolute bottom-[-20px] right-0 text-red-500 text-sm text-right">
                  {msg}
                </div>
              ))}
            </div>

            <div className="relative mb-8">
              <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
                <label
                  htmlFor="phone"
                  className="absolute -top-3 right-4 bg-white px-2 text-sm text-sky-950"
                >
                  رقم الهاتف المحمول
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="ادخل الهاتف المحمول"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full p-3 pt-5 bg-transparent outline-none placeholder:text-right text-right"
                />
              </div>
              {errors.phone?.map((msg, i) => (
                <div key={i} className="absolute bottom-[-20px] right-0 text-red-500 text-sm text-right">
                  {msg}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className={`w-full px-6 py-3 text-white text-lg font-bold 
                 rounded-md shadow-md transform 
                 hover:scale-105 transition-all duration-300
                 ${showOtpConfirmation || showOtpInput ? 'bg-gray-400' : 'bg-orange-400 hover:bg-orange-500'}`}
                disabled={showOtpConfirmation || showOtpInput} // Disable when OTP confirmation or OTP input is shown
              >
                {showOtpConfirmation || showOtpInput ? 'جاري المعالجة ..' : 'تنفيذ'}
              </button>
            </div>

            {showOtpConfirmation && (
              <div className="mt-8 p-4 border border-orange-400 rounded-lg shadow-lg bg-white" dir="rtl">
                <p className="text-sm text-gray-700 mb-4 text-center">
                  رجاء العلم بإنه سوف يصلكم رسالة OTP على رقم الهاتف المحمول الذي تم 
                  إدخاله للتحقق . هذه الرسالة سرية جدا برجاء عدم مشاركتها مع احد. للاستمرار اضغط تأكيد
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-orange-400 text-white rounded-md text-sm hover:bg-orange-500"
                    onClick={handleConfirmOtp}
                  >
                    تأكيد
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500"
                    onClick={() => setShowOtpConfirmation(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}

            {showOtpInput && (
              <div className="mt-8 p-4 border border-orange-400 rounded-lg shadow-lg bg-white" dir="rtl">
                <p className="text-sm text-gray-700 mb-4 text-center">
                  الرجاء إدخال رمز التحقق الذي وصلك على هاتفك المحمول.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <input
                    type="text"
                    placeholder="رمز التحقق"
                    className="w-full max-w-xs p-3 border-2 border-orange-400 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="text-sm text-gray-600">
                    الوقت المتبقي: {formatTime(otpTimer)}
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      className={`px-6 py-2 text-white rounded-md text-sm transition-colors
                        ${otpTimer === 0 && !isResendingOtp ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-400 cursor-not-allowed'}`}
                      onClick={handleResendOtp}
                      disabled={otpTimer > 0 || isResendingOtp}
                    >
                      إعادة إرسال الرمز
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-orange-400 text-white rounded-md text-sm hover:bg-orange-500"
                      onClick={handleVerifyOtp}
                    >
                      تحقق
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="relative flex justify-center gap-16 md:absolute md:bottom-8 md:left-16 md:static md:w-full md:justify-center md:mt-8">
          <button
            type="button"
            className="bg-orange-400 hover:bg-orange-500 rounded-full w-12 h-12 flex justify-center items-center transition-colors"
            onClick={() => navigate(-1)}
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 rounded-full w-12 h-12 flex justify-center items-center transition-colors"
            onClick={handleSubmit}
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
