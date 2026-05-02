import { useState, useEffect } from 'react';
import { Radio, Bus, Eye, Map as MapIcon, TrendingUp } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import { ROUTES, CAMPAIGNS } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LiveDashboard() {
  const [busPositions, setBusPositions] = useState([]);

  useEffect(() => {
    const update = () => {
      const positions = ROUTES.flatMap(r =>
        Array.from({ length: Math.floor(Math.random()*3)+1 }, (_, i) => {
          const idx = Math.floor(Math.random() * r.coords.length);
          const c = r.coords[idx];
          return { id: `${r.id}-${i}`, lat: c[0] + (Math.random()-0.5)*0.003, lng: c[1] + (Math.random()-0.5)*0.003, route: r.name };
        })
      );
      setBusPositions(positions);
    };
    update();
    const iv = setInterval(update, 3000);
    return () => clearInterval(iv);
  }, []);

  const campaign = CAMPAIGNS[0];
  const perfData = Array.from({length:7},(_,i) => ({
    day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],
    impressions: Math.round(180000 + Math.random()*50000),
  }));

  return (
    <>
      <div className="page-header">
        <h1><Radio size={20} className="pulse-green" style={{borderRadius:'50%'}}/> Live Campaign Dashboard</h1>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:'0.82rem',color:'var(--text-secondary)'}}>15 May – 14 Jun 2026</span>
          <span style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.82rem',color:'var(--transit-green)'}}><span style={{width:8,height:8,borderRadius:'50%',background:'var(--transit-green)',display:'inline-block'}}></span> Live</span>
        </div>
      </div>
      <div className="page-body fade-in">
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label"><Bus size={14}/> Active Buses</div>
            <div className="kpi-value">112 <span style={{fontSize:'0.85rem',color:'var(--text-secondary)',fontFamily:'DM Sans'}}>/ 122</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Eye size={14}/> Daily Impressions</div>
            <div className="kpi-value" style={{color:'var(--transit-green)'}}>2.78M</div>
            <div className="kpi-change positive">+5.2%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><TrendingUp size={14}/> Estimated Reach</div>
            <div className="kpi-value">91K – 142K</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><MapIcon size={14}/> Coverage Score</div>
            <div className="kpi-value">88 <span style={{fontSize:'0.85rem',color:'var(--text-secondary)',fontFamily:'DM Sans'}}>/ 100</span></div>
          </div>
        </div>

        <div className="grid-2" style={{gap:20}}>
          {/* Live Map */}
          <div className="card" style={{padding:0,overflow:'hidden'}}>
            <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
              <h3 style={{fontSize:'0.95rem'}}>Live Bus Tracking</h3>
            </div>
            <div style={{height:400}}>
              <MapContainer center={[20.005,73.79]} zoom={13} style={{height:'100%',width:'100%'}} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                {ROUTES.map(r => <Polyline key={r.id} positions={r.coords} pathOptions={{color:'#2D3748',weight:2,opacity:0.5}} />)}
                {busPositions.map(b => (
                  <CircleMarker key={b.id} center={[b.lat,b.lng]} radius={5} pathOptions={{fillColor:'#2ECC71',fillOpacity:1,color:'#1E8449',weight:2}}>
                    <Popup>{b.route} 🚌</Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Campaign performance */}
          <div>
            <div className="card" style={{marginBottom:16}}>
              <h3 style={{fontSize:'0.95rem',marginBottom:16}}>Campaign Performance</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
                  <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Impressions</div>
                  <div className="mono" style={{fontSize:'1.2rem',fontWeight:700,color:'var(--transit-green)'}}>2.78M</div>
                  <div style={{fontSize:'0.72rem',color:'var(--transit-green)'}}>+5%</div>
                </div>
                <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
                  <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Reach</div>
                  <div className="mono" style={{fontSize:'1.2rem',fontWeight:700}}>1.32M</div>
                </div>
                <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
                  <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Avg. CPM</div>
                  <div className="mono" style={{fontSize:'1.2rem',fontWeight:700}}>₹39.2</div>
                  <div style={{fontSize:'0.72rem',color:'var(--danger)'}}>-2.7%</div>
                </div>
                <div style={{padding:12,background:'var(--surface-2)',borderRadius:8}}>
                  <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>Spent</div>
                  <div className="mono" style={{fontSize:'1.2rem',fontWeight:700}}>₹1,09,760</div>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 style={{fontSize:'0.95rem',marginBottom:12}}>Top Performing Routes</h3>
              {[{r:'CBS → Panchavati',v:'1.12M'},{r:'College Road → MIDC',v:'890K'},{r:'Satpur → Gangapur',v:'650K'}].map((item,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:i<2?'1px solid var(--border)':'none'}}>
                  <span style={{fontSize:'0.88rem'}}>{item.r}</span>
                  <span className="mono" style={{fontSize:'0.88rem',color:'var(--transit-green)'}}>{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
