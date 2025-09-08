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
  { id: "b1", name: "فرع التحرير", lat: 30.0444, lng: 31.2357, waitMins: 12 },
  { id: "b2", name: "فرع مدينة نصر", lat: 30.0560, lng: 31.3300, waitMins: 25 },
  { id: "b3", name: "فرع المعادي", lat: 29.9600, lng: 31.2610, waitMins: 8 },
  { id: "b4", name: "فرع الشيخ زايد", lat: 30.0300, lng: 30.9750, waitMins: 18 },
  { id: "b5", name: "فرع رمسيس", lat: 30.0619, lng: 31.2455, waitMins: 10 },
  { id: "b6", name: "فرع العباسية", lat: 30.0730, lng: 31.2810, waitMins: 15 },
  { id: "b7", name: "فرع مصر الجديدة", lat: 30.0910, lng: 31.3220, waitMins: 20 },
  { id: "b8", name: "فرع التجمع الخامس", lat: 30.0080, lng: 31.4420, waitMins: 14 },
  { id: "b9", name: "فرع الشروق", lat: 30.1420, lng: 31.6130, waitMins: 22 },
  { id: "b10", name: "فرع 6 أكتوبر", lat: 29.9650, lng: 30.9260, waitMins: 9 },
  { id: "b11", name: "فرع الزمالك", lat: 30.0630, lng: 31.2200, waitMins: 11 },
  { id: "b12", name: "فرع العجوزة", lat: 30.0640, lng: 31.2070, waitMins: 16 },
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

  const branchesToShow = nearbyBranches.length ? nearbyBranches : branchesSorted;

  // Map helpers removed as the view now uses a pure list

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-end relative">
      <div className="w-full ml-auto px-6 md:px-10 pt-6 md:pt-[15vh] text-right max-w-[900px]" dir="rtl">
        <h3 className="text-xl font-semibold mb-2 text-black">تحديد الفرع الأقرب لك</h3>
        

        {/* Branches list view */}
        <div className="w-full md:w-2/3 ml-auto">
        <div className="text-sm text-black mb-3 text-right">
          {nearbyBranches.length > 0 ? (
            <span>أقرب الفروع ضمن {NEARBY_KM} كم من موقعك:</span>
          ) : (
            <span>نعرض جميع الفروع مرتبة حسب القرب:</span>
          )}
        </div>
        <ul className="w-full mb-8 rounded-xl border border-orange-600/30 overflow-y-auto max-h-72 md:max-h-96 divide-y divide-orange-600/10 bg-white">
          {branchesToShow.map((b) => {
            const km = (b as any).km as number | undefined;
            return (
              <li key={b.id} className="bg-white">
                <button
                  type="button"
                  onClick={() => setSelectedId(b.id)}
                  className={`w-full p-4 text-right flex items-center justify-between transition-colors ${selectedId === b.id ? "bg-orange-50" : "hover:bg-orange-50"}`}
                >
                  <div className="flex-1 pr-2">
                    <div className="text-black font-medium mb-0.5">{b.name}</div>
                    <div className="text-xs text-black flex items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                        {isNaN(km as number) ? "—" : `${(km as number).toFixed(1)} كم`}
                      </span>
                      <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full border border-orange-600/40 bg-orange-50 text-black">
                        زمن الانتظار {b.waitMins} دقيقة
                      </span>
                    </div>
                  </div>
                  <span className={`inline-block w-4 h-4 rounded-full border ${selectedId === b.id ? "bg-orange-600 border-orange-600" : "bg-white border-orange-300"}`}></span>
                </button>
              </li>
            );
          })}
        </ul>
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
          onClick={() => navigate("/")}
          aria-label="التالي"
          disabled={!selectedId}
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


