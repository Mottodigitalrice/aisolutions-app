"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  UtensilsCrossed,
  Scissors,
  Stethoscope,
  ShoppingBag,
  HelpCircle,
  Palette,
  Search,
  Smartphone,
  Languages,
  CalendarCheck,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ===== Types ===== */
interface CardOption {
  id: string;
  label: string;
  icon?: LucideIcon;
  sublabel?: string;
}

interface WizardData {
  businessType: string;
  businessSubType: string;
  businessTypeOther: string;
  websiteStatus: string;
  currentWebsite: string;
  priorities: string[];
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  instagram: string;
  description: string;
}

/* ===== Step Options ===== */
const businessTypes: CardOption[] = [
  { id: "レストラン・飲食店", label: "レストラン・飲食店", icon: UtensilsCrossed },
  { id: "美容室・サロン", label: "美容室・サロン", icon: Scissors },
  { id: "クリニック・医院", label: "クリニック・医院", icon: Stethoscope },
  { id: "小売店", label: "小売店", icon: ShoppingBag },
  { id: "その他", label: "その他", icon: HelpCircle },
];

const restaurantTypes: CardOption[] = [
  { id: "和食", label: "和食" },
  { id: "イタリアン", label: "イタリアン" },
  { id: "フレンチ", label: "フレンチ" },
  { id: "中華", label: "中華" },
  { id: "カフェ", label: "カフェ" },
  { id: "焼肉", label: "焼肉" },
  { id: "その他", label: "その他" },
];

const salonTypes: CardOption[] = [
  { id: "ヘアサロン", label: "ヘアサロン" },
  { id: "ネイル", label: "ネイル" },
  { id: "エステ", label: "エステ" },
  { id: "その他", label: "その他" },
];

const clinicTypes: CardOption[] = [
  { id: "歯科", label: "歯科" },
  { id: "皮膚科", label: "皮膚科" },
  { id: "内科", label: "内科" },
  { id: "小児科", label: "小児科" },
  { id: "整形外科", label: "整形外科" },
  { id: "その他", label: "その他" },
];

const websiteStatuses: CardOption[] = [
  {
    id: "はい、でも古い",
    label: "はい、でも古い",
    sublabel: "リニューアルで生まれ変わります",
  },
  {
    id: "はい、でも不満がある",
    label: "はい、でも不満がある",
    sublabel: "もっと良いサイトにします",
  },
  {
    id: "いいえ、まだない",
    label: "いいえ、まだない",
    sublabel: "ゼロから作ります",
  },
];

const priorities: CardOption[] = [
  { id: "デザイン", label: "デザイン", icon: Palette },
  { id: "集客・SEO", label: "集客・SEO", icon: Search },
  { id: "スマホ対応", label: "スマホ対応", icon: Smartphone },
  { id: "多言語対応", label: "多言語対応", icon: Languages },
  { id: "予約機能", label: "予約機能", icon: CalendarCheck },
  { id: "更新のしやすさ", label: "更新のしやすさ", icon: RefreshCw },
];

/* ===== Animation Variants ===== */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

const cardSelectVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

/* ===== SessionStorage Key ===== */
const STORAGE_KEY = "aisolutions-wizard";

function loadSavedState(): { step: number; data: WizardData } | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore parse errors
  }
  return null;
}

const defaultData: WizardData = {
  businessType: "",
  businessSubType: "",
  businessTypeOther: "",
  websiteStatus: "",
  currentWebsite: "",
  priorities: [],
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  instagram: "",
  description: "",
};

