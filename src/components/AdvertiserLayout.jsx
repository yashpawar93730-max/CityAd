import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Map, Briefcase, Upload, CreditCard, BarChart3, LogOut } from 'lucide-react';

const navItems = [
  { to: '/advertiser/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/advertiser/planner', icon: Map, label: 'Campaign Planner' },
  { to: '/advertiser/campaigns', icon: Briefcase, label: 'My Campaigns' },
  { to: '/advertiser/creative', icon: Upload, label: 'Creative Upload' },
  { to: '/advertiser/payments', icon: CreditCard, label: 'Payments' },
  { to: '/advertiser/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function AdvertiserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="advertiser-layout">
      <aside className="advertiser-sidebar">
        <div className="advertiser-brand">
          <img src="/logo.png" alt="Nashik TransitAds" style={{ width: 54, height: 54, objectFit: 'contain' }} />
          <div>
            <h2>Advertiser Panel</h2>
            <p>Guided campaign workspace</p>
          </div>
        </div>
        <nav className="advertiser-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="advertiser-user">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="advertiser-avatar">{user?.name?.charAt(0) || 'A'}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.name || 'Advertiser'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user?.company || 'Client Account'}</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>
      <main className="advertiser-content">
        <Outlet />
      </main>
    </div>
  );
}
