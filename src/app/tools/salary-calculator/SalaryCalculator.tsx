'use client';

import { useState, useMemo, useCallback } from 'react';

/* ───── helpers ───── */
function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('ko-KR');
}

function man(n: number): string {
  if (n >= 10000) {
    const eok = Math.floor(n / 10000);
    const rest = n % 10000;
    return rest > 0 ? `${eok}억 ${formatNumber(rest)}만` : `${eok}억`;
  }
  return `${formatNumber(n)}만`;
}

/* ───── 근로소득공제 ───── */
function calcEarnedIncomeDeduction(annualSalary: number): number {
  // annualSalary in 만원
  if (annualSalary <= 500) return annualSalary * 0.7;
  if (annualSalary <= 1500) return 350 + (annualSalary - 500) * 0.4;
  if (annualSalary <= 4500) return 750 + (annualSalary - 1500) * 0.15;
  if (annualSalary <= 10000) return 1200 + (annualSalary - 4500) * 0.05;
  return 1475 + (annualSalary - 10000) * 0.02;
}

/* ───── 소득세 (산출세액) ───── */
function calcIncomeTax(taxableIncome: number): number {
  // taxableIncome in 만원
  if (taxableIncome <= 0) return 0;
  if (taxableIncome <= 1400) return taxableIncome * 0.06;
  if (taxableIncome <= 5000) return 84 + (taxableIncome - 1400) * 0.15;
  if (taxableIncome <= 8800) return 624 + (taxableIncome - 5000) * 0.24;
  if (taxableIncome <= 15000) return 1536 + (taxableIncome - 8800) * 0.35;
  if (taxableIncome <= 30000) return 3706 + (taxableIncome - 15000) * 0.38;
  if (taxableIncome <= 50000) return 9406 + (taxableIncome - 30000) * 0.4;
  if (taxableIncome <= 100000) return 17406 + (taxableIncome - 50000) * 0.42;
  return 38406 + (taxableIncome - 100000) * 0.45;
}

/* ───── deduction colors ───── */
const DEDUCTION_COLORS = [
  '#3b82f6', // 국민연금  - blue
  '#10b981', // 건강보험  - emerald
  '#14b8a6', // 장기요양  - teal
  '#f59e0b', // 고용보험  - amber
  '#ef4444', // 소득세   - red
  '#f97316', // 지방소득세 - orange
];

