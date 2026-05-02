import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CAMPAIGNS, TRANSACTIONS, CREATIVES } from '../../data/mockData';
import { Rocket, Upload, CreditCard, BarChart3 } from 'lucide-react';

export default function AdvertiserDashboard() {
  const { user } = useAuth();
  const myCampaigns = CAMPAIGNS.filter((c) => c.userId === user?.id);
  const myTransactions = TRANSACTIONS.filter((t) => t.advertiser === user?.company);
  const myCreatives = CREATIVES.filter((c) => c.advertiser === user?.company);

  const activeCampaigns = myCampaigns.filter((c) => c.status === 'active').length;
  const totalSpend = myTransactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingCreatives = myCreatives.filter((c) => c.status === 'pending').length;
  const totalImpressions = myCampaigns.reduce((sum, c) => sum + c.impressions, 0);

  return (
    <>
      <div className="page-header">
        <h1>Advertiser Dashboard</h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>{user?.company}</div>
      </div>
      <div className="page-body fade-in">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Active Campaigns</div>
            <div className="kpi-value">{activeCampaigns}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Spend</div>
            <div className="kpi-value">₹{totalSpend.toLocaleString('en-IN')}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Pending Creatives</div>
            <div className="kpi-value" style={{ color: 'var(--warning)' }}>
              {pendingCreatives}
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Impressions</div>
            <div className="kpi-value">{(totalImpressions / 1e6).toFixed(2)}M</div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 20 }}>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Launch A Campaign</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              Use our guided planner to select routes, estimate reach, and build your next campaign.
            </p>
            <Link className="btn btn-primary" to="/advertiser/planner">
              <Rocket size={16} /> Open Campaign Planner
            </Link>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link className="btn btn-secondary btn-sm" to="/advertiser/creative">
                <Upload size={14} /> Upload Creative
              </Link>
              <Link className="btn btn-secondary btn-sm" to="/advertiser/payments">
                <CreditCard size={14} /> Make Payment
              </Link>
              <Link className="btn btn-secondary btn-sm" to="/advertiser/analytics">
                <BarChart3 size={14} /> View Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header">
            <h3>My Recent Campaigns</h3>
            <Link to="/advertiser/campaigns">View all</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Status</th>
                <th>Buses</th>
                <th>Duration</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {myCampaigns.slice(0, 4).map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>
                    <span className={`badge ${campaign.status === 'active' ? 'badge-available' : 'badge-pending'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>{campaign.busCount}</td>
                  <td>{campaign.duration} days</td>
                  <td>₹{campaign.totalBudget.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              {myCampaigns.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ color: 'var(--text-secondary)' }}>
                    No campaigns yet. Start from Campaign Planner.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
