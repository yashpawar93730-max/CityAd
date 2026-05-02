import { useMemo } from 'react';
import { TRANSACTIONS } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminRevenue() {
  const dailyRevenue = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        day: `D${i + 1}`,
        revenue: Math.round(65000 + Math.random() * 50000),
      })),
    []
  );

  const monthlyRevenue = TRANSACTIONS.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <>
      <div className="page-header">
        <h1>Payments & Revenue</h1>
      </div>
      <div className="page-body fade-in">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Monthly Summary</div>
            <div className="kpi-value">₹{monthlyRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Invoices Tracked</div>
            <div className="kpi-value">{TRANSACTIONS.length}</div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 12 }}>Daily Revenue Graph</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid #2D3748' }} />
                <Area type="monotone" dataKey="revenue" stroke="#2ECC71" fill="#2ECC71" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Invoice Tracking</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Advertiser</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.advertiser}</td>
                  <td>₹{transaction.amount.toLocaleString('en-IN')}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
