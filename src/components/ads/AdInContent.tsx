import AdUnit from './AdUnit';

export default function AdInContent() {
  return (
    <div className="my-8">
      <AdUnit slot="in-content" format="auto" style={{ minHeight: '250px' }} />
    </div>
  );
}
