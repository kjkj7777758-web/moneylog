export default function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-lg p-5 my-6">
      <h4 className="text-[#0369a1] font-bold mb-2">{title}</h4>
      <div className="text-[0.95rem] leading-relaxed">{children}</div>
    </div>
  );
}