/* ===== Component ===== */
export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<WizardData>(defaultData);

  // Restore saved state on mount
  useEffect(() => {
    const saved = loadSavedState();
    if (saved) {
      setStep(saved.step);
      setData(saved.data);
    }
  }, []);

  // Auto-persist state to sessionStorage on every change
  useEffect(() => {
    if (submitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      // Ignore storage errors
    }
  }, [step, data, submitted]);

  // Determine the total number of steps based on business type
  const hasSubTypeStep =
    data.businessType === "レストラン・飲食店" ||
    data.businessType === "美容室・サロン" ||
    data.businessType === "クリニック・医院" ||
    data.businessType === "その他";

  const totalSteps = hasSubTypeStep ? 5 : 4;

  // Map logical step to actual step
  function getActualStep(logicalStep: number): number {
    if (!hasSubTypeStep && logicalStep >= 1) {
      return logicalStep + 1;
    }
    return logicalStep;
  }

  const actualStep = getActualStep(step);

  function goNext() {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  function selectBusinessType(type: string) {
    setData((d) => ({
      ...d,
      businessType: type,
      businessSubType: "",
      businessTypeOther: "",
    }));
    // Auto-advance after selection
    setTimeout(() => {
      setDirection(1);
      setStep((s) => s + 1);
    }, 300);
  }

  function selectSubType(subType: string) {
    setData((d) => ({ ...d, businessSubType: subType }));
    setTimeout(() => {
      setDirection(1);
      setStep((s) => s + 1);
    }, 300);
  }

  function selectWebsiteStatus(status: string) {
    setData((d) => ({ ...d, websiteStatus: status }));
    // Don't auto-advance if they need to enter a URL
    if (status === "いいえ、まだない") {
      setTimeout(() => {
        setDirection(1);
        setStep((s) => s + 1);
      }, 300);
    }
  }

  function togglePriority(priority: string) {
    setData((d) => {
      const current = d.priorities;
      if (current.includes(priority)) {
        return { ...d, priorities: current.filter((p) => p !== priority) };
      }
      if (current.length >= 2) return d; // Max 2 selections
      return { ...d, priorities: [...current, priority] };
    });
  }

  async function handleSubmit() {
    // Validate required fields
    if (!data.businessName || !data.contactName || !data.email) {
      toast.error("必須項目を入力してください");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("正しいメールアドレスを入力してください");
      return;
    }

    setSubmitting(true);

    // Build the final business type
    let finalBusinessType = data.businessType;
    if (data.businessSubType) {
      finalBusinessType = `${data.businessType} / ${data.businessSubType}`;
    }
    if (data.businessTypeOther) {
      finalBusinessType = data.businessTypeOther;
    }

    // Build description including wizard answers
    const descriptionParts: string[] = [];
    if (data.websiteStatus) {
      descriptionParts.push(`現在のサイト状況: ${data.websiteStatus}`);
    }
    if (data.priorities.length > 0) {
      descriptionParts.push(`重要な点: ${data.priorities.join("、")}`);
    }
    if (data.description) {
      descriptionParts.push(data.description);
    }

    const payload = {
      businessName: data.businessName,
      businessType: finalBusinessType,
      currentWebsite: data.currentWebsite || undefined,
      instagram: data.instagram || undefined,
      description: descriptionParts.join("\n") || undefined,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || undefined,
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("送信に失敗しました");
      }

      setSubmitted(true);
      sessionStorage.removeItem(STORAGE_KEY);
      toast.success("リクエストを受け付けました");
    } catch {
      toast.error("送信に失敗しました。hello@aisolutions.jp まで直接ご連絡ください");
    } finally {
      setSubmitting(false);
    }
  }

  // ===== SUCCESS STATE =====
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-3">
          ありがとうございます！
        </h3>
        <p className="text-gray-400 leading-relaxed">
          ご入力いただいたメールアドレスにデモサイトのURLをお送りいたします。
          <br />
          3営業日以内にお届けします。楽しみにお待ちください。
        </p>
      </motion.div>
    );
  }

  // ===== PROGRESS BAR =====
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>
            ステップ {step + 1} / {totalSteps}
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step content with animations */}
      <div className="min-h-[320px] relative">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ===== STEP 0: Business Type ===== */}
          {actualStep === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                お店の種類を教えてください
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                最適なデザインをご提案するために
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {businessTypes.map((type, i) => (
                  <motion.button
                    key={type.id}
                    custom={i}
                    variants={cardSelectVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => selectBusinessType(type.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                      data.businessType === type.id
                        ? "border-[#6366f1] bg-[#6366f1]/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {type.icon && (
                      <type.icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          data.businessType === type.id
                            ? "text-[#818cf8]"
                            : "text-gray-500"
                        }`}
                      />
                    )}
                    <span className="font-medium">{type.label}</span>
                    {data.businessType === type.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== STEP 1: Sub-type (conditional) ===== */}
          {actualStep === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {data.businessType === "レストラン・飲食店" && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">
                    どんなジャンルですか？
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    ジャンルに合ったデザインをご提案します
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {restaurantTypes.map((type, i) => (
                      <motion.button
                        key={type.id}
                        custom={i}
                        variants={cardSelectVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => selectSubType(type.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                          data.businessSubType === type.id
                            ? "border-[#6366f1] bg-[#6366f1]/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="font-medium">{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {data.businessType === "美容室・サロン" && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">
                    どんなサロンですか？
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    サロンの種類に合ったデザインをご提案します
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {salonTypes.map((type, i) => (
                      <motion.button
                        key={type.id}
                        custom={i}
                        variants={cardSelectVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => selectSubType(type.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                          data.businessSubType === type.id
                            ? "border-[#6366f1] bg-[#6366f1]/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="font-medium">{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {data.businessType === "クリニック・医院" && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">
                    どんなクリニックですか？
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    診療科に合ったデザインをご提案します
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {clinicTypes.map((type, i) => (
                      <motion.button
                        key={type.id}
                        custom={i}
                        variants={cardSelectVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() => selectSubType(type.id)}
                        className={`p-4 rounded-xl border transition-all duration-200 text-center ${
                          data.businessSubType === type.id
                            ? "border-[#6366f1] bg-[#6366f1]/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="font-medium">{type.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {data.businessType === "その他" && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">
                    業種を教えてください
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    どんな業種でも対応いたします
                  </p>
                  <Input
                    placeholder="例: 税理士事務所、学習塾、整骨院..."
                    value={data.businessTypeOther}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        businessTypeOther: e.target.value,
                      }))
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                  />
                </>
              )}
            </motion.div>
          )}

          {/* ===== STEP 2: Website Status ===== */}
          {actualStep === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                現在ウェブサイトはお持ちですか？
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                状況に合わせたプランをご提案します
              </p>
              <div className="space-y-3 mb-4">
                {websiteStatuses.map((status, i) => (
                  <motion.button
                    key={status.id}
                    custom={i}
                    variants={cardSelectVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => selectWebsiteStatus(status.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                      data.websiteStatus === status.id
                        ? "border-[#6366f1] bg-[#6366f1]/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          data.websiteStatus === status.id
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {status.label}
                      </p>
                      {status.sublabel && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {status.sublabel}
                        </p>
                      )}
                    </div>
                    {data.websiteStatus === status.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Conditional URL input */}
              {data.websiteStatus &&
                data.websiteStatus !== "いいえ、まだない" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <label className="text-sm text-gray-400 block mb-2">
                      現在のウェブサイトURL
                    </label>
                    <Input
                      placeholder="https://..."
                      value={data.currentWebsite}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          currentWebsite: e.target.value,
                        }))
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                    />
                  </motion.div>
                )}
            </motion.div>
          )}

          {/* ===== STEP 3: Priorities ===== */}
          {actualStep === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                ウェブサイトで一番重視したいのは？
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                1〜2つ選択してください
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {priorities.map((priority, i) => (
                  <motion.button
                    key={priority.id}
                    custom={i}
                    variants={cardSelectVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => togglePriority(priority.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                      data.priorities.includes(priority.id)
                        ? "border-[#6366f1] bg-[#6366f1]/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {priority.icon && (
                      <priority.icon
                        className={`w-5 h-5 ${
                          data.priorities.includes(priority.id)
                            ? "text-[#818cf8]"
                            : "text-gray-500"
                        }`}
                      />
                    )}
                    <span className="text-sm font-medium">
                      {priority.label}
                    </span>
                    {data.priorities.includes(priority.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 rounded-full bg-[#6366f1] flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== STEP 4: Contact Info ===== */}
          {actualStep === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                あと少しで完了です
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                デモをお届けするためのご連絡先
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    お店の名前 <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="例: さくらラーメン"
                    value={data.businessName}
                    onChange={(e) =>
                      setData((d) => ({ ...d, businessName: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="例: 田中太郎"
                    value={data.contactName}
                    onChange={(e) =>
                      setData((d) => ({ ...d, contactName: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    メールアドレス <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="例: tanaka@example.com"
                    value={data.email}
                    onChange={(e) =>
                      setData((d) => ({ ...d, email: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">
                      電話番号{" "}
                      <span className="text-gray-600 text-xs">（任意）</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="例: 03-1234-5678"
                      value={data.phone}
                      onChange={(e) =>
                        setData((d) => ({ ...d, phone: e.target.value }))
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1.5">
                      Instagram{" "}
                      <span className="text-gray-600 text-xs">（任意）</span>
                    </label>
                    <Input
                      placeholder="@username"
                      value={data.instagram}
                      onChange={(e) =>
                        setData((d) => ({ ...d, instagram: e.target.value }))
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">
                    ご要望・コメント{" "}
                    <span className="text-gray-600 text-xs">（任意）</span>
                  </label>
                  <Textarea
                    placeholder="どんなウェブサイトにしたいか、ご自由にお書きください"
                    rows={3}
                    value={data.description}
                    onChange={(e) =>
                      setData((d) => ({ ...d, description: e.target.value }))
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#6366f1] resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        {step > 0 ? (
          <Button
            variant="ghost"
            onClick={goBack}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        ) : (
          <div />
        )}

        {actualStep === 4 ? (
          <Button
            onClick={handleSubmit}
            disabled={
              submitting || !data.businessName || !data.contactName || !data.email
            }
            className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e6] hover:to-[#7c3aed] text-white px-8 font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                送信中...
              </>
            ) : (
              <>
                無料で依頼する
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        ) : (
          /* Show Next button only for steps that don't auto-advance, or for sub-type "その他" and website status with URL */
          (actualStep === 1 && data.businessType === "その他" && data.businessTypeOther) ||
          (actualStep === 2 && data.websiteStatus && data.websiteStatus !== "いいえ、まだない") ||
          actualStep === 3 ? (
            <Button
              onClick={goNext}
              className="rounded-full bg-[#6366f1] hover:bg-[#5558e6] text-white px-6"
            >
              {actualStep === 3 && data.priorities.length === 0 ? "スキップ" : "次へ"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  );
}
