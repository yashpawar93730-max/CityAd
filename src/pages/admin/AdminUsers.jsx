import { useState } from 'react';
import { CAMPAIGNS, TRANSACTIONS, USERS } from '../../data/mockData';

export default function AdminUsers() {
  const advertiserRows = USERS.filter((user) => user.role === 'advertiser').map((user) => {
    const campaigns = CAMPAIGNS.filter((campaign) => campaign.userId === user.id);
    const spend = TRANSACTIONS.filter((transaction) => transaction.advertiser === user.company).reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return {
      id: user.id,
      name: user.name,
      company: user.company,
      campaigns: campaigns.length,
      spend,
      suspended: false,
    };
  });

  const [rows, setRows] = useState(advertiserRows);

  const suspendUser = (id) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, suspended: !row.suspended } : row)));
  };

  const editAccount = (id) => {
    const nextName = window.prompt('Update account display name');
    if (!nextName) return;
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, name: nextName } : row)));
  };

  return (
    <>
      <div className="page-header">
        <h1>Users & Advertisers</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Campaigns</th>
                <th>Total Spend</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div>{row.company}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{row.name}</div>
                  </td>
                  <td>{row.campaigns}</td>
                  <td>₹{row.spend.toLocaleString('en-IN')}</td>
                  <td>{row.suspended ? 'Suspended' : 'Active'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => suspendUser(row.id)}>
                        Suspend User
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => editAccount(row.id)}>
                        Edit Account
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
