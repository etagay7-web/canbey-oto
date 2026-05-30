"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Award, Wrench } from "lucide-react";

const stats = [
  { value: 20, suffix: "+", label: "Yıl Tecrübe", Icon: Award },
  { value: 15000, suffix: "+", label: "Araç Tamir", Icon: Wrench },
  { value: 98, suffix: "%", label: "Müşteri Memnuniyeti", Icon: TrendingUp },
  { value: 50, suffix: "+", label: "Uzman Teknisyen", Icon: Users },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {n.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-white border-y border-[#E8E8EC]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="icon-tile icon-tile-lg">
              <s.Icon size={22} strokeWidth={2} />
            </div>
            <div>
              <div className="font-display text-5xl text-[#14141A] leading-none mb-1">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#5A5A66] font-cond font-semibold">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
