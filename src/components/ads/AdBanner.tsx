import AdUnit from './AdUnit';

export default function AdBanner() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-4">
      <AdUnit slot="banner" format="horizontal" style={{ minHeight: '90px' }} />
    </div>
  );
}