/* ───── donut chart ───── */
function DonutChart({
  takeHome,
  totalDeduction,
}: {
  takeHome: number;
  totalDeduction: number;
}) {
  const total = takeHome + totalDeduction;
  if (total === 0) return null;
  const takeHomePct = (takeHome / total) * 100;
  const deductionPct = (totalDeduction / total) * 100;

  // SVG donut via stroke-dasharray
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const takeHomeArc = (takeHomePct / 100) * circumference;
  const deductionArc = (deductionPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
        {/* take-home */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#1a56db"
          strokeWidth="22"
          strokeDasharray={`${takeHomeArc} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        {/* deductions */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="22"
          strokeDasharray={`${deductionArc} ${circumference}`}
          strokeDashoffset={-takeHomeArc}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="flex gap-5 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-primary" />
          실수령 {takeHomePct.toFixed(1)}%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-border" />
          공제 {deductionPct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

/* ───── main component ───── */
export default function SalaryCalculator() {
  const [annualSalaryMan, setAnnualSalaryMan] = useState(3000); // 만원
  const [taxExemptMonthly, setTaxExemptMonthly] = useState(10); // 만원/월
  const [dependents, setDependents] = useState(1);

  const handleSalaryInput = useCallback((val: string) => {
    const n = parseInt(val.replace(/,/g, ''), 10);
    if (!isNaN(n) && n >= 0 && n <= 100000) setAnnualSalaryMan(n);
    else if (val === '') setAnnualSalaryMan(0);
  }, []);

  const result = useMemo(() => {
    const monthlySalary = annualSalaryMan / 12; // 만원
    const monthlySalaryWon = monthlySalary * 10000; // 원

    // --- 4대보험 (monthly, in 원) ---
    // 국민연금: 4.5% of monthly, max 기준소득월액 590만 → max 265,500
    const pensionBase = Math.min(monthlySalaryWon, 5_900_000);
    const nationalPension = Math.round(pensionBase * 0.045);

    // 건강보험: 3.545%
    const healthInsurance = Math.round(monthlySalaryWon * 0.03545);

    // 장기요양: 건강보험 × 12.95%
    const longTermCare = Math.round(healthInsurance * 0.1295);

    // 고용보험: 0.9%
    const employmentInsurance = Math.round(monthlySalaryWon * 0.009);

    // --- 소득세 ---
    // 과세표준 계산 (만원 단위)
    const annualTaxExempt = taxExemptMonthly * 12;
    const earnedIncomeDeduction = calcEarnedIncomeDeduction(annualSalaryMan);
    const personalDeduction = 150 * dependents;
    const standardTaxCredit = 13; // 만원

    const taxableIncome = Math.max(
      0,
      annualSalaryMan - annualTaxExempt - earnedIncomeDeduction - personalDeduction - standardTaxCredit,
    );

    const annualIncomeTaxMan = calcIncomeTax(taxableIncome); // 만원
    const monthlyIncomeTax = Math.round((annualIncomeTaxMan * 10000) / 12); // 원

    // 지방소득세: 소득세의 10%
    const monthlyLocalTax = Math.round(monthlyIncomeTax * 0.1);

    const totalDeduction =
      nationalPension + healthInsurance + longTermCare + employmentInsurance + monthlyIncomeTax + monthlyLocalTax;

    const monthlyTakeHome = monthlySalaryWon - totalDeduction;
    const annualTakeHome = monthlyTakeHome * 12;

    const deductions = [
      { label: '국민연금', amount: nationalPension, color: DEDUCTION_COLORS[0] },
      { label: '건강보험', amount: healthInsurance, color: DEDUCTION_COLORS[1] },
      { label: '장기요양보험', amount: longTermCare, color: DEDUCTION_COLORS[2] },
      { label: '고용보험', amount: employmentInsurance, color: DEDUCTION_COLORS[3] },
      { label: '소득세', amount: monthlyIncomeTax, color: DEDUCTION_COLORS[4] },
      { label: '지방소득세', amount: monthlyLocalTax, color: DEDUCTION_COLORS[5] },
    ];

    return {
      monthlySalaryWon,
      monthlyTakeHome,
      annualTakeHome,
      totalDeduction,
      deductions,
      taxableIncome,
      earnedIncomeDeduction,
    };
  }, [annualSalaryMan, taxExemptMonthly, dependents]);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a56db] to-[#1e40af] p-8 md:p-10 text-white">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <h1 className="text-2xl md:text-3xl font-bold mb-2">연봉 실수령액 계산기</h1>
        <p className="text-blue-200 text-sm md:text-base">
          2026년 최신 세율 기준으로 4대 보험, 소득세, 지방소득세를 반영한 실수령액을 계산합니다.
        </p>
      </div>

      {/* ── Input Section ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 연봉 */}
        <div className="md:col-span-3 bg-white rounded-xl border border-border p-6 space-y-4">
          <label className="block text-sm font-semibold text-text-main">
            연봉 (세전)
          </label>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <input
                type="text"
                inputMode="numeric"
                value={formatNumber(annualSalaryMan)}
                onChange={(e) => handleSalaryInput(e.target.value)}
                className="w-full text-2xl md:text-3xl font-bold text-primary border-b-2 border-primary/30 focus:border-primary outline-none pb-1 bg-transparent transition-colors"
              />
            </div>
            <span className="text-lg font-medium text-text-light pb-1">만원</span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={100}
            value={annualSalaryMan}
            onChange={(e) => setAnnualSalaryMan(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-text-lighter">
            <span>0</span>
            <span>5,000만</span>
            <span>1억</span>
            <span>1.5억</span>
            <span>2억</span>
          </div>
        </div>

        {/* 비과세액 */}
        <div className="bg-white rounded-xl border border-border p-6 space-y-3">
          <label className="block text-sm font-semibold text-text-main">
            비과세액 (월)
          </label>
          <p className="text-xs text-text-lighter">식대 등 비과세 항목</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={taxExemptMonthly}
              onChange={(e) => setTaxExemptMonthly(Math.max(0, Math.min(100, Number(e.target.value))))}
              className="w-24 text-lg font-semibold border border-border rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
            />
            <span className="text-sm text-text-light">만원/월</span>
          </div>
        </div>

        {/* 부양가족 수 */}
        <div className="bg-white rounded-xl border border-border p-6 space-y-3">
          <label className="block text-sm font-semibold text-text-main">
            부양가족 수
          </label>
          <p className="text-xs text-text-lighter">본인 포함</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDependents((d) => Math.max(1, d - 1))}
              className="w-10 h-10 rounded-lg border border-border text-lg font-bold text-text-light hover:bg-bg-gray transition active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold text-text-main w-8 text-center">{dependents}</span>
            <button
              onClick={() => setDependents((d) => Math.min(20, d + 1))}
              className="w-10 h-10 rounded-lg border border-border text-lg font-bold text-text-light hover:bg-bg-gray transition active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick amount buttons */}
        <div className="bg-white rounded-xl border border-border p-6 space-y-3">
          <label className="block text-sm font-semibold text-text-main">
            빠른 선택
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[2400, 3000, 4000, 5000, 6000, 8000, 10000, 15000].map((v) => (
              <button
                key={v}
                onClick={() => setAnnualSalaryMan(v)}
                className={`text-sm py-2 px-2 rounded-lg border transition font-medium active:scale-95 ${
                  annualSalaryMan === v
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-text-light hover:border-primary hover:text-primary'
                }`}
              >
                {man(v)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: takeHome highlight + chart */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 flex flex-col items-center gap-6">
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-text-light">월 실수령액</p>
            <p className="text-3xl md:text-4xl font-extrabold text-primary transition-all duration-500">
              {formatNumber(Math.max(0, result.monthlyTakeHome))}
              <span className="text-lg font-semibold text-text-light ml-1">원</span>
            </p>
          </div>

          <DonutChart
            takeHome={Math.max(0, result.monthlyTakeHome)}
            totalDeduction={result.totalDeduction}
          />

          {/* Annual summary */}
          <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-text-lighter mb-1">연 실수령액</p>
              <p className="text-lg font-bold text-text-main">
                {formatNumber(Math.max(0, result.annualTakeHome))}
                <span className="text-xs font-normal text-text-light ml-0.5">원</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-text-lighter mb-1">연 공제 합계</p>
              <p className="text-lg font-bold text-text-main">
                {formatNumber(result.totalDeduction * 12)}
                <span className="text-xs font-normal text-text-light ml-0.5">원</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: deduction breakdown */}
        <div className="bg-white rounded-xl border border-border p-6 md:p-8 space-y-5">
          <h2 className="text-lg font-bold text-text-main">공제 내역 (월)</h2>

          {/* Horizontal stacked bar */}
          {result.totalDeduction > 0 && (
            <div className="flex h-4 rounded-full overflow-hidden">
              {result.deductions.map((d) => {
                const pct = (d.amount / result.monthlySalaryWon) * 100;
                if (pct < 0.1) return null;
                return (
                  <div
                    key={d.label}
                    className="transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: d.color }}
                    title={`${d.label}: ${pct.toFixed(1)}%`}
                  />
                );
              })}
              <div
                className="transition-all duration-500"
                style={{
                  width: `${Math.max(0, ((result.monthlySalaryWon - result.totalDeduction) / result.monthlySalaryWon) * 100)}%`,
                  backgroundColor: '#1a56db',
                }}
                title="실수령"
              />
            </div>
          )}

          {/* Deduction items */}
          <div className="space-y-3">
            {result.deductions.map((d) => (
              <div key={d.label} className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-sm text-text-main">{d.label}</span>
                </div>
                <span className="text-sm font-semibold text-text-main tabular-nums">
                  {formatNumber(d.amount)}원
                </span>
              </div>
            ))}

            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-text-main">공제 합계</span>
              <span className="text-base font-bold text-red-500 tabular-nums">
                -{formatNumber(result.totalDeduction)}원
              </span>
            </div>
          </div>

          {/* Monthly salary vs take-home */}
          <div className="bg-bg-gray rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-light">세전 월급</span>
              <span className="font-semibold tabular-nums">{formatNumber(result.monthlySalaryWon)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">공제액</span>
              <span className="font-semibold text-red-500 tabular-nums">-{formatNumber(result.totalDeduction)}원</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-sm font-bold text-text-main">실수령액</span>
              <span className="text-base font-extrabold text-primary tabular-nums">
                {formatNumber(Math.max(0, result.monthlyTakeHome))}원
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5 md:p-6 space-y-3">
        <h3 className="text-sm font-bold text-[#b45309]">계산 안내</h3>
        <ul className="text-sm text-[#92400e] space-y-1.5 list-disc pl-5">
          <li>2026년 기준 4대 보험요율 및 소득세율을 적용한 <strong>근사 계산</strong>입니다.</li>
          <li>실제 급여는 회사 지급 구조(상여, 성과급 등)에 따라 달라질 수 있습니다.</li>
          <li>국민연금 기준소득월액 상한: 590만원 (월 최대 265,500원)</li>
          <li>비과세 식대는 월 20만원 한도이나 회사별로 상이할 수 있습니다.</li>
          <li>세금 정산은 연말정산 시 최종 확정됩니다.</li>
        </ul>
      </div>
    </div>
  );
}
