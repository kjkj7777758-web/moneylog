export default function WarningBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-5 my-6">
      <h4 className="text-[#b45309] font-bold mb-2">{title}</h4>
      <div className="text-[0.95rem] leading-relaxed">{children}</div>
    </div>
  );
}
