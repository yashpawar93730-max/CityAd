import { useState } from 'react';
import { CREATIVES } from '../../data/mockData';

export default function AdminApprovals() {
  const [creatives, setCreatives] = useState(CREATIVES);

  const approve = (id) => {
    setCreatives((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'approved', rejectReason: undefined } : c)));
  };

  const reject = (id) => {
    const reason = window.prompt('Reason for rejection:', 'Low resolution');
    if (!reason) return;
    setCreatives((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'rejected', rejectReason: reason } : c)));
  };

  const requestChanges = (id) => {
    const reason = window.prompt('Change request notes:', 'Please increase contrast and update CTA.');
    if (!reason) return;
    setCreatives((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'changes_requested', rejectReason: reason } : c)));
  };

  return (
    <>
      <div className="page-header">
        <h1>Creative Approvals</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Creative</th>
                <th>Advertiser</th>
                <th>Campaign</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creatives.map((creative) => (
                <tr key={creative.id}>
                  <td>{creative.fileName}</td>
                  <td>{creative.advertiser}</td>
                  <td>{creative.campaign}</td>
                  <td>{creative.status}</td>
                  <td>{creative.submittedOn}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => approve(creative.id)}>
                        Approve
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => reject(creative.id)}>
                        Reject
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => requestChanges(creative.id)}>
                        Request Changes
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
