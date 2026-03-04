'use client';

import { useState, useMemo, useEffect, useRef } from 'react';

type CompoundingFrequency = 12 | 4 | 2 | 1;

interface FrequencyOption {
  label: string;
  value: CompoundingFrequency;
}

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  { label: '월복리', value: 12 },
  { label: '분기복리', value: 4 },
  { label: '반기복리', value: 2 },
  { label: '연복리', value: 1 },
];

interface YearlyData {
  year: number;
  totalPrincipal: number;
  totalValue: number;
  profit: number;
  simpleValue: number;
}

function formatKoreanMoney(manwon: number): string {
  if (manwon >= 10000) {
    const eok = Math.floor(manwon / 10000);
    const remainder = manwon % 10000;
    if (remainder === 0) return `${eok.toLocaleString()}억원`;
    return `${eok.toLocaleString()}억 ${Math.round(remainder).toLocaleString()}만원`;
  }
  return `${Math.round(manwon).toLocaleString()}만원`;
}

function AnimatedNumber({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
      setDisplayed(value);
    }
  }, [value]);

  return (
    <span className="transition-all duration-500 ease-out">
      {displayed}
      {suffix}
    </span>
  );
}

export default function CompoundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyAddition, setMonthlyAddition] = useState(10);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);
  const [frequency, setFrequency] = useState<CompoundingFrequency>(12);

  const results = useMemo(() => {
    const P = initialInvestment; // in 만원
    const PMT = monthlyAddition; // in 만원
    const r = annualRate / 100;
    const n = frequency;
    const t = years;

    // Year-by-year calculation
    const yearlyData: YearlyData[] = [];

    for (let y = 1; y <= t; y++) {
      // FV of initial investment: P * (1 + r/n)^(n*y)
      const fvInitial = P * Math.pow(1 + r / n, n * y);

      // FV of monthly additions (annuity)
      // Convert monthly PMT to per-period contribution
      // Monthly contributions accumulated per compounding period
      let fvAdditions = 0;
      if (r > 0) {
        // PMT per compounding period = monthly * (12/n)
        const pmtPerPeriod = PMT * (12 / n);
        const totalPeriods = n * y;
        const ratePerPeriod = r / n;
        fvAdditions =
          pmtPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
      } else {
        fvAdditions = PMT * 12 * y;
      }

      const totalValue = fvInitial + fvAdditions;
      const totalPrincipal = P + PMT * 12 * y;
      const profit = totalValue - totalPrincipal;

      // Simple interest for comparison
      const simpleValue = totalPrincipal + P * r * y + PMT * 12 * ((y * (y - 1)) / 2) * (r / 12);

      yearlyData.push({
        year: y,
        totalPrincipal,
        totalValue,
        profit,
        simpleValue,
      });
    }

    const finalData = yearlyData[yearlyData.length - 1];
    const totalPrincipal = finalData?.totalPrincipal ?? 0;
    const totalValue = finalData?.totalValue ?? 0;
    const totalProfit = finalData?.profit ?? 0;
    const simpleTotal = finalData?.simpleValue ?? 0;

    // Milestones
    const doubleMilestone = yearlyData.find((d) => d.totalValue >= d.totalPrincipal * 2 && d.totalPrincipal > 0);
    // Find when total reaches 1억 (10000 만원)
    const milestone1eok = yearlyData.find((d) => d.totalValue >= 10000);
    const milestone5eok = yearlyData.find((d) => d.totalValue >= 50000);
    const milestone10eok = yearlyData.find((d) => d.totalValue >= 100000);

    // Rule of 72
    const rule72years = r > 0 ? 72 / (r * 100) : Infinity;

    return {
      yearlyData,
      totalPrincipal,
      totalValue,
      totalProfit,
      simpleTotal,
      compoundVsSimple: totalValue - simpleTotal,
      doubleMilestone,
      milestone1eok,
      milestone5eok,
      milestone10eok,
      rule72years,
      profitRate: totalPrincipal > 0 ? (totalProfit / totalPrincipal) * 100 : 0,
    };
  }, [initialInvestment, monthlyAddition, annualRate, years, frequency]);

  const maxChartValue = Math.max(...results.yearlyData.map((d) => d.totalValue));

  return (
    <div>
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a56db] via-[#1e40af] to-[#1e3a8a] p-8 md:p-12 mb-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f59e0b]/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-amber-200 text-sm font-medium">투자 계산기</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            복리 계산기
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl leading-relaxed">
            복리의 마법을 직접 확인하세요. 초기 투자금과 월 적립금으로
            미래 자산을 예측합니다.
          </p>
        </div>
      </div>

      {/* Blog Post Link */}
      <div className="mb-8">
        <a
          href="/posts/compound-interest"
          className="inline-flex items-center gap-2 text-[#1a56db] hover:text-[#1e40af] font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg border border-blue-100"
        >
          <span className="text-lg">&#128214;</span>
          <span>복리의 마법: 작은 저축이 큰 자산이 되는 원리 &rarr;</span>
        </a>
      </div>

      {/* Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mb-8">
        {/* Input Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1f2937] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1a56db] text-sm font-bold">
              &#9881;
            </span>
            투자 조건 설정
          </h2>

          {/* Initial Investment */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#1f2937] mb-2">
              초기 투자금
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100000}
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 pr-16 border border-[#e5e7eb] rounded-xl text-lg font-semibold text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#1a56db]/30 focus:border-[#1a56db] transition-all bg-[#f9fafb]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                만원
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              = {(initialInvestment * 10000).toLocaleString()}원
            </p>
          </div>

          {/* Monthly Addition */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#1f2937] mb-2">
              월 추가 투자금
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={10000}
                value={monthlyAddition}
                onChange={(e) => setMonthlyAddition(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 pr-16 border border-[#e5e7eb] rounded-xl text-lg font-semibold text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#1a56db]/30 focus:border-[#1a56db] transition-all bg-[#f9fafb]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                만원
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              = 매월 {(monthlyAddition * 10000).toLocaleString()}원
            </p>
          </div>

          {/* Annual Rate */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#1f2937] mb-2">
              연 수익률
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={50}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Math.max(0, Math.min(50, Number(e.target.value))))}
                className="w-full px-4 py-3 pr-12 border border-[#e5e7eb] rounded-xl text-lg font-semibold text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#1a56db]/30 focus:border-[#1a56db] transition-all bg-[#f9fafb]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                %
              </span>
            </div>
          </div>

          {/* Investment Period - Slider */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#1f2937] mb-2">
              투자 기간: <span className="text-[#1a56db]">{years}년</span>
            </label>
            <input
              type="range"
              min={1}
              max={40}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a56db]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1년</span>
              <span>10년</span>
              <span>20년</span>
              <span>30년</span>
              <span>40년</span>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-[#1f2937] mb-3">
              복리 주기
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFrequency(opt.value)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border ${
                    frequency === opt.value
                      ? 'bg-[#1a56db] text-white border-[#1a56db] shadow-md shadow-blue-200'
                      : 'bg-[#f9fafb] text-[#1f2937] border-[#e5e7eb] hover:border-[#1a56db] hover:text-[#1a56db]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1f2937] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#f59e0b] text-sm font-bold">
              &#128200;
            </span>
            계산 결과
          </h2>

          {/* Big Final Amount */}
          <div className="bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] rounded-2xl p-6 mb-5 text-white">
            <p className="text-blue-200 text-sm mb-1">{years}년 후 최종 금액</p>
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <AnimatedNumber value={formatKoreanMoney(results.totalValue)} />
            </p>
            <p className="text-blue-200 text-sm mt-2">
              수익률 {results.profitRate.toFixed(1)}%
            </p>
          </div>

          {/* Principal vs Profit */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs text-blue-600 mb-1 font-medium">총 투자원금</p>
              <p className="text-lg font-bold text-[#1a56db]">
                {formatKoreanMoney(results.totalPrincipal)}
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-xs text-amber-600 mb-1 font-medium">복리 수익</p>
              <p className="text-lg font-bold text-[#b45309]">
                {formatKoreanMoney(results.totalProfit)}
              </p>
            </div>
          </div>

          {/* Principal vs Profit Bar */}
          <div className="mb-5">
            <div className="flex rounded-full overflow-hidden h-4">
              <div
                className="bg-[#1a56db] transition-all duration-500"
                style={{
                  width: `${
                    results.totalValue > 0
                      ? (results.totalPrincipal / results.totalValue) * 100
                      : 50
                  }%`,
                }}
              />
              <div
                className="bg-[#f59e0b] transition-all duration-500"
                style={{
                  width: `${
                    results.totalValue > 0
                      ? (results.totalProfit / results.totalValue) * 100
                      : 50
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1.5">
              <span className="flex items-center gap-1 text-[#1a56db] font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1a56db] inline-block" />
                원금 {results.totalValue > 0 ? ((results.totalPrincipal / results.totalValue) * 100).toFixed(1) : 0}%
              </span>
              <span className="flex items-center gap-1 text-[#b45309] font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b] inline-block" />
                수익 {results.totalValue > 0 ? ((results.totalProfit / results.totalValue) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>

          {/* Compound vs Simple Difference */}
          <div className="bg-[#f9fafb] rounded-xl p-4 border border-[#e5e7eb]">
            <p className="text-xs text-gray-500 mb-1 font-medium">복리 vs 단리 차이</p>
            <p className="text-lg font-bold text-green-600">
              +{formatKoreanMoney(results.compoundVsSimple)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              복리를 선택해서 추가로 벌 수 있는 금액
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-[#1f2937] mb-5 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-sm font-bold">
            &#127942;
          </span>
          주요 마일스톤
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Rule of 72 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-100">
            <p className="text-xs text-purple-600 font-semibold mb-1">72법칙 (원금 2배)</p>
            <p className="text-xl font-bold text-purple-700">
              {results.rule72years === Infinity
                ? '-'
                : `약 ${results.rule72years.toFixed(1)}년`}
            </p>
            <p className="text-xs text-purple-400 mt-1">추가 투자 미포함</p>
          </div>

          {/* Double */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">원금 2배 달성</p>
            <p className="text-xl font-bold text-[#1a56db]">
              {results.doubleMilestone ? `${results.doubleMilestone.year}년차` : `${years}년 내 미달성`}
            </p>
          </div>

          {/* 1억 */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-100">
            <p className="text-xs text-amber-600 font-semibold mb-1">1억 달성</p>
            <p className="text-xl font-bold text-[#b45309]">
              {results.milestone1eok ? `${results.milestone1eok.year}년차` : `${years}년 내 미달성`}
            </p>
          </div>

          {/* 5억 or 10억 */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-green-600 font-semibold mb-1">
              {results.milestone5eok ? '5억 달성' : '10억 달성'}
            </p>
            <p className="text-xl font-bold text-green-700">
              {results.milestone5eok
                ? `${results.milestone5eok.year}년차`
                : results.milestone10eok
                  ? `${results.milestone10eok.year}년차`
                  : `${years}년 내 미달성`}
            </p>
          </div>
        </div>
      </div>

      {/* Year-by-Year Growth Chart */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-[#1f2937] mb-2 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1a56db] text-sm font-bold">
            &#128202;
          </span>
          연도별 자산 성장 추이
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          파란색은 투자 원금, 금색은 복리 수익을 나타냅니다.
        </p>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#1a56db] inline-block" />
            <span className="text-gray-600">원금</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block" />
            <span className="text-gray-600">수익</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-300 inline-block border border-dashed border-gray-400" />
            <span className="text-gray-600">단리</span>
          </span>
        </div>

        {/* Chart Container */}
        <div className="overflow-x-auto pb-2">
          <div
            className="flex items-end gap-1.5"
            style={{
              minWidth: results.yearlyData.length > 15 ? `${results.yearlyData.length * 48}px` : 'auto',
              height: '320px',
            }}
          >
            {results.yearlyData.map((data) => {
              const totalHeight = maxChartValue > 0 ? (data.totalValue / maxChartValue) * 280 : 0;
              const principalHeight =
                maxChartValue > 0 ? (data.totalPrincipal / maxChartValue) * 280 : 0;
              const profitHeight = totalHeight - principalHeight;
              const simpleHeight =
                maxChartValue > 0 ? (data.simpleValue / maxChartValue) * 280 : 0;

              return (
                <div
                  key={data.year}
                  className="flex-1 min-w-[36px] flex flex-col items-center group relative"
                  style={{ height: '320px', justifyContent: 'flex-end' }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1f2937] text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                    <p className="font-bold mb-1">{data.year}년차</p>
                    <p>총액: {formatKoreanMoney(data.totalValue)}</p>
                    <p>원금: {formatKoreanMoney(data.totalPrincipal)}</p>
                    <p>수익: {formatKoreanMoney(data.profit)}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1f2937]" />
                  </div>

                  {/* Simple interest line marker */}
                  <div
                    className="absolute w-full flex justify-center"
                    style={{ bottom: `${simpleHeight + 24}px` }}
                  >
                    <div className="w-3 h-0.5 bg-gray-400 rounded" />
                  </div>

                  {/* Stacked Bar */}
                  <div className="w-full flex flex-col items-center">
                    {/* Profit bar (top) */}
                    <div
                      className="w-full rounded-t-md bg-[#f59e0b] transition-all duration-500 hover:bg-[#d97706]"
                      style={{
                        height: `${Math.max(profitHeight, 0)}px`,
                        maxWidth: '32px',
                        margin: '0 auto',
                      }}
                    />
                    {/* Principal bar (bottom) */}
                    <div
                      className="w-full bg-[#1a56db] transition-all duration-500 hover:bg-[#1e40af]"
                      style={{
                        height: `${principalHeight}px`,
                        maxWidth: '32px',
                        margin: '0 auto',
                        borderRadius:
                          profitHeight > 0 ? '0 0 0.375rem 0.375rem' : '0.375rem',
                      }}
                    />
                  </div>

                  {/* Year label */}
                  <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{data.year}년</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile scroll hint */}
        {results.yearlyData.length > 15 && (
          <p className="text-xs text-gray-400 text-center mt-2 lg:hidden">
            &#8592; 좌우로 스크롤하여 전체 차트를 확인하세요 &#8594;
          </p>
        )}
      </div>

      {/* Comparison Table: 단리 vs 복리 */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-[#1f2937] mb-5 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-sm font-bold">
            &#8596;
          </span>
          단리 vs 복리 비교표
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#e5e7eb]">
                <th className="text-left py-3 px-3 text-gray-500 font-semibold">년차</th>
                <th className="text-right py-3 px-3 text-gray-500 font-semibold">투자원금</th>
                <th className="text-right py-3 px-3 text-gray-500 font-semibold">단리 총액</th>
                <th className="text-right py-3 px-3 text-[#1a56db] font-semibold">복리 총액</th>
                <th className="text-right py-3 px-3 text-green-600 font-semibold">차이</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyData
                .filter((d) => {
                  // Show selective years for readability
                  if (years <= 10) return true;
                  if (years <= 20)
                    return d.year % 2 === 0 || d.year === 1 || d.year === years;
                  return (
                    d.year === 1 ||
                    d.year === 5 ||
                    d.year % 5 === 0 ||
                    d.year === years
                  );
                })
                .map((data) => (
                  <tr
                    key={data.year}
                    className="border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors"
                  >
                    <td className="py-2.5 px-3 font-semibold text-[#1f2937]">{data.year}년</td>
                    <td className="py-2.5 px-3 text-right text-gray-600">
                      {formatKoreanMoney(data.totalPrincipal)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-600">
                      {formatKoreanMoney(data.simpleValue)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[#1a56db] font-bold">
                      {formatKoreanMoney(data.totalValue)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-green-600 font-semibold">
                      +{formatKoreanMoney(data.totalValue - data.simpleValue)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-6 mb-8">
        <h3 className="text-[#b45309] font-bold mb-3 flex items-center gap-2">
          <span>&#128161;</span> 복리 계산 참고사항
        </h3>
        <ul className="text-sm text-[#92400e] space-y-2">
          <li>
            <strong>72법칙:</strong> 72를 연 수익률로 나누면 원금이 2배가 되는 대략적인 기간을 알 수 있습니다.
          </li>
          <li>
            <strong>복리 주기:</strong> 같은 연 수익률이라도 복리 주기가 짧을수록 (월복리 &gt; 분기복리 &gt; 연복리) 최종 금액이 더 커집니다.
          </li>
          <li>
            <strong>세금 미포함:</strong> 이 계산기는 세전 수익을 기준으로 계산합니다. 실제 수익에는 이자소득세(15.4%)가 적용될 수 있습니다.
          </li>
          <li>
            <strong>면책:</strong> 이 계산기는 참고용이며, 실제 투자 수익은 시장 상황에 따라 달라질 수 있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
