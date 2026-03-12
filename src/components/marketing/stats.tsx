"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { value: 3, suffix: "営業日", label: "デモ完成", prefix: "" },
  { value: 0, suffix: "円", label: "初期費用", prefix: "¥" },
  { value: 100, suffix: "%", label: "コード引き渡し保証", prefix: "" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  inView,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (value === 0) {
      setCount(0);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value, inView]);

  const displayValue =
    value >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: i * 0.1,
    },
  }),
};

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light relative py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="glass-card-light p-6 sm:p-8 text-center"
            >
              <div className="text-3xl sm:text-4xl font-black gradient-text mb-2 font-[var(--font-inter)]">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  inView={inView}
                />
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
