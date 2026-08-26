'use client';

import { useState } from 'react';

export function ConsentBanner() {
  const [visible, setVisible] = useState(true);
  const [manage, setManage] = useState(false);
  if (!visible) return null;
  return (
    <aside className="consent-banner" aria-label="Cookie preferences">
      <div>
        <strong>We use cookies and ads</strong>
        <p>We and our partners use cookies to personalize content and ads. Choose "Consent" to allow personalized ads, or "Manage options" to set preferences.</p>
      </div>
      <div className="consent-actions">
        <button className="button button-quiet" onClick={() => setManage(!manage)}>Manage options</button>
        <button className="button button-small" onClick={() => setVisible(false)}>Consent</button>
      </div>
      {manage && <div className="consent-manage"><label><input type="checkbox" defaultChecked /> Allow personalized ads</label><button className="button button-small" onClick={() => setVisible(false)}>Save</button></div>}
    </aside>
  );
}
