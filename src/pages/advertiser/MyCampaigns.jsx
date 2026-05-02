import { useAuth } from '../../context/AuthContext';
import { CAMPAIGNS } from '../../data/mockData';

export default function MyCampaigns() {
  const { user } = useAuth();
  const myCampaigns = CAMPAIGNS.filter((campaign) => campaign.userId === user?.id);

  return (
    <>
      <div className="page-header">
        <h1>My Campaigns</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Routes</th>
                <th>Status</th>
                <th>Impressions</th>
                <th>Reach</th>
                <th>Spend</th>
              </tr>
            </thead>
            <tbody>
              {myCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td style={{ fontWeight: 700 }}>{campaign.name}</td>
                  <td>{campaign.routes.join(', ')}</td>
                  <td>
                    <span className={`badge ${campaign.status === 'active' ? 'badge-available' : 'badge-pending'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="mono">{(campaign.impressions / 1e6).toFixed(2)}M</td>
                  <td className="mono">{(campaign.reach / 1e6).toFixed(2)}M</td>
                  <td className="mono">₹{campaign.spent.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              {myCampaigns.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ color: 'var(--text-secondary)' }}>
                    No campaigns found for this account.
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
