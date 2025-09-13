import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OpenAccountForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // البيانات الأساسية
  const [basicData, setBasicData] = useState({
    idType: "",
    gender: "",
    birthDate: "",
    issueDate: "",
    birthPlace: "",
    nationality: "",
    hasOtherNationalities: false,
    issuedBy: "",
    birthCountry: "",
    otherNationalities: "",
    expiryDate: "",
    permanentAddress: "",
    governorate: "",
    country: "",
    isDisabled: false
  });

  // بيانات المراسلات والإخطارات
  const [contactData, setContactData] = useState({
    correspondenceAddress: "",
    mobilePhone: "",
    countryCode: "",
    governorate: "",
    country: "",
    mobilePhone2: "",
    countryCode2: "",
    correspondenceLanguage: "",
    statementDeliveryMethod: "",
    statementFrequency: "",
    email: ""
  });

  // البيانات الوظيفية
  const [employmentData, setEmploymentData] = useState({
    companyName: "",
    workNature: "",
    previousWorkNature: "",
    companyAddress: "",
    jobTitle: "",
    governorate: "",
    country: "",
    profession: "",
    startDate: "",
    companyPhone: "",
    companyCode: "",
    primaryIncomeSource: "",
    primaryIncomeRange: "",
    secondaryIncomeSource: "",
    secondaryIncomeRange: ""
  });

  // البيانات الإضافية
  const [additionalData, setAdditionalData] = useState({
    isRealBeneficiary: false,
    hasOtherBankAccounts: false,
    hasPowerOfAttorney: false,
    hasBankVaults: false,
    hasResidenceRights: false,
    otherCountries: "",
    hasSecuritiesTrading: false,
    maritalStatus: "",
    educationLevel: "",
    residenceType: "",
    residenceCountry: "",
    hasHighPosition: false,
    highPositionDetails: "",
    hasPoliticalConnections: false
  });

  useEffect(() => {
    // تحميل البيانات المحفوظة
    const savedBasic = sessionStorage.getItem("step6_basic_data");
    const savedContact = sessionStorage.getItem("step6_contact_data");
    const savedEmployment = sessionStorage.getItem("step6_employment_data");
    const savedAdditional = sessionStorage.getItem("step6_additional_data");
    const savedStep = sessionStorage.getItem("step6_current_step");

    if (savedBasic) {
      try {
        setBasicData(JSON.parse(savedBasic));
      } catch {}
    }
    if (savedContact) {
      try {
        setContactData(JSON.parse(savedContact));
      } catch {}
    }
    if (savedEmployment) {
      try {
        setEmploymentData(JSON.parse(savedEmployment));
      } catch {}
    }
    if (savedAdditional) {
      try {
        setAdditionalData(JSON.parse(savedAdditional));
      } catch {}
    }
    if (savedStep) {
      try {
        setCurrentStep(parseInt(savedStep));
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("step6_basic_data", JSON.stringify(basicData));
  }, [basicData]);

  useEffect(() => {
    sessionStorage.setItem("step6_contact_data", JSON.stringify(contactData));
  }, [contactData]);

  useEffect(() => {
    sessionStorage.setItem("step6_employment_data", JSON.stringify(employmentData));
  }, [employmentData]);

  useEffect(() => {
    sessionStorage.setItem("step6_additional_data", JSON.stringify(additionalData));
  }, [additionalData]);

  useEffect(() => {
    sessionStorage.setItem("step6_current_step", currentStep.toString());
  }, [currentStep]);

  const handleBasicDataChange = (field: string, value: any) => {
    setBasicData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactDataChange = (field: string, value: any) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmploymentDataChange = (field: string, value: any) => {
    setEmploymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalDataChange = (field: string, value: any) => {
    setAdditionalData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/step7");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // تعريض الدوال للاستخدام من Step6
  useEffect(() => {
    const formElement = document.querySelector('[data-form-component]') as any;
    if (formElement) {
      formElement.nextStep = nextStep;
      formElement.prevStep = prevStep;
    }
  }, [currentStep]);

  const renderStep1 = () => (
    <div className="w-full" dir="rtl">
      <h4 className="text-lg font-semibold mb-6 text-sky-950">البيانات الأساسية</h4>
      
      <div className="space-y-6">
        {/* نوع الهوية */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              نوع الهوية
            </label>
            <select
              value={basicData.idType}
              onChange={(e) => handleBasicDataChange("idType", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر نوع الهوية</option>
              <option value="national_id">رقم قومي</option>
              <option value="passport">جواز سفر</option>
              <option value="military_id">رقم عسكري</option>
            </select>
          </div>
        </div>

        {/* النوع */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              النوع
            </label>
            <select
              value={basicData.gender}
              onChange={(e) => handleBasicDataChange("gender", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر النوع</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>
        </div>

        {/* تاريخ الميلاد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              تاريخ الميلاد
            </label>
            <input
              type="date"
              value={basicData.birthDate}
              onChange={(e) => handleBasicDataChange("birthDate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            />
          </div>
        </div>

        {/* تاريخ الإصدار */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              تاريخ الإصدار
            </label>
            <input
              type="date"
              value={basicData.issueDate}
              onChange={(e) => handleBasicDataChange("issueDate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            />
          </div>
        </div>

        {/* محل الميلاد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              محل الميلاد
            </label>
            <input
              type="text"
              value={basicData.birthPlace}
              onChange={(e) => handleBasicDataChange("birthPlace", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل محل الميلاد"
            />
          </div>
        </div>

        {/* الجنسية */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              الجنسية
            </label>
            <select
              value={basicData.nationality}
              onChange={(e) => handleBasicDataChange("nationality", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر الجنسية</option>
              <option value="egyptian">مصري</option>
              <option value="saudi">سعودي</option>
              <option value="emirati">إماراتي</option>
              <option value="kuwaiti">كويتي</option>
              <option value="qatari">قطري</option>
              <option value="bahraini">بحريني</option>
              <option value="omani">عماني</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* هل لديك جنسيات أخرى */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل لديك جنسيات أخرى؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasOtherNationalities"
                checked={basicData.hasOtherNationalities === true}
                onChange={() => handleBasicDataChange("hasOtherNationalities", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasOtherNationalities"
                checked={basicData.hasOtherNationalities === false}
                onChange={() => handleBasicDataChange("hasOtherNationalities", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* صادرة من */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              صادرة من
            </label>
            <input
              type="text"
              value={basicData.issuedBy}
              onChange={(e) => handleBasicDataChange("issuedBy", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل الجهة المصدرة"
            />
          </div>
        </div>

        {/* بلد الميلاد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              بلد الميلاد
            </label>
            <select
              value={basicData.birthCountry}
              onChange={(e) => handleBasicDataChange("birthCountry", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر بلد الميلاد</option>
              <option value="egypt">مصر</option>
              <option value="saudi_arabia">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
              <option value="qatar">قطر</option>
              <option value="bahrain">البحرين</option>
              <option value="oman">عمان</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* الجنسيات الأخرى */}
        {basicData.hasOtherNationalities && (
          <div className="relative">
        <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                الجنسيات الأخرى
          </label>
          <input
            type="text"
                value={basicData.otherNationalities}
                onChange={(e) => handleBasicDataChange("otherNationalities", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
                placeholder="اذكر الجنسيات الأخرى"
              />
            </div>
          </div>
        )}

        {/* تاريخ انتهاء الصلاحية */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              تاريخ انتهاء الصلاحية
            </label>
            <input
              type="date"
              value={basicData.expiryDate}
              onChange={(e) => handleBasicDataChange("expiryDate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            />
          </div>
        </div>

        {/* عنوان محل الإقامة الدائم */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              عنوان محل الإقامة الدائم
            </label>
            <textarea
              value={basicData.permanentAddress}
              onChange={(e) => handleBasicDataChange("permanentAddress", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right resize-none"
              rows={3}
              placeholder="ادخل عنوان محل الإقامة الدائم"
            />
          </div>
        </div>

        {/* المحافظة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المحافظة
            </label>
            <select
              value={basicData.governorate}
              onChange={(e) => handleBasicDataChange("governorate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر المحافظة</option>
              <option value="cairo">القاهرة</option>
              <option value="giza">الجيزة</option>
              <option value="alexandria">الإسكندرية</option>
              <option value="sharkia">الشرقية</option>
              <option value="dakahlia">الدقهلية</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* البلد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              البلد
            </label>
            <select
              value={basicData.country}
              onChange={(e) => handleBasicDataChange("country", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر البلد</option>
              <option value="egypt">مصر</option>
              <option value="saudi_arabia">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
              <option value="qatar">قطر</option>
              <option value="bahrain">البحرين</option>
              <option value="oman">عمان</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* هل العميل من ذوي الهمم */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل العميل من ذوي الهمم؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isDisabled"
                checked={basicData.isDisabled === true}
                onChange={() => handleBasicDataChange("isDisabled", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isDisabled"
                checked={basicData.isDisabled === false}
                onChange={() => handleBasicDataChange("isDisabled", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full" dir="rtl">
      <h4 className="text-lg font-semibold mb-6 text-sky-950">بيانات المراسلات والإخطارات</h4>
      
      <div className="space-y-6">
        {/* عنوان المراسلات */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              عنوان المراسلات
            </label>
            <textarea
              value={contactData.correspondenceAddress}
              onChange={(e) => handleContactDataChange("correspondenceAddress", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right resize-none"
              rows={3}
              placeholder="ادخل عنوان المراسلات"
            />
          </div>
        </div>

        {/* هاتف المحمول */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                كود البلد
              </label>
              <select
                value={contactData.countryCode}
                onChange={(e) => handleContactDataChange("countryCode", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              >
                <option value="">+20</option>
                <option value="+20">+20 (مصر)</option>
                <option value="+966">+966 (السعودية)</option>
                <option value="+971">+971 (الإمارات)</option>
                <option value="+965">+965 (الكويت)</option>
                <option value="+974">+974 (قطر)</option>
                <option value="+973">+973 (البحرين)</option>
                <option value="+968">+968 (عمان)</option>
              </select>
            </div>
          </div>
          <div className="relative md:col-span-2">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                هاتف المحمول
              </label>
              <input
                type="tel"
                value={contactData.mobilePhone}
                onChange={(e) => handleContactDataChange("mobilePhone", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
                placeholder="ادخل رقم الهاتف"
              />
            </div>
          </div>
        </div>

        {/* المحافظة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المحافظة
            </label>
            <select
              value={contactData.governorate}
              onChange={(e) => handleContactDataChange("governorate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر المحافظة</option>
              <option value="cairo">القاهرة</option>
              <option value="giza">الجيزة</option>
              <option value="alexandria">الإسكندرية</option>
              <option value="sharkia">الشرقية</option>
              <option value="dakahlia">الدقهلية</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* البلد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              البلد
            </label>
            <select
              value={contactData.country}
              onChange={(e) => handleContactDataChange("country", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر البلد</option>
              <option value="egypt">مصر</option>
              <option value="saudi_arabia">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
              <option value="qatar">قطر</option>
              <option value="bahrain">البحرين</option>
              <option value="oman">عمان</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* هاتف المحمول 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                كود البلد 2
              </label>
              <select
                value={contactData.countryCode2}
                onChange={(e) => handleContactDataChange("countryCode2", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              >
                <option value="">+20</option>
                <option value="+20">+20 (مصر)</option>
                <option value="+966">+966 (السعودية)</option>
                <option value="+971">+971 (الإمارات)</option>
                <option value="+965">+965 (الكويت)</option>
                <option value="+974">+974 (قطر)</option>
                <option value="+973">+973 (البحرين)</option>
                <option value="+968">+968 (عمان)</option>
              </select>
            </div>
          </div>
          <div className="relative md:col-span-2">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                هاتف المحمول 2
              </label>
              <input
                type="tel"
                value={contactData.mobilePhone2}
                onChange={(e) => handleContactDataChange("mobilePhone2", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
                placeholder="ادخل رقم الهاتف الثاني"
              />
            </div>
          </div>
        </div>

        {/* لغة المراسلات */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              لغة المراسلات
            </label>
            <select
              value={contactData.correspondenceLanguage}
              onChange={(e) => handleContactDataChange("correspondenceLanguage", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر لغة المراسلات</option>
              <option value="arabic">العربية</option>
              <option value="english">الإنجليزية</option>
              <option value="french">الفرنسية</option>
            </select>
          </div>
        </div>

        {/* طريقة إرسال كشف الحساب */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              طريقة إرسال كشف الحساب
            </label>
            <select
              value={contactData.statementDeliveryMethod}
              onChange={(e) => handleContactDataChange("statementDeliveryMethod", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر طريقة الإرسال</option>
              <option value="email">البريد الإلكتروني</option>
              <option value="sms">رسالة نصية</option>
              <option value="post">البريد العادي</option>
              <option value="branch">الفرع</option>
            </select>
          </div>
        </div>

        {/* دورية كشف الحساب */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              دورية كشف الحساب
            </label>
            <select
              value={contactData.statementFrequency}
              onChange={(e) => handleContactDataChange("statementFrequency", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر الدورية</option>
              <option value="monthly">شهري</option>
              <option value="quarterly">ربع سنوي</option>
              <option value="semi_annual">نصف سنوي</option>
              <option value="annual">سنوي</option>
              <option value="on_demand">عند الطلب</option>
            </select>
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => handleContactDataChange("email", e.target.value)}
            className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل البريد الإلكتروني"
          />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="w-full" dir="rtl">
      <h4 className="text-lg font-semibold mb-6 text-sky-950">البيانات الوظيفية</h4>
      
      <div className="space-y-6">
        {/* اسم جهة العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              اسم جهة العمل
            </label>
            <input
              type="text"
              value={employmentData.companyName}
              onChange={(e) => handleEmploymentDataChange("companyName", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل اسم جهة العمل"
            />
          </div>
        </div>

        {/* طبيعة العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              طبيعة العمل
            </label>
            <select
              value={employmentData.workNature}
              onChange={(e) => handleEmploymentDataChange("workNature", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر طبيعة العمل</option>
              <option value="government">حكومي</option>
              <option value="private">خاص</option>
              <option value="self_employed">عمل حر</option>
              <option value="retired">متقاعد</option>
              <option value="student">طالب</option>
              <option value="unemployed">عاطل</option>
            </select>
          </div>
        </div>

        {/* طبيعة العمل السابقة في حالة المعاش */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              طبيعة العمل السابقة في حالة المعاش
            </label>
            <select
              value={employmentData.previousWorkNature}
              onChange={(e) => handleEmploymentDataChange("previousWorkNature", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر طبيعة العمل السابقة</option>
              <option value="government">حكومي</option>
              <option value="private">خاص</option>
              <option value="military">عسكري</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* عنوان جهة العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              عنوان جهة العمل
            </label>
            <textarea
              value={employmentData.companyAddress}
              onChange={(e) => handleEmploymentDataChange("companyAddress", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right resize-none"
              rows={3}
              placeholder="ادخل عنوان جهة العمل"
            />
          </div>
        </div>

        {/* المنصب الوظيفي */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المنصب الوظيفي
            </label>
            <input
              type="text"
              value={employmentData.jobTitle}
              onChange={(e) => handleEmploymentDataChange("jobTitle", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل المنصب الوظيفي"
            />
          </div>
        </div>

        {/* المحافظة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المحافظة
            </label>
            <select
              value={employmentData.governorate}
              onChange={(e) => handleEmploymentDataChange("governorate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر المحافظة</option>
              <option value="cairo">القاهرة</option>
              <option value="giza">الجيزة</option>
              <option value="alexandria">الإسكندرية</option>
              <option value="sharkia">الشرقية</option>
              <option value="dakahlia">الدقهلية</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* البلد */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              البلد
            </label>
            <select
              value={employmentData.country}
              onChange={(e) => handleEmploymentDataChange("country", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر البلد</option>
              <option value="egypt">مصر</option>
              <option value="saudi_arabia">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
              <option value="qatar">قطر</option>
              <option value="bahrain">البحرين</option>
              <option value="oman">عمان</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* المهنة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المهنة
            </label>
            <input
              type="text"
              value={employmentData.profession}
              onChange={(e) => handleEmploymentDataChange("profession", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل المهنة"
            />
          </div>
        </div>

        {/* تاريخ بدء العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              تاريخ بدء العمل
            </label>
            <input
              type="date"
              value={employmentData.startDate}
              onChange={(e) => handleEmploymentDataChange("startDate", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            />
          </div>
        </div>

        {/* تليفون جهة العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              تليفون جهة العمل
            </label>
            <input
              type="tel"
              value={employmentData.companyPhone}
              onChange={(e) => handleEmploymentDataChange("companyPhone", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل تليفون جهة العمل"
            />
          </div>
        </div>

        {/* كود جهة العمل */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              كود جهة العمل
            </label>
            <input
              type="text"
              value={employmentData.companyCode}
              onChange={(e) => handleEmploymentDataChange("companyCode", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
              placeholder="ادخل كود جهة العمل"
            />
          </div>
        </div>

        {/* مصدر الدخل الأول */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              مصدر الدخل الأول
            </label>
            <select
              value={employmentData.primaryIncomeSource}
              onChange={(e) => handleEmploymentDataChange("primaryIncomeSource", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر مصدر الدخل الأول</option>
              <option value="salary">راتب</option>
              <option value="business">تجارة</option>
              <option value="investment">استثمار</option>
              <option value="pension">معاش</option>
              <option value="rental">إيجار</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* فئة الدخل السنوي من المصدر الأول */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              فئة الدخل السنوي من المصدر الأول
            </label>
            <select
              value={employmentData.primaryIncomeRange}
              onChange={(e) => handleEmploymentDataChange("primaryIncomeRange", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر فئة الدخل</option>
              <option value="under_50k">أقل من 50,000</option>
              <option value="50k_100k">50,000 - 100,000</option>
              <option value="100k_200k">100,000 - 200,000</option>
              <option value="200k_500k">200,000 - 500,000</option>
              <option value="over_500k">أكثر من 500,000</option>
            </select>
          </div>
        </div>

        {/* مصدر الدخل الثانوي */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              مصدر الدخل الثانوي
            </label>
            <select
              value={employmentData.secondaryIncomeSource}
              onChange={(e) => handleEmploymentDataChange("secondaryIncomeSource", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر مصدر الدخل الثانوي</option>
              <option value="none">لا يوجد</option>
              <option value="salary">راتب</option>
              <option value="business">تجارة</option>
              <option value="investment">استثمار</option>
              <option value="pension">معاش</option>
              <option value="rental">إيجار</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* فئة الدخل السنوي من المصدر الثانوي */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              فئة الدخل السنوي من المصدر الثانوي
            </label>
            <select
              value={employmentData.secondaryIncomeRange}
              onChange={(e) => handleEmploymentDataChange("secondaryIncomeRange", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر فئة الدخل</option>
              <option value="none">لا يوجد</option>
              <option value="under_50k">أقل من 50,000</option>
              <option value="50k_100k">50,000 - 100,000</option>
              <option value="100k_200k">100,000 - 200,000</option>
              <option value="200k_500k">200,000 - 500,000</option>
              <option value="over_500k">أكثر من 500,000</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="w-full" dir="rtl">
      <h4 className="text-lg font-semibold mb-6 text-sky-950">البيانات الإضافية</h4>
      
      <div className="space-y-6">
        {/* هل أنت المستفيد الحقيقي للحساب */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل أنت المستفيد الحقيقي للحساب؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRealBeneficiary"
                checked={additionalData.isRealBeneficiary === true}
                onChange={() => handleAdditionalDataChange("isRealBeneficiary", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRealBeneficiary"
                checked={additionalData.isRealBeneficiary === false}
                onChange={() => handleAdditionalDataChange("isRealBeneficiary", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* هل لديك حسابات / بطاقات ائتمان لدى بنوك أخرى */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل لديك حسابات / بطاقات ائتمان لدى بنوك أخرى؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasOtherBankAccounts"
                checked={additionalData.hasOtherBankAccounts === true}
                onChange={() => handleAdditionalDataChange("hasOtherBankAccounts", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasOtherBankAccounts"
                checked={additionalData.hasOtherBankAccounts === false}
                onChange={() => handleAdditionalDataChange("hasOtherBankAccounts", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* هل يتم التعامل على الحساب بموجب توكيلات */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل يتم التعامل على الحساب بموجب توكيلات؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPowerOfAttorney"
                checked={additionalData.hasPowerOfAttorney === true}
                onChange={() => handleAdditionalDataChange("hasPowerOfAttorney", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPowerOfAttorney"
                checked={additionalData.hasPowerOfAttorney === false}
                onChange={() => handleAdditionalDataChange("hasPowerOfAttorney", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* هل لديك خزائن لدى البنك الأهلي */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل لديك خزائن لدى البنك الأهلي؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasBankVaults"
                checked={additionalData.hasBankVaults === true}
                onChange={() => handleAdditionalDataChange("hasBankVaults", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasBankVaults"
                checked={additionalData.hasBankVaults === false}
                onChange={() => handleAdditionalDataChange("hasBankVaults", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* هل لديك حق الإقامة في دول أخرى */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل لديك حق الإقامة في دول أخرى؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasResidenceRights"
                checked={additionalData.hasResidenceRights === true}
                onChange={() => handleAdditionalDataChange("hasResidenceRights", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasResidenceRights"
                checked={additionalData.hasResidenceRights === false}
                onChange={() => handleAdditionalDataChange("hasResidenceRights", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* اذكر الدول الأخرى */}
        {additionalData.hasResidenceRights && (
          <div className="relative">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                اذكر الدول الأخرى
              </label>
              <input
                type="text"
                value={additionalData.otherCountries}
                onChange={(e) => handleAdditionalDataChange("otherCountries", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
                placeholder="اذكر الدول الأخرى"
              />
            </div>
          </div>
        )}

        {/* هل لديك تعامل في الأوراق المالية */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل لديك تعامل في الأوراق المالية؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasSecuritiesTrading"
                checked={additionalData.hasSecuritiesTrading === true}
                onChange={() => handleAdditionalDataChange("hasSecuritiesTrading", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasSecuritiesTrading"
                checked={additionalData.hasSecuritiesTrading === false}
                onChange={() => handleAdditionalDataChange("hasSecuritiesTrading", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* الحالة الاجتماعية */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              الحالة الاجتماعية
            </label>
            <select
              value={additionalData.maritalStatus}
              onChange={(e) => handleAdditionalDataChange("maritalStatus", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر الحالة الاجتماعية</option>
              <option value="single">أعزب</option>
              <option value="married">متزوج</option>
              <option value="divorced">مطلق</option>
              <option value="widowed">أرمل</option>
            </select>
          </div>
        </div>

        {/* المستوى التعليمي */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              المستوى التعليمي
            </label>
            <select
              value={additionalData.educationLevel}
              onChange={(e) => handleAdditionalDataChange("educationLevel", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر المستوى التعليمي</option>
              <option value="illiterate">أمي</option>
              <option value="primary">ابتدائي</option>
              <option value="preparatory">إعدادي</option>
              <option value="secondary">ثانوي</option>
              <option value="diploma">دبلوم</option>
              <option value="bachelor">بكالوريوس</option>
              <option value="master">ماجستير</option>
              <option value="phd">دكتوراه</option>
            </select>
          </div>
        </div>

        {/* خاص بالإقامة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              خاص بالإقامة
            </label>
            <select
              value={additionalData.residenceType}
              onChange={(e) => handleAdditionalDataChange("residenceType", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر نوع الإقامة</option>
              <option value="permanent">دائمة</option>
              <option value="temporary">مؤقتة</option>
              <option value="visitor">زائر</option>
            </select>
          </div>
        </div>

        {/* بلد الإقامة */}
        <div className="relative">
          <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
            <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
              بلد الإقامة
            </label>
            <select
              value={additionalData.residenceCountry}
              onChange={(e) => handleAdditionalDataChange("residenceCountry", e.target.value)}
              className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
            >
              <option value="">اختر بلد الإقامة</option>
              <option value="egypt">مصر</option>
              <option value="saudi_arabia">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
              <option value="qatar">قطر</option>
              <option value="bahrain">البحرين</option>
              <option value="oman">عمان</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* هل تشغل أو سبق لك شغل منصب عام رفيع */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل تشغل أو سبق لك شغل منصب عام رفيع في الحقل السياسي أو العسكري أو القضائي أو الحكومي؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasHighPosition"
                checked={additionalData.hasHighPosition === true}
                onChange={() => handleAdditionalDataChange("hasHighPosition", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasHighPosition"
                checked={additionalData.hasHighPosition === false}
                onChange={() => handleAdditionalDataChange("hasHighPosition", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>

        {/* اذكر في حالة نعم */}
        {additionalData.hasHighPosition && (
          <div className="relative">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                اذكر في حالة نعم
              </label>
              <textarea
                value={additionalData.highPositionDetails}
                onChange={(e) => handleAdditionalDataChange("highPositionDetails", e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right resize-none"
                rows={3}
                placeholder="اذكر التفاصيل"
              />
            </div>
          </div>
        )}

        {/* هل للعميل قرابة بأي شخص ذو نفوذ للدرجة الرابعة سياسي */}
        <div className="flex items-center gap-4">
          <label className="text-sky-950">هل للعميل قرابة بأي شخص ذو نفوذ للدرجة الرابعة سياسي؟</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPoliticalConnections"
                checked={additionalData.hasPoliticalConnections === true}
                onChange={() => handleAdditionalDataChange("hasPoliticalConnections", true)}
                className="text-orange-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPoliticalConnections"
                checked={additionalData.hasPoliticalConnections === false}
                onChange={() => handleAdditionalDataChange("hasPoliticalConnections", false)}
                className="text-orange-500"
              />
              لا
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full" dir="rtl" data-form-component>
      {/* مؤشر الخطوات */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    currentStep > step ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* محتوى الخطوات */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </div>
  );
}