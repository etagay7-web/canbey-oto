"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Award, Wrench, type LucideIcon } from "lucide-react";

type StatItem = { label: string; value: string };

const DEFAULT_ITEMS: StatItem[] = [
  { value: "20+", label: "Yıl Tecrübe" },
  { value: "15.000+", label: "Araç Tamir" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
  { value: "50+", label: "Uzman Teknisyen" },
];

const ICON_BY_INDEX: LucideIcon[] = [Award, Wrench, TrendingUp, Users];

function parseTarget(value: string): { num: number; suffix: string } {
  // "20+", "15.000+", "%98" gibi değerleri yakalar
  const numMatch = value.match(/[\d.,]+/);
  if (!numMatch) return { num: 0, suffix: value };
  const numStr = numMatch[0];
  const num = parseInt(numStr.replace(/[.,]/g, ""), 10) || 0;
  const startIdx = value.indexOf(numStr);
  const prefix = value.slice(0, startIdx);
  const suffix = value.slice(startIdx + numStr.length);
  return { num, suffix: prefix + suffix };
}

function Counter({ value }: { value: string }) {
  const { num, suffix } = parseTarget(value);
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
              setN(Math.round(num * eased));
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
  }, [num]);

  // Eğer numerik kısım yoksa olduğu gibi göster
  if (num === 0 && !suffix.match(/\d/)) {
    return <span ref={ref}>{value}</span>;
  }
  return (
    <span ref={ref}>
      {n.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

export default function Stats({ items }: { items?: StatItem[] }) {
  const data = items && items.length > 0 ? items : DEFAULT_ITEMS;
  return (
    <section className="bg-white border-y border-[#E8E8EC]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((s, i) => {
          const Icon = ICON_BY_INDEX[i % ICON_BY_INDEX.length];
          return (
            <div key={i} className="text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="icon-tile icon-tile-lg">
                <Icon size={22} strokeWidth={2} />
              </div>
              <div>
                <div className="font-display text-5xl text-[#14141A] leading-none mb-1">
                  <Counter value={s.value} />
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#5A5A66] font-cond font-semibold">
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
