import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  Bus,
  Route,
  CheckSquare,
  Wallet,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/campaigns', icon: Briefcase, label: 'Campaign Management' },
  { to: '/admin/inventory', icon: Bus, label: 'Bus Inventory' },
  { to: '/admin/routes', icon: Route, label: 'Route Management' },
  { to: '/admin/approvals', icon: CheckSquare, label: 'Creative Approvals' },
  { to: '/admin/revenue', icon: Wallet, label: 'Payments & Revenue' },
  { to: '/admin/users', icon: Users, label: 'Users & Advertisers' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports & Analytics' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.png" alt="Nashik TransitAds" style={{ width: 52, height: 52, objectFit: 'contain' }} />
          <div>
            <h2>Operations Control</h2>
            <p>Nashik TransitAds</p>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              <item.icon size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-user">
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Signed in as</div>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{user?.name || 'Admin'}</div>
          <button className="btn btn-secondary btn-sm btn-block" onClick={handleLogout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
