import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    autoApproval: false,
    maintenanceAlerts: true,
    invoicePrefix: 'NTA',
  });

  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card" style={{ maxWidth: 640 }}>
          <h3 style={{ marginBottom: 14 }}>Operations Preferences</h3>
          <div style={{ display: 'grid', gap: 14 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Enable auto-approval for standard creatives</span>
              <input
                type="checkbox"
                checked={settings.autoApproval}
                onChange={(e) => setSettings((prev) => ({ ...prev, autoApproval: e.target.checked }))}
              />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Maintenance alerts for buses</span>
              <input
                type="checkbox"
                checked={settings.maintenanceAlerts}
                onChange={(e) => setSettings((prev) => ({ ...prev, maintenanceAlerts: e.target.checked }))}
              />
            </label>
            <label>
              <div style={{ marginBottom: 8 }}>Invoice Prefix</div>
              <input
                value={settings.invoicePrefix}
                onChange={(e) => setSettings((prev) => ({ ...prev, invoicePrefix: e.target.value }))}
              />
            </label>
            <button className="btn btn-primary" style={{ width: 'fit-content' }}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
