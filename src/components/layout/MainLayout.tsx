import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto px-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 py-10">
        <main>{children}</main>
        <Sidebar />
      </div>
    </div>
  );
}
