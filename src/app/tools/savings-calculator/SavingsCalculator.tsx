'use client';

import { useState, useMemo, useCallback } from 'react';

type SavingsType = 'installment' | 'lumpsum';
type TaxType = 'normal' | 'taxfree' | 'reduced';
type Period = 6 | 12 | 24 | 36;

const TAX_RATES: Record<TaxType, number> = {
  normal: 0.154,
  taxfree: 0,
  reduced: 0.095,
};

const TAX_LABELS: Record<TaxType, string> = {
  normal: '일반과세 (15.4%)',
  taxfree: '비과세',
  reduced: '세금우대 (9.5%)',
};

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 6, label: '6개월' },
  { value: 12, label: '12개월' },
  { value: 24, label: '24개월' },
  { value: 36, label: '36개월' },
];

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString('ko-KR');
}

function formatWon(num: number): string {
  const rounded = Math.round(num);
  if (rounded >= 10000) {
    const eok = Math.floor(rounded / 10000);
    const man = rounded % 10000;
    if (man === 0) return `${eok.toLocaleString('ko-KR')}억원`;
    return `${eok.toLocaleString('ko-KR')}억 ${man.toLocaleString('ko-KR')}만원`;
  }
  return `${rounded.toLocaleString('ko-KR')}만원`;
}

