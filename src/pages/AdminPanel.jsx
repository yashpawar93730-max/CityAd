import { useState } from 'react';
import { Shield, Bus, Check, X, Eye, Users, DollarSign, BarChart3 } from 'lucide-react';
import { BUSES, CREATIVES, CAMPAIGNS, TRANSACTIONS, ROUTES } from '../data/mockData';

export default function AdminPanel() {
  const [creatives, setCreatives] = useState(CREATIVES);
  const [tab, setTab] = useState('approvals');

  const totalBuses = BUSES.length;
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === 'active').length;
  const totalRevenue = TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
  const pendingApprovals = creatives.filter(c => c.status === 'pending').length;

  const approveCreative = (id) => setCreatives(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  const rejectCreative = (id) => setCreatives(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected', rejectReason: 'Does not meet brand guidelines' } : c));

  return (
    <>
      <div className="page-header">
        <h1><Shield size={20} /> Admin Panel</h1>
      </div>
      <div className="page-body fade-in">
        {/* KPI */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label"><Bus size={14} /> Total Buses</div>
            <div className="kpi-value">{totalBuses}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><BarChart3 size={14} /> Active Campaigns</div>
            <div className="kpi-value" style={{ color: 'var(--transit-green)' }}>{activeCampaigns}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><DollarSign size={14} /> Total Revenue</div>
            <div className="kpi-value">₹{(totalRevenue / 100000).toFixed(1)}L</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Eye size={14} /> Pending Approvals</div>
            <div className="kpi-value" style={{ color: 'var(--warning)' }}>{pendingApprovals}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {['approvals', 'inventory', 'routes', 'campaigns', 'transactions'].map(t => (
            <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)} style={{ textTransform: 'capitalize' }}>{t === 'approvals' ? 'Creative Approvals' : t}</button>
          ))}
        </div>

        {/* Creative Approvals */}
        {tab === 'approvals' && (
          <div className="card">
            <table className="data-table">
              <thead>
                <tr><th>Creative</th><th>Advertiser</th><th>Campaign</th><th>Format</th><th>Submitted On</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {creatives.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, background: 'var(--surface-2)', borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{c.format}</div>
                        <div><div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{c.fileName}</div></div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{c.advertiser}</td>
                    <td style={{ fontSize: '0.85rem' }}>{c.campaign}</td>
                    <td><span className="mono" style={{ fontSize: '0.82rem' }}>{c.format}</span></td>
                    <td style={{ fontSize: '0.85rem' }}>{c.submittedOn}</td>
                    <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                    <td>
                      {c.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-primary btn-sm" onClick={() => approveCreative(c.id)}><Check size={14} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => rejectCreative(c.id)}><X size={14} /></button>
                        </div>
                      ) : c.status === 'rejected' ? (
                        <span style={{ fontSize: '0.78rem', color: 'var(--danger)' }}>{c.rejectReason}</span>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Inventory */}
        {tab === 'inventory' && (
          <div className="card">
            <table className="data-table">
              <thead>
                <tr><th>Bus ID</th><th>Route</th><th>Type</th><th>Daily Reach</th><th>Status</th><th>Last Service</th></tr>
              </thead>
              <tbody>
                {BUSES.slice(0, 20).map(b => (
                  <tr key={b.id}>
                    <td className="mono" style={{ fontWeight: 600 }}>{b.id}</td>
                    <td>{b.route}</td>
                    <td><span style={{ textTransform: 'capitalize' }}>{b.type}</span></td>
                    <td className="mono">{b.dailyReach.toLocaleString('en-IN')}</td>
                    <td><span className={`badge ${b.status === 'available' ? 'badge-available' : 'badge-booked'}`}>{b.status}</span></td>
                    <td style={{ fontSize: '0.85rem' }}>{b.lastService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Routes */}
        {tab === 'routes' && (
          <div className="card">
            <table className="data-table">
              <thead>
                <tr><th>Route ID</th><th>Name</th><th>Distance</th><th>Traffic</th><th>Daily Riders</th><th>Type</th></tr>
              </thead>
              <tbody>
                {ROUTES.map(r => (
                  <tr key={r.id}>
                    <td className="mono" style={{ fontWeight: 600 }}>{r.id}</td>
                    <td>{r.name}</td>
                    <td className="mono">{r.distance} km</td>
                    <td><span className={`badge ${r.traffic === 'high' ? 'badge-booked' : r.traffic === 'medium' ? 'badge-pending' : 'badge-available'}`}>{r.traffic}</span></td>
                    <td className="mono">{r.daily_riders.toLocaleString('en-IN')}</td>
                    <td style={{ textTransform: 'capitalize' }}>{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Campaigns */}
        {tab === 'campaigns' && (
          <div className="card">
            <table className="data-table">
              <thead>
                <tr><th>Campaign</th><th>Advertiser</th><th>Buses</th><th>Duration</th><th>Status</th><th>Impressions</th><th>Budget</th></tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.advertiser}</td>
                    <td className="mono">{c.busCount}</td>
                    <td className="mono">{c.duration} days</td>
                    <td><span className={`badge ${c.status === 'active' ? 'badge-available' : 'badge-pending'}`}>{c.status}</span></td>
                    <td className="mono">{(c.impressions / 1e6).toFixed(2)}M</td>
                    <td className="mono">₹{c.totalBudget.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transactions */}
        {tab === 'transactions' && (
          <div className="card">
            <table className="data-table">
              <thead>
                <tr><th>Transaction</th><th>Advertiser</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th><th>Method</th></tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map(t => (
                  <tr key={t.id}>
                    <td className="mono" style={{ fontWeight: 600 }}>{t.id}</td>
                    <td>{t.advertiser}</td>
                    <td>{t.type}</td>
                    <td className="mono">₹{t.amount.toLocaleString('en-IN')}</td>
                    <td><span className="badge badge-available">{t.status}</span></td>
                    <td>{t.date}</td>
                    <td>{t.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
