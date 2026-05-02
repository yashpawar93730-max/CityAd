import { CAMPAIGNS, ROUTES } from '../../data/mockData';

export default function AdminReports() {
  const totalImpressions = CAMPAIGNS.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalReach = CAMPAIGNS.reduce((sum, campaign) => sum + campaign.reach, 0);

  return (
    <>
      <div className="page-header">
        <h1>Reports & Analytics</h1>
      </div>
      <div className="page-body fade-in">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">System Impressions</div>
            <div className="kpi-value">{(totalImpressions / 1e6).toFixed(2)}M</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">System Reach</div>
            <div className="kpi-value">{(totalReach / 1e6).toFixed(2)}M</div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Route Utilization Summary</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Distance</th>
                <th>Traffic</th>
                <th>Daily Riders</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((route) => (
                <tr key={route.id}>
                  <td>{route.name}</td>
                  <td>{route.distance} km</td>
                  <td>{route.traffic}</td>
                  <td>{route.daily_riders.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
