import { useState, useEffect } from 'react';
import { ROUTES, calculateImpressions, calculatePrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { MapPin, Zap, Eye, Navigation, X, TrendingUp, Users, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41],
});

function AnimatedBus({ route }) {
  const map = useMap();
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPos(p => (p + 1) % route.coords.length), 2000);
    return () => clearInterval(iv);
  }, [route]);
  const coord = route.coords[pos];
  if (!coord) return null;
  return <Marker position={coord} icon={greenIcon}><Popup>{route.name} 🚌</Popup></Marker>;
}

const routeColors = { premium: '#2ECC71', standard: '#3B82F6', religious: '#F59E0B' };

export default function CampaignPlanner() {
  const { user } = useAuth();
  const [selectedRoutes, setSelectedRoutes] = useState(['R1', 'R2']);
  const [busCount, setBusCount] = useState(120);
  const [duration, setDuration] = useState(30);

  const toggleRoute = (id) => {
    setSelectedRoutes(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const forecast = calculateImpressions(selectedRoutes, busCount, duration);
  const price = calculatePrice(selectedRoutes, busCount, duration);

  return (
    <>
      <div className="page-header">
        <h1><MapIcon size={20} /> Campaign Planner</h1>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>{user?.company}</span>
          <div style={{width:32,height:32,borderRadius:'50%',background:'var(--deep-green)',display:'grid',placeItems:'center',fontWeight:700,fontSize:'0.8rem'}}>{user?.name?.charAt(0)}</div>
        </div>
      </div>
      <div className="planner-layout">
        {/* Left sidebar - inputs */}
        <div className="planner-sidebar">
          <h3 style={{fontSize:'0.95rem',marginBottom:16,display:'flex',alignItems:'center',gap:8}}><MapPin size={16} /> Select Routes</h3>
          <div style={{fontSize:'0.78rem',color:'var(--text-secondary)',marginBottom:12}}>{selectedRoutes.length} Routes Selected</div>
          {ROUTES.map(r => (
            <div key={r.id} onClick={() => toggleRoute(r.id)}
              style={{
                padding:'10px 12px', borderRadius:8, marginBottom:6, cursor:'pointer',
                background: selectedRoutes.includes(r.id) ? 'rgba(46,204,113,0.1)' : 'var(--surface-2)',
                border: `1px solid ${selectedRoutes.includes(r.id) ? 'var(--transit-green)' : 'var(--border)'}`,
                display:'flex', alignItems:'center', justifyContent:'space-between',
                transition:'all 0.2s'
              }}>
              <div>
                <div style={{fontSize:'0.85rem',fontWeight:600}}>{r.name}</div>
                <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>{r.distance}km • {r.traffic} traffic</div>
              </div>
              {selectedRoutes.includes(r.id) && <X size={14} color="var(--transit-green)" />}
            </div>
          ))}

          <div style={{marginTop:24}}>
            <label style={{fontSize:'0.85rem',fontWeight:600,display:'flex',justifyContent:'space-between'}}>Number of Buses <span className="mono" style={{color:'var(--transit-green)'}}>{busCount}</span></label>
            <input type="range" className="range-slider" min={10} max={500} value={busCount} onChange={e=>setBusCount(+e.target.value)} style={{marginTop:8}} />
          </div>

          <div style={{marginTop:20}}>
            <label style={{fontSize:'0.85rem',fontWeight:600,marginBottom:8,display:'block'}}>Duration</label>
            <div style={{display:'flex',gap:8}}>
              {[7,15,30].map(d => (
                <button key={d} onClick={()=>setDuration(d)}
                  className={`btn btn-sm ${duration===d?'btn-primary':'btn-secondary'}`}>
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop:24,padding:14,background:'rgba(46,204,113,0.08)',borderRadius:8,border:'1px solid rgba(46,204,113,0.2)'}}>
            <div style={{fontSize:'0.78rem',color:'var(--transit-green)',fontWeight:600,marginBottom:6}}>💡 Quick Forecast</div>
            <div style={{fontSize:'0.82rem',color:'var(--text-secondary)'}}>Est. Impressions: <span className="mono" style={{color:'var(--text-primary)'}}>{(forecast.low/1e6).toFixed(1)}M – {(forecast.high/1e6).toFixed(1)}M</span></div>
            <div style={{fontSize:'0.82rem',color:'var(--text-secondary)',marginTop:4}}>Budget: <span className="mono" style={{color:'var(--text-primary)'}}>₹{price.total.toLocaleString('en-IN')}</span></div>
          </div>

          <button className="btn btn-primary btn-block" style={{marginTop:16}} onClick={()=>alert('Forecast generated!')}>View Forecast</button>
        </div>

        {/* Center - Map */}
        <div className="planner-map">
          <MapContainer center={[20.005, 73.79]} zoom={13} style={{height:'100%',width:'100%'}} zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CartoDB' />
            {ROUTES.map(r => (
              <Polyline key={r.id} positions={r.coords} pathOptions={{
                color: selectedRoutes.includes(r.id) ? routeColors[r.type] || '#2ECC71' : '#4a5568',
                weight: selectedRoutes.includes(r.id) ? 4 : 2,
                opacity: selectedRoutes.includes(r.id) ? 1 : 0.3,
              }} />
            ))}
            {ROUTES.filter(r => selectedRoutes.includes(r.id)).map(r => (
              <AnimatedBus key={r.id} route={r} />
            ))}
          </MapContainer>
          {/* Map legend */}
          <div style={{position:'absolute',bottom:20,left:20,zIndex:1000,background:'var(--surface-1)',border:'1px solid var(--border)',borderRadius:8,padding:'12px 16px',fontSize:'0.78rem'}}>
            <div style={{fontWeight:600,marginBottom:8}}>Route Types</div>
            {Object.entries(routeColors).map(([k,c])=>(
              <div key={k} style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                <div style={{width:16,height:3,background:c,borderRadius:2}}></div>
                <span style={{textTransform:'capitalize'}}>{k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Forecast */}
        <div className="planner-forecast">
          <h3 style={{fontSize:'0.95rem',marginBottom:20}}>Campaign Forecast</h3>
          <div style={{padding:16,background:'var(--surface-2)',borderRadius:8,marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}><Zap size={16} color="var(--transit-green)"/> <span style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>Estimated Impressions</span></div>
            <div className="mono" style={{fontSize:'1.8rem',fontWeight:700,color:'var(--transit-green)'}}>{(forecast.low/1e6).toFixed(1)}M – {(forecast.high/1e6).toFixed(1)}M</div>
          </div>
          <div className="grid-2" style={{gap:12,marginBottom:16}}>
            <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
              <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Avg. CPM</div>
              <div className="mono" style={{fontSize:'1.1rem',fontWeight:700}}>₹{forecast.avgCPM.toFixed(0)}</div>
            </div>
            <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
              <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Daily Reach (Adj.)</div>
              <div className="mono" style={{fontSize:'1.1rem',fontWeight:700}}>{(forecast.dailyReach/1000).toFixed(0)}K – {(forecast.dailyReach*1.4/1000).toFixed(0)}K</div>
            </div>
          </div>
          <div style={{padding:12,background:'var(--surface-2)',borderRadius:8,marginBottom:16}}>
            <div style={{fontSize:'0.72rem',color:'var(--text-secondary)',marginBottom:4}}>Total Reach Area</div>
            <div className="mono" style={{fontSize:'1.1rem',fontWeight:700}}>{forecast.coverage}+ Locations</div>
          </div>
          <div style={{padding:12,background:'var(--surface-2)',borderRadius:8,marginBottom:16}}>
            <div style={{fontSize:'0.72rem',color:'var(--text-secondary)',marginBottom:4}}>Visibility Score</div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div className="mono" style={{fontSize:'1.1rem',fontWeight:700}}>{forecast.visibilityScore} / 100</div>
              <div style={{flex:1,height:6,background:'var(--border)',borderRadius:3,overflow:'hidden'}}>
                <div style={{width:`${forecast.visibilityScore}%`,height:'100%',background:'var(--transit-green)',borderRadius:3,transition:'width 0.5s'}}></div>
              </div>
            </div>
          </div>
          <div style={{padding:12,background:'var(--surface-2)',borderRadius:8,marginBottom:16}}>
            <div style={{fontSize:'0.72rem',color:'var(--text-secondary)',marginBottom:6}}>🎯 Potential Audience</div>
            <div style={{fontSize:'0.82rem',color:'var(--text-primary)'}}>Students, Commuters, Professionals</div>
          </div>
          <div style={{padding:14,background:'rgba(46,204,113,0.08)',borderRadius:8,border:'1px solid rgba(46,204,113,0.2)'}}>
            <div style={{fontSize:'0.82rem',fontWeight:600,color:'var(--transit-green)',marginBottom:4}}>💰 Estimated Budget</div>
            <div className="mono" style={{fontSize:'1.4rem',fontWeight:700}}>₹{price.total.toLocaleString('en-IN')}</div>
            <div style={{fontSize:'0.72rem',color:'var(--text-secondary)',marginTop:4}}>Incl. GST • {duration} days • {busCount} buses</div>
          </div>
        </div>
      </div>
    </>
  );
}
