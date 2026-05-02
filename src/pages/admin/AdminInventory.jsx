import { useState } from 'react';
import { BUSES } from '../../data/mockData';

export default function AdminInventory() {
  const [buses, setBuses] = useState(BUSES);

  const addBus = () => {
    const next = {
      id: `MH15-${String(9000 + buses.length).padStart(4, '0')}`,
      route: 'New Route Assignment',
      routeId: 'R1',
      status: 'available',
      dailyReach: 9800,
      type: 'standard',
      lastService: '2026-05-01',
    };
    setBuses((prev) => [next, ...prev]);
  };

  const editBus = (id) => {
    setBuses((prev) =>
      prev.map((bus) => (bus.id === id ? { ...bus, dailyReach: bus.dailyReach + 250 } : bus))
    );
  };

  const markMaintenance = (id) => {
    setBuses((prev) =>
      prev.map((bus) => (bus.id === id ? { ...bus, status: 'maintenance' } : bus))
    );
  };

  return (
    <>
      <div className="page-header">
        <h1>Bus Inventory</h1>
        <button className="btn btn-primary btn-sm" onClick={addBus}>
          Add Bus
        </button>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Route</th>
                <th>Status</th>
                <th>Reach</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.slice(0, 30).map((bus) => (
                <tr key={bus.id}>
                  <td className="mono">{bus.id}</td>
                  <td>{bus.route}</td>
                  <td style={{ textTransform: 'capitalize' }}>{bus.status}</td>
                  <td className="mono">{bus.dailyReach.toLocaleString('en-IN')}</td>
                  <td>{bus.status === 'available' ? 'Available' : 'Not Available'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => editBus(bus.id)}>
                        Edit Bus
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => markMaintenance(bus.id)}>
                        Mark Maintenance
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
