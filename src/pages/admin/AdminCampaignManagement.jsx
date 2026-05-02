import { useState } from 'react';
import { CAMPAIGNS, ROUTES } from '../../data/mockData';

export default function AdminCampaignManagement() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);

  const pauseCampaign = (id) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'paused' } : c)));
  };

  const modifyRoutes = (id) => {
    const nextRoute = ROUTES[Math.floor(Math.random() * ROUTES.length)].id;
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, routes: Array.from(new Set([...c.routes, nextRoute])) } : c))
    );
  };

  const reassignBuses = (id) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, busCount: Math.max(5, c.busCount + (Math.random() > 0.5 ? 2 : -2)) } : c))
    );
  };

  return (
    <>
      <div className="page-header">
        <h1>Campaign Management</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Advertiser</th>
                <th>Routes</th>
                <th>Status</th>
                <th>Buses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>{campaign.advertiser}</td>
                  <td>{campaign.routes.join(', ')}</td>
                  <td>
                    <span className={`badge ${campaign.status === 'active' ? 'badge-available' : 'badge-pending'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>{campaign.busCount}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => pauseCampaign(campaign.id)}>
                        Pause Campaign
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => modifyRoutes(campaign.id)}>
                        Modify Routes
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => reassignBuses(campaign.id)}>
                        Reassign Buses
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
