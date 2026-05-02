import { useState } from 'react';
import { BUSES, ROUTES } from '../data/mockData';
import { Package, Search, Bus, Filter } from 'lucide-react';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]);

  const filters = [
    { id: 'all', label: 'All Buses' },
    { id: 'premium', label: 'Premium Routes' },
    { id: 'religious', label: 'Religious Zones' },
    { id: 'available', label: 'Available Only' },
  ];

  const filtered = BUSES.filter(b => {
    if (search && !b.id.toLowerCase().includes(search.toLowerCase()) && !b.route.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'premium') return b.type === 'premium';
    if (filter === 'religious') return b.type === 'religious';
    if (filter === 'available') return b.status === 'available';
    return true;
  });

  const total = BUSES.length;
  const available = BUSES.filter(b => b.status === 'available').length;
  const booked = total - available;

  const toggleCart = (id) => {
    setCart(prev => prev.includes(id) ? prev.filter(i=>i!==id) : [...prev, id]);
  };

  return (
    <>
      <div className="page-header">
        <h1><Package size={20} /> Inventory Marketplace</h1>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{position:'relative'}}>
            <Search size={16} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text-secondary)'}} />
            <input placeholder="Search Bus ID, Route or Location..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{paddingLeft:36,width:320}} />
          </div>
        </div>
      </div>
      <div className="page-body fade-in">
        {/* Stats */}
        <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          <div className="kpi-card"><div className="kpi-label"><Bus size={14}/> Total Buses</div><div className="kpi-value">{total}</div></div>
          <div className="kpi-card"><div className="kpi-label" style={{color:'var(--transit-green)'}}>Available</div><div className="kpi-value" style={{color:'var(--transit-green)'}}>{available}</div></div>
          <div className="kpi-card"><div className="kpi-label" style={{color:'var(--danger)'}}>Booked</div><div className="kpi-value" style={{color:'var(--danger)'}}>{booked}</div></div>
          <div className="kpi-card"><div className="kpi-label"><Filter size={14}/> In Campaign</div><div className="kpi-value">{cart.length}</div></div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          {filters.map(f => (
            <button key={f.id} className={`filter-chip ${filter===f.id?'active':''}`} onClick={()=>setFilter(f.id)}>{f.label}</button>
          ))}
          <span style={{marginLeft:'auto',fontSize:'0.82rem',color:'var(--text-secondary)'}}>{filtered.length} buses found</span>
        </div>

        {/* Grid */}
        <div className="inv-grid">
          {filtered.map(b => (
            <div className="inv-card" key={b.id} style={{borderColor: cart.includes(b.id) ? 'var(--transit-green)' : undefined}}>
              <div className="inv-header">
                <div className="inv-id">{b.id}</div>
                <span className={`badge ${b.status==='available'?'badge-available':'badge-booked'}`}>{b.status}</span>
              </div>
              <div className="inv-route">{b.route}</div>
              <div className="inv-stats">
                <div className="inv-stat">Daily Reach <span>{b.dailyReach.toLocaleString('en-IN')}</span></div>
                <div className="inv-stat">Type <span style={{textTransform:'capitalize'}}>{b.type}</span></div>
              </div>
              <button
                className={`btn btn-sm btn-block ${b.status==='booked'?'btn-secondary':cart.includes(b.id)?'btn-danger':'btn-primary'}`}
                disabled={b.status==='booked'}
                onClick={()=>toggleCart(b.id)}
                style={b.status==='booked'?{opacity:0.5,cursor:'not-allowed'}:{}}
              >
                {b.status==='booked' ? 'Booked' : cart.includes(b.id) ? 'Remove from Campaign' : 'Add to Campaign'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
