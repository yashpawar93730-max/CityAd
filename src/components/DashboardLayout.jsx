import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Map, Package, Upload, CreditCard, Radio, BarChart3, Shield, LogOut, Bus, Users, FileText, Settings } from 'lucide-react';

const navItems = [
  { to: '/dashboard/planner', icon: Map, label: 'Campaign Planner' },
  { to: '/dashboard/inventory', icon: Package, label: 'Inventory Marketplace' },
  { to: '/dashboard/creative', icon: Upload, label: 'Creative Upload' },
  { to: '/dashboard/pricing', icon: CreditCard, label: 'Pricing & Payment' },
  { to: '/dashboard/live', icon: Radio, label: 'Live Dashboard' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics & Reporting' },
];

const adminItems = [
  { to: '/dashboard/admin', icon: Shield, label: 'Admin Panel' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Nashik TransitAds" style={{width:42,height:42,objectFit:'contain',borderRadius:8}} />
          <div className="logo-text">
            <h2>Nashik<br/>TransitAds</h2>
            <span>Move. Advertise. Impact.</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? 'active' : ''}>
              <item.icon /> {item.label}
            </NavLink>
          ))}
          {user?.role === 'admin' && adminItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? 'active' : ''}>
              <item.icon /> {item.label}
            </NavLink>
          ))}
          <a onClick={handleLogout} style={{marginTop: 'auto', cursor: 'pointer'}}>
            <LogOut /> Log Out
          </a>
        </nav>
        <div className="sidebar-brand">
          <strong>Turn Every Bus Into a Moving Billboard</strong>
          with Measurable Impact.
        </div>
      </aside>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
