import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Branch = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  waitMins: number;
};

const BRANCHES: Branch[] = [
  // القاهرة
  { id: "b1", name: "فرع التحرير", lat: 30.0444, lng: 31.2357, waitMins: 12 },
  { id: "b2", name: "فرع مدينة نصر", lat: 30.0560, lng: 31.3300, waitMins: 25 },
  { id: "b3", name: "فرع المعادي", lat: 29.9600, lng: 31.2610, waitMins: 8 },
  { id: "b4", name: "فرع رمسيس", lat: 30.0619, lng: 31.2455, waitMins: 10 },
  { id: "b5", name: "فرع العباسية", lat: 30.0730, lng: 31.2810, waitMins: 15 },
  { id: "b6", name: "فرع مصر الجديدة", lat: 30.0910, lng: 31.3220, waitMins: 20 },
  { id: "b7", name: "فرع التجمع الخامس", lat: 30.0080, lng: 31.4420, waitMins: 14 },
  { id: "b8", name: "فرع الشروق", lat: 30.1420, lng: 31.6130, waitMins: 22 },
  { id: "b9", name: "فرع الزمالك", lat: 30.0630, lng: 31.2200, waitMins: 11 },
  { id: "b10", name: "فرع العجوزة", lat: 30.0640, lng: 31.2070, waitMins: 16 },
  { id: "b11", name: "فرع الدقي", lat: 30.0380, lng: 31.2000, waitMins: 13 },
  { id: "b12", name: "فرع المهندسين", lat: 30.0500, lng: 31.1900, waitMins: 17 },
  { id: "b13", name: "فرع المقطم", lat: 30.0200, lng: 31.3000, waitMins: 19 },
  { id: "b14", name: "فرع النزهة", lat: 30.0800, lng: 31.3100, waitMins: 21 },
  { id: "b15", name: "فرع الهرم", lat: 29.9800, lng: 31.1300, waitMins: 7 },
  { id: "b16", name: "فرع الجيزة", lat: 30.0130, lng: 31.2100, waitMins: 14 },
  { id: "b17", name: "فرع الدقي الجديدة", lat: 30.0450, lng: 31.1950, waitMins: 16 },
  { id: "b18", name: "فرع المعادي الجديدة", lat: 29.9700, lng: 31.2700, waitMins: 9 },
  { id: "b19", name: "فرع حلوان", lat: 29.8500, lng: 31.3300, waitMins: 23 },
  { id: "b20", name: "فرع 15 مايو", lat: 29.9000, lng: 31.2500, waitMins: 18 },
  
  // الجيزة
  { id: "b21", name: "فرع الشيخ زايد", lat: 30.0300, lng: 30.9750, waitMins: 18 },
  { id: "b22", name: "فرع 6 أكتوبر", lat: 29.9650, lng: 30.9260, waitMins: 9 },
  { id: "b23", name: "فرع الأهرامات", lat: 29.9800, lng: 31.1300, waitMins: 11 },
  { id: "b24", name: "فرع الوراق", lat: 30.1000, lng: 31.1500, waitMins: 15 },
  { id: "b25", name: "فرع البدرشين", lat: 29.8500, lng: 31.2000, waitMins: 20 },
  { id: "b26", name: "فرع الصف", lat: 29.6000, lng: 31.3000, waitMins: 25 },
  { id: "b27", name: "فرع أوسيم", lat: 30.1200, lng: 31.1000, waitMins: 12 },
  { id: "b28", name: "فرع كرداسة", lat: 30.0500, lng: 31.0500, waitMins: 14 },
  { id: "b29", name: "فرع العياط", lat: 29.7000, lng: 31.2500, waitMins: 22 },
  { id: "b30", name: "فرع منشأة القناطر", lat: 30.2000, lng: 31.1000, waitMins: 17 },
  
  // الإسكندرية
  { id: "b31", name: "فرع الإسكندرية الرئيسي", lat: 31.2000, lng: 29.9000, waitMins: 16 },
  { id: "b32", name: "فرع سيدي بشر", lat: 31.2500, lng: 29.9500, waitMins: 13 },
  { id: "b33", name: "فرع سيدي جابر", lat: 31.1800, lng: 29.9200, waitMins: 19 },
  { id: "b34", name: "فرع الشاطبي", lat: 31.2200, lng: 29.9100, waitMins: 15 },
  { id: "b35", name: "فرع سموحة", lat: 31.1900, lng: 29.9400, waitMins: 18 },
  { id: "b36", name: "فرع لوران", lat: 31.2400, lng: 29.9600, waitMins: 14 },
  { id: "b37", name: "فرع المنتزه", lat: 31.2600, lng: 29.9800, waitMins: 21 },
  { id: "b38", name: "فرع كليوباترا", lat: 31.2100, lng: 29.8800, waitMins: 17 },
  { id: "b39", name: "فرع العجمي", lat: 31.1500, lng: 29.8500, waitMins: 20 },
  { id: "b40", name: "فرع برج العرب", lat: 31.1000, lng: 29.8000, waitMins: 24 },
  
  // الدلتا
  { id: "b41", name: "فرع طنطا", lat: 30.7800, lng: 31.0000, waitMins: 19 },
  { id: "b42", name: "فرع المنصورة", lat: 31.0400, lng: 31.3800, waitMins: 16 },
  { id: "b43", name: "فرع الزقازيق", lat: 30.5800, lng: 31.5000, waitMins: 18 },
  { id: "b44", name: "فرع المحلة الكبرى", lat: 30.9700, lng: 31.1600, waitMins: 15 },
  { id: "b45", name: "فرع كفر الشيخ", lat: 31.1000, lng: 30.9400, waitMins: 17 },
  { id: "b46", name: "فرع دمنهور", lat: 31.0400, lng: 30.4700, waitMins: 20 },
  { id: "b47", name: "فرع شبرا الخيمة", lat: 30.1200, lng: 31.2500, waitMins: 12 },
  { id: "b48", name: "فرع بنها", lat: 30.4700, lng: 31.1800, waitMins: 14 },
  { id: "b49", name: "فرع قليوب", lat: 30.1800, lng: 31.2000, waitMins: 13 },
  { id: "b50", name: "فرع شبين الكوم", lat: 30.5500, lng: 31.0000, waitMins: 16 },
  
  // القناة
  { id: "b51", name: "فرع الإسماعيلية", lat: 30.6000, lng: 32.2700, waitMins: 22 },
  { id: "b52", name: "فرع السويس", lat: 29.9700, lng: 32.5500, waitMins: 25 },
  { id: "b53", name: "فرع بورسعيد", lat: 31.2600, lng: 32.3000, waitMins: 23 },
  { id: "b54", name: "فرع العريش", lat: 31.1300, lng: 33.8000, waitMins: 28 },
  { id: "b55", name: "فرع شرم الشيخ", lat: 27.9200, lng: 34.3300, waitMins: 30 },
  { id: "b56", name: "فرع الغردقة", lat: 27.2600, lng: 33.8100, waitMins: 26 },
  { id: "b57", name: "فرع الأقصر", lat: 25.6900, lng: 32.6400, waitMins: 24 },
  { id: "b58", name: "فرع أسوان", lat: 24.0900, lng: 32.9000, waitMins: 27 },
  
  // الصعيد
  { id: "b59", name: "فرع أسيوط", lat: 27.1800, lng: 31.1800, waitMins: 21 },
  { id: "b60", name: "فرع سوهاج", lat: 26.5600, lng: 31.7000, waitMins: 23 },
  { id: "b61", name: "فرع قنا", lat: 26.1700, lng: 32.7200, waitMins: 25 },
  { id: "b62", name: "فرع بني سويف", lat: 29.0700, lng: 31.0900, waitMins: 19 },
  { id: "b63", name: "فرع المنيا", lat: 28.1100, lng: 30.7500, waitMins: 20 },
  { id: "b64", name: "فرع الفيوم", lat: 29.3100, lng: 30.8400, waitMins: 18 },
  { id: "b65", name: "فرع الوادي الجديد", lat: 25.4500, lng: 30.5500, waitMins: 29 },
  { id: "b66", name: "فرع البحر الأحمر", lat: 25.4500, lng: 30.5500, waitMins: 31 },
  
  // فروع إضافية في القاهرة الكبرى
  { id: "b67", name: "فرع النهضة", lat: 30.0700, lng: 31.3500, waitMins: 14 },
  { id: "b68", name: "فرع حدائق القبة", lat: 30.0800, lng: 31.2800, waitMins: 16 },
  { id: "b69", name: "فرع الزيتون", lat: 30.0900, lng: 31.3000, waitMins: 15 },
  { id: "b70", name: "فرع المطرية", lat: 30.1200, lng: 31.3200, waitMins: 17 },
  { id: "b71", name: "فرع شبرا", lat: 30.1300, lng: 31.2400, waitMins: 13 },
  { id: "b72", name: "فرع روض الفرج", lat: 30.1000, lng: 31.2200, waitMins: 12 },
  { id: "b73", name: "فرع بولاق", lat: 30.0600, lng: 31.2300, waitMins: 11 },
  { id: "b74", name: "فرع الأزبكية", lat: 30.0500, lng: 31.2400, waitMins: 10 },
  { id: "b75", name: "فرع الموسكي", lat: 30.0400, lng: 31.2500, waitMins: 9 },
  { id: "b76", name: "فرع باب الشعرية", lat: 30.0500, lng: 31.2600, waitMins: 8 },
  { id: "b77", name: "فرع الحسين", lat: 30.0400, lng: 31.2600, waitMins: 7 },
  { id: "b78", name: "فرع السيدة زينب", lat: 30.0300, lng: 31.2500, waitMins: 6 },
  { id: "b79", name: "فرع السيدة عائشة", lat: 30.0200, lng: 31.2400, waitMins: 5 },
  { id: "b80", name: "فرع السيدة نفيسة", lat: 30.0100, lng: 31.2300, waitMins: 4 },
];

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function Step5() {
  const navigate = useNavigate();

  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNearbyOnly, setShowNearbyOnly] = useState<boolean>(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("step5");
    if (saved) {
      try {
        const v = JSON.parse(saved);
        if (v.userPos) setUserPos(v.userPos);
        if (v.selectedId) setSelectedId(v.selectedId);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (userPos) return;
    // Assume Ramses (Cairo Ramses Station) if location permission denied/unavailable
    const ramses = { lat: 30.0619, lng: 31.2455 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserPos(ramses)
      );
    } else {
      setUserPos(ramses);
    }
  }, [userPos]);

  useEffect(() => {
    sessionStorage.setItem("step5", JSON.stringify({ userPos, selectedId }));
  }, [userPos, selectedId]);

  const branchesSorted = useMemo(() => {
    if (!userPos) return BRANCHES.map((b) => ({ ...b, km: NaN }));
    return BRANCHES
      .map((b) => ({ ...b, km: haversineKm(userPos.lat, userPos.lng, b.lat, b.lng) }))
      .sort((a, b) => (a.km as number) - (b.km as number));
  }, [userPos]);

  const NEARBY_KM = 12;
  const nearbyBranches = useMemo(() => {
    return branchesSorted.filter((b) => !isNaN((b as any).km) && (b as any).km <= NEARBY_KM);
  }, [branchesSorted]);

  const branchesToShow = useMemo(() => {
    let filtered = showNearbyOnly && nearbyBranches.length ? nearbyBranches : branchesSorted;
    
    if (searchTerm) {
      filtered = filtered.filter(branch => 
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [nearbyBranches, branchesSorted, showNearbyOnly, searchTerm]);

  // Map helpers removed as the view now uses a pure list

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 pt-10 md:pt-[15vh] text-right max-w-[700px] pb-24 md:pb-6" dir="rtl">
        <h3 className="text-xl font-semibold mb-6 text-black">تحديد الفرع الأقرب لك</h3>
        
        {/* Search and Filter Controls */}
        <div className="w-full mb-6 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="relative border-2 border-orange-400 rounded-md focus-within:ring-2 focus-within:ring-orange-500">
              <label className="absolute -top-3 right-4 bg-white px-2 text-base text-sky-950">
                البحث عن فرع
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-3 pt-5 bg-transparent outline-none text-right"
                placeholder="ابحث عن اسم الفرع..."
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sky-950">
              <input
                type="checkbox"
                checked={showNearbyOnly}
                onChange={(e) => setShowNearbyOnly(e.target.checked)}
                className="text-orange-500 rounded"
              />
              عرض الفروع القريبة فقط
            </label>
            <span className="text-sm text-gray-600">
              ({branchesToShow.length} فرع)
            </span>
          </div>
        </div>

        {/* Branches list view */}
        <div className="w-full">
        <div className="text-sm text-black mb-3 text-right">
          {nearbyBranches.length > 0 && showNearbyOnly ? (
            <span>الفروع القريبة منك (في نطاق {NEARBY_KM} كم):</span>
          ) : (
            <span>جميع الفروع مرتبة حسب القرب:</span>
          )}
        </div>
        <ul className="w-full mb-8 rounded-xl border border-orange-600/30 overflow-y-auto max-h-80 md:max-h-96 divide-y divide-orange-600/10 bg-white">
          {branchesToShow.length === 0 ? (
            <li className="p-8 text-center text-gray-500">
              <div className="text-lg mb-2">لم يتم العثور على فروع</div>
              <div className="text-sm">جرب البحث بكلمات مختلفة أو قم بإلغاء تحديد "الفروع القريبة فقط"</div>
            </li>
          ) : (
            branchesToShow.map((b) => {
              const km = (b as any).km as number | undefined;
              const isNearby = !isNaN(km as number) && (km as number) <= NEARBY_KM;
              return (
                <li key={b.id} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setSelectedId(b.id)}
                    className={`w-full p-4 text-right flex items-center justify-between transition-colors ${selectedId === b.id ? "bg-orange-50 border-r-4 border-orange-500" : "hover:bg-orange-50"}`}
                  >
                    <div className="flex-1 pr-3">
                      <div className="text-black font-medium mb-1 text-right">{b.name}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-orange-600">
                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                          </svg>
                          {isNaN(km as number) ? "—" : `${(km as number).toFixed(1)} كم`}
                        </span>
                        <span className={`inline-flex items-center text-[11px] px-2 py-1 rounded-full ${
                          b.waitMins <= 10 ? "bg-green-100 text-green-700 border border-green-300" :
                          b.waitMins <= 20 ? "bg-yellow-100 text-yellow-700 border border-yellow-300" :
                          "bg-red-100 text-red-700 border border-red-300"
                        }`}>
                          {b.waitMins <= 10 ? "قليل الانتظار" : 
                           b.waitMins <= 20 ? "متوسط الانتظار" : "كثير الانتظار"} ({b.waitMins} شخص)
                        </span>
                        {isNearby && (
                          <span className="inline-flex items-center text-[11px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300">
                            قريب منك
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedId === b.id && (
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors bg-white border-orange-300 text-orange-600 hover:bg-orange-50"
                        aria-label="افتح الموقع"
                        title="افتح في خرائط جوجل"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                      </a>
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
        </div>
      </div>

      {/* Corner Navigation Buttons */}
      <div className="pointer-events-none">
        <div className="pointer-events-auto fixed bottom-2 left-1/2 -translate-x-1/2 md:absolute md:bottom-4 md:left-4 md:translate-x-0 flex items-center gap-6 z-40">
          <button
            type="button"
            className="group bg-gray-200 hover:bg-gray-300 text-sky-950 w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md relative"
            onClick={() => { if (window.confirm("بالرجوع سيتم فقدان البيانات المُدخلة في هذه الخطوة. هل تريد المتابعة؟")) { navigate(-1); } }}
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
            onClick={() => navigate("/step6")}
            aria-label="التالي"
            disabled={!selectedId}
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


