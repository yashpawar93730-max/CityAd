import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdvertiserLayout from './components/AdvertiserLayout';
import AdminLayout from './components/AdminLayout';
import CampaignPlanner from './pages/CampaignPlanner';
import CreativeUpload from './pages/CreativeUpload';
import Payments from './pages/Pricing';
import Analytics from './pages/Analytics';
import AdvertiserDashboard from './pages/advertiser/AdvertiserDashboard';
import MyCampaigns from './pages/advertiser/MyCampaigns';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCampaignManagement from './pages/admin/AdminCampaignManagement';
import AdminInventory from './pages/admin/AdminInventory';
import AdminRouteManagement from './pages/admin/AdminRouteManagement';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminRevenue from './pages/admin/AdminRevenue';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

function getHomePathByRole(user) {
  if (user?.role === 'admin') return '/admin/dashboard';
  return '/advertiser/dashboard';
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to={getHomePathByRole(user)} replace />;
  return children;
}

function LegacyDashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getHomePathByRole(user)} replace />;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={user ? <Navigate to={getHomePathByRole(user)} replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={getHomePathByRole(user)} replace /> : <Signup />} />

      <Route
        path="/advertiser"
        element={
          <RoleRoute allowedRoles={['advertiser']}>
            <AdvertiserLayout />
          </RoleRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdvertiserDashboard />} />
        <Route path="planner" element={<CampaignPlanner />} />
        <Route path="campaigns" element={<MyCampaigns />} />
        <Route path="creative" element={<CreativeUpload />} />
        <Route path="payments" element={<Payments />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={['admin']}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="campaigns" element={<AdminCampaignManagement />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="routes" element={<AdminRouteManagement />} />
        <Route path="approvals" element={<AdminApprovals />} />
        <Route path="revenue" element={<AdminRevenue />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="/dashboard/*" element={<ProtectedRoute><LegacyDashboardRedirect /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={user ? getHomePathByRole(user) : '/'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
