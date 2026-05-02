import { ROUTES } from '../../data/mockData';

export default function AdminRouteManagement() {
  return (
    <>
      <div className="page-header">
        <h1>Route Management</h1>
      </div>
      <div className="page-body fade-in">
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Name</th>
                <th>Distance</th>
                <th>Traffic</th>
                <th>Daily Riders</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((route) => (
                <tr key={route.id}>
                  <td className="mono">{route.id}</td>
                  <td>{route.name}</td>
                  <td>{route.distance} km</td>
                  <td style={{ textTransform: 'capitalize' }}>{route.traffic}</td>
                  <td className="mono">{route.daily_riders.toLocaleString('en-IN')}</td>
                  <td style={{ textTransform: 'capitalize' }}>{route.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