export default function SavingsCalculator() {
  const [savingsType, setSavingsType] = useState<SavingsType>('installment');
  const [amount, setAmount] = useState<string>('50');
  const [rate, setRate] = useState<string>('3.5');
  const [period, setPeriod] = useState<Period>(12);
  const [taxType, setTaxType] = useState<TaxType>('normal');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  }, []);

  const handleRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setRate(val);
    }
  }, []);

  const results = useMemo(() => {
    const amountNum = parseFloat(amount) || 0;
    const rateNum = parseFloat(rate) || 0;

    if (amountNum <= 0 || rateNum <= 0) {
      return null;
    }

    let totalDeposit: number;
    let preTaxInterest: number;

    if (savingsType === 'installment') {
      // Installment savings (monthly deposits)
      totalDeposit = amountNum * period;
      // Standard Korean installment savings formula:
      // preTaxInterest = monthlyAmount * (rate/100) * months * (months + 1) / (2 * 12)
      preTaxInterest = amountNum * (rateNum / 100) * period * (period + 1) / (2 * 12);
    } else {
      // Lump sum deposit
      totalDeposit = amountNum;
      // Interest = principal * rate(%) * months / 12
      preTaxInterest = amountNum * (rateNum / 100) * period / 12;
    }

    const taxAmount = preTaxInterest * TAX_RATES[taxType];
    const postTaxInterest = preTaxInterest - taxAmount;
    const totalReceived = totalDeposit + postTaxInterest;

    // Monthly breakdown for installment
    const monthlyBreakdown: { month: number; deposit: number; cumDeposit: number; cumInterest: number }[] = [];
    if (savingsType === 'installment') {
      for (let m = 1; m <= period; m++) {
        const cumDeposit = amountNum * m;
        // Cumulative interest by month m
        const cumInterestPreTax = amountNum * (rateNum / 100) * m * (m + 1) / (2 * 12);
        const cumInterestPostTax = cumInterestPreTax * (1 - TAX_RATES[taxType]);
        monthlyBreakdown.push({
          month: m,
          deposit: amountNum,
          cumDeposit,
          cumInterest: cumInterestPostTax,
        });
      }
    } else {
      for (let m = 1; m <= period; m++) {
        const cumInterestPreTax = amountNum * (rateNum / 100) * m / 12;
        const cumInterestPostTax = cumInterestPreTax * (1 - TAX_RATES[taxType]);
        monthlyBreakdown.push({
          month: m,
          deposit: m === 1 ? amountNum : 0,
          cumDeposit: amountNum,
          cumInterest: cumInterestPostTax,
        });
      }
    }

    return {
      totalDeposit,
      preTaxInterest,
      taxAmount,
      postTaxInterest,
      totalReceived,
      monthlyBreakdown,
    };
  }, [amount, rate, period, savingsType, taxType]);

  const depositPercent = results
    ? (results.totalDeposit / results.totalReceived) * 100
    : 100;
  const interestPercent = results
    ? (results.postTaxInterest / results.totalReceived) * 100
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a56db] to-[#1346b0] rounded-2xl p-8 md:p-10 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-amber-200">2026년 최신 기준</span>
          </div>
          <h1 className="text-[1.8rem] md:text-[2.2rem] font-extrabold mb-3 leading-tight">
            적금 / 예금 이자 계산기
          </h1>
          <p className="text-blue-100 text-[0.95rem] md:text-base max-w-lg leading-relaxed">
            정기적금, 정기예금의 만기 수령액을 정확하게 계산해보세요.
            일반과세, 비과세, 세금우대까지 한번에 비교할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-5">
          {/* Savings Type Toggle */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <label className="block text-sm font-semibold text-[#6b7280] mb-3">
              적금 종류
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#f9fafb] rounded-lg p-1">
              <button
                type="button"
                onClick={() => setSavingsType('installment')}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  savingsType === 'installment'
                    ? 'bg-[#1a56db] text-white shadow-md'
                    : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-white'
                }`}
              >
                정기적금
                <span className="block text-xs mt-0.5 font-normal opacity-80">
                  매월 납입
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSavingsType('lumpsum')}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                  savingsType === 'lumpsum'
                    ? 'bg-[#1a56db] text-white shadow-md'
                    : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-white'
                }`}
              >
                정기예금
                <span className="block text-xs mt-0.5 font-normal opacity-80">
                  거치식
                </span>
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-[#6b7280] mb-3"
            >
              {savingsType === 'installment' ? '월 납입액' : '예치 금액'}
            </label>
            <div className="relative">
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                className="w-full py-3.5 px-4 pr-16 border border-[#e5e7eb] rounded-lg text-lg font-semibold text-[#1f2937] outline-none focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/10 transition-all bg-[#f9fafb]"
                placeholder="금액 입력"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] font-medium">
                만원
              </span>
            </div>
            {amount && parseFloat(amount) > 0 && (
              <p className="text-xs text-[#6b7280] mt-2">
                = {formatNumber(parseFloat(amount) * 10000)}원
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <label
              htmlFor="rate"
              className="block text-sm font-semibold text-[#6b7280] mb-3"
            >
              연 이자율 (금리)
            </label>
            <div className="relative">
              <input
                id="rate"
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={handleRateChange}
                className="w-full py-3.5 px-4 pr-12 border border-[#e5e7eb] rounded-lg text-lg font-semibold text-[#1f2937] outline-none focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/10 transition-all bg-[#f9fafb]"
                placeholder="이자율 입력"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] font-medium">
                %
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              {[2.0, 3.0, 3.5, 4.0, 5.0].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r.toString())}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    rate === r.toString()
                      ? 'bg-[#1a56db] text-white'
                      : 'bg-[#f9fafb] text-[#6b7280] border border-[#e5e7eb] hover:border-[#1a56db] hover:text-[#1a56db]'
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <label
              htmlFor="period"
              className="block text-sm font-semibold text-[#6b7280] mb-3"
            >
              가입 기간
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PERIOD_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPeriod(opt.value)}
                  className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                    period === opt.value
                      ? 'bg-[#1a56db] text-white shadow-md'
                      : 'bg-[#f9fafb] text-[#6b7280] border border-[#e5e7eb] hover:border-[#1a56db] hover:text-[#1a56db]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tax Type */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
            <label className="block text-sm font-semibold text-[#6b7280] mb-3">
              이자 과세 방식
            </label>
            <div className="space-y-2">
              {(Object.keys(TAX_LABELS) as TaxType[]).map((key) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    taxType === key
                      ? 'bg-[#e8effc] border border-[#1a56db]/30'
                      : 'bg-[#f9fafb] border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="taxType"
                    value={key}
                    checked={taxType === key}
                    onChange={() => setTaxType(key)}
                    className="w-4 h-4 accent-[#1a56db]"
                  />
                  <span
                    className={`text-sm font-medium ${
                      taxType === key ? 'text-[#1a56db]' : 'text-[#1f2937]'
                    }`}
                  >
                    {TAX_LABELS[key]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-5">
          {/* Total Result Card */}
          <div className="bg-gradient-to-br from-[#1a56db] to-[#1346b0] rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <p className="text-blue-200 text-sm font-medium mb-1">만기 수령액</p>
            <p className="text-[2.4rem] md:text-[2.8rem] font-extrabold leading-tight mb-1 relative">
              {results ? formatWon(results.totalReceived) : '0만원'}
            </p>
            {results && (
              <p className="text-blue-200 text-sm">
                = {formatNumber(results.totalReceived * 10000)}원
              </p>
            )}
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-4">
              <p className="text-xs text-[#6b7280] mb-1">원금 합계</p>
              <p className="text-lg font-bold text-[#1f2937]">
                {results ? formatWon(results.totalDeposit) : '-'}
              </p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-4">
              <p className="text-xs text-[#6b7280] mb-1">세전 이자</p>
              <p className="text-lg font-bold text-[#1a56db]">
                {results ? formatWon(results.preTaxInterest) : '-'}
              </p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-4">
              <p className="text-xs text-[#6b7280] mb-1">이자 세금</p>
              <p className="text-lg font-bold text-red-500">
                {results ? `- ${formatWon(results.taxAmount)}` : '-'}
              </p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-4 border-[#f59e0b]/40 bg-[#fffbeb]">
              <p className="text-xs text-[#6b7280] mb-1">세후 이자</p>
              <p className="text-lg font-bold text-[#b45309]">
                {results ? formatWon(results.postTaxInterest) : '-'}
              </p>
            </div>
          </div>

          {/* Visual Bar Chart */}
          {results && results.totalReceived > 0 && (
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#1f2937] mb-4">원금 vs 이자 비율</h3>
              <div className="space-y-4">
                {/* Combined bar */}
                <div>
                  <div className="flex rounded-lg overflow-hidden h-10">
                    <div
                      className="bg-[#1a56db] flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${Math.max(depositPercent, 5)}%` }}
                    >
                      {depositPercent > 15 && `${depositPercent.toFixed(1)}%`}
                    </div>
                    <div
                      className="bg-[#f59e0b] flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${Math.max(interestPercent, 2)}%` }}
                    >
                      {interestPercent > 8 && `${interestPercent.toFixed(1)}%`}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#1a56db]" />
                    <span className="text-[#6b7280]">원금</span>
                    <span className="font-semibold text-[#1f2937]">
                      {formatWon(results.totalDeposit)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-[#f59e0b]" />
                    <span className="text-[#6b7280]">세후 이자</span>
                    <span className="font-semibold text-[#1f2937]">
                      {formatWon(results.postTaxInterest)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Summary */}
          {results && (
            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#1f2937] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM17.657 16.657l-.707-.707a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414zM6.464 14.95a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zM10 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
                  <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                </svg>
                요약
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {savingsType === 'installment' ? (
                  <>
                    매월 <strong className="text-[#1f2937]">{amount}만원</strong>을{' '}
                    <strong className="text-[#1f2937]">{period}개월</strong>간 납입하면,
                    연 <strong className="text-[#1a56db]">{rate}%</strong> 금리 기준
                  </>
                ) : (
                  <>
                    <strong className="text-[#1f2937]">{amount}만원</strong>을{' '}
                    <strong className="text-[#1f2937]">{period}개월</strong>간 예치하면,
                    연 <strong className="text-[#1a56db]">{rate}%</strong> 금리 기준
                  </>
                )}{' '}
                {TAX_LABELS[taxType]} 적용 시 세후 이자{' '}
                <strong className="text-[#b45309]">{formatWon(results.postTaxInterest)}</strong>을
                받아 총{' '}
                <strong className="text-[#1a56db]">{formatWon(results.totalReceived)}</strong>을
                수령합니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Breakdown Table (Collapsible) */}
      {results && (
        <div className="mt-6 bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between p-5 hover:bg-[#f9fafb] transition-colors"
          >
            <span className="text-sm font-semibold text-[#1f2937]">
              월별 상세 내역
            </span>
            <svg
              className={`w-5 h-5 text-[#6b7280] transition-transform ${
                showBreakdown ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showBreakdown && (
            <div className="border-t border-[#e5e7eb] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="py-3 px-4 text-left font-semibold text-[#6b7280]">
                      회차
                    </th>
                    <th className="py-3 px-4 text-right font-semibold text-[#6b7280]">
                      {savingsType === 'installment' ? '월 납입액' : '예치금'}
                    </th>
                    <th className="py-3 px-4 text-right font-semibold text-[#6b7280]">
                      누적 원금
                    </th>
                    <th className="py-3 px-4 text-right font-semibold text-[#6b7280]">
                      누적 이자 (세후)
                    </th>
                    <th className="py-3 px-4 text-right font-semibold text-[#6b7280]">
                      합계
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.monthlyBreakdown.map((row) => (
                    <tr
                      key={row.month}
                      className="border-t border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors"
                    >
                      <td className="py-3 px-4 text-[#1f2937] font-medium">
                        {row.month}개월
                      </td>
                      <td className="py-3 px-4 text-right text-[#1f2937]">
                        {row.deposit > 0 ? `${formatNumber(row.deposit)}만원` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-[#1f2937]">
                        {formatNumber(row.cumDeposit)}만원
                      </td>
                      <td className="py-3 px-4 text-right text-[#1a56db] font-medium">
                        {formatNumber(row.cumInterest)}만원
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-[#1f2937]">
                        {formatNumber(row.cumDeposit + row.cumInterest)}만원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5">
        <h4 className="text-[#b45309] font-bold text-sm mb-2">유의사항</h4>
        <ul className="text-xs text-[#92400e] space-y-1 leading-relaxed">
          <li>
            * 본 계산기는 단리 기준으로 계산되며, 실제 금융기관의 이자 계산 방식과 차이가 있을 수 있습니다.
          </li>
          <li>
            * 세금우대는 조합 등 예탁금에 한해 1인당 3,000만원 한도로 적용됩니다.
          </li>
          <li>
            * 비과세 종합저축은 만 65세 이상, 장애인 등 대상자에 한해 1인당 5,000만원 한도로 적용됩니다.
          </li>
          <li>
            * 정확한 만기 수령액은 가입하시는 금융기관에 문의하세요.
          </li>
        </ul>
      </div>
    </div>
  );
}
