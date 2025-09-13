import { useEffect, useState } from "react";
import logo2 from "../../assets/logo2.png";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      onDone();
    }, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src={logo2}
        alt="Intro"
        className="w-72 h-auto intro-anim"
      />
    </div>
  );
}


