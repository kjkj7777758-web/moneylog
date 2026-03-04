'use client';

import { useEffect, useRef } from 'react';

export default function CoupangBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !containerRef.current) return;
    loaded.current = true;

    const script = document.createElement('script');
    script.src = 'https://ads-partners.coupang.com/g.js';
    script.async = true;
    script.onload = () => {
      const initScript = document.createElement('script');
      initScript.textContent = `new PartnersCoupang.G({"id":969366,"trackingCode":"AF9515426","subId":null,"template":"carousel","width":"680","height":"140"});`;
      containerRef.current?.appendChild(initScript);
    };
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="max-w-[700px] mx-auto my-6 overflow-hidden rounded-lg">
      <div ref={containerRef} />
    </div>
  );
}
