import { useMemo } from 'react';
import { BUSES, CAMPAIGNS, CREATIVES, ROUTES, TRANSACTIONS } from '../../data/mockData';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getRouteCoords(routeId) {
  const route = ROUTES.find((r) => r.id === routeId);
  return route?.coords?.[1] || route?.coords?.[0] || [20.005, 73.79];
}

export default function AdminDashboard() {
  const totalRevenue = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
  const activeCampaigns = CAMPAIGNS.filter((c) => c.status === 'active').length;
  const totalBuses = BUSES.length;
  const pendingApprovals = CREATIVES.filter((c) => c.status === 'pending').length;

  const revenueData = useMemo(
    () =>
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
        day,
        revenue: Math.round(75000 + Math.random() * 45000),
      })),
    []
  );

  const statusData = [
    { label: 'Active', value: CAMPAIGNS.filter((c) => c.status === 'active').length, color: 'var(--transit-green)' },
    { label: 'Completed', value: CAMPAIGNS.filter((c) => c.status === 'completed').length, color: 'var(--accent-blue)' },
    { label: 'Pending', value: CAMPAIGNS.filter((c) => c.status === 'pending').length, color: 'var(--warning)' },
  ];

  return (
    <>
      <div className="page-header">
        <h1>Operations Control Dashboard</h1>
      </div>
      <div className="page-body fade-in">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Total Revenue</div>
            <div className="kpi-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Active Campaigns</div>
            <div className="kpi-value">{activeCampaigns}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Buses</div>
            <div className="kpi-value">{totalBuses}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Pending Approvals</div>
            <div className="kpi-value" style={{ color: 'var(--warning)' }}>
              {pendingApprovals}
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 18 }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
              <h3>Live Map (All Buses)</h3>
            </div>
            <div style={{ height: 360 }}>
              <MapContainer center={[20.005, 73.79]} zoom={12} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                {ROUTES.map((route) => (
                  <Polyline key={route.id} positions={route.coords} pathOptions={{ color: '#2D3748', weight: 2 }} />
                ))}
                {BUSES.slice(0, 45).map((bus) => {
                  const [lat, lng] = getRouteCoords(bus.routeId);
                  return (
                    <CircleMarker key={bus.id} center={[lat, lng]} radius={4} pathOptions={{ color: '#2ECC71', fillColor: '#2ECC71', fillOpacity: 0.8 }}>
                      <Popup>
                        {bus.id} <br />
                        {bus.route}
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="card">
              <h3 style={{ marginBottom: 12 }}>Recent Activity Feed</h3>
              <div style={{ display: 'grid', gap: 10, fontSize: '0.86rem' }}>
                <div>Creative submitted by GreenLeaf Beverages for Summer Blast Campaign.</div>
                <div>Campaign Akshaya Tritiya Offer was reassigned with 3 new buses.</div>
                <div>Payment received: ₹85,000 from Nashik Jewellers.</div>
                <div>Bus MH15-4210 moved to maintenance status.</div>
              </div>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 12 }}>Campaign Status Overview</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {statusData.map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface-2)', borderRadius: 8, padding: '10px 12px' }}>
                    <span>{item.label}</span>
                    <strong style={{ color: item.color }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 12 }}>Revenue Chart</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #2D3748' }} />
                <Bar dataKey="revenue" fill="#2ECC71" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
