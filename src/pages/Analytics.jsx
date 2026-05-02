import { useState } from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { generateDailyData, getRoutePerformance } from '../data/mockData';

const COLORS = ['#2ECC71','#3B82F6','#F59E0B','#EF4444','#8B5CF6'];

export default function Analytics() {
  const [range, setRange] = useState('14d');
  const dailyData = generateDailyData(range==='7d'?7:range==='14d'?14:30);
  const routePerf = getRoutePerformance();

  const pieData = [
    { name:'CBS → Panchavati', value:35 },
    { name:'College Road → MIDC', value:25 },
    { name:'Satpur → Gangapur', value:20 },
    { name:'Nashik Road → CBS', value:12 },
    { name:'Others', value:8 },
  ];

  const hourlyData = Array.from({length:12},(_,i) => ({
    hour: `${6+i}:00`,
    exposure: Math.round(8000 + Math.sin(i/3)*5000 + Math.random()*2000),
  }));

  return (
    <>
      <div className="page-header">
        <h1><BarChart3 size={20}/> Analytics & Reporting</h1>
        <div style={{display:'flex',gap:8}}>
          {[{id:'7d',l:'Last 7 Days'},{id:'14d',l:'Last 14 Days'},{id:'30d',l:'Last 30 Days'}].map(r=>(
            <button key={r.id} className={`btn btn-sm ${range===r.id?'btn-primary':'btn-secondary'}`} onClick={()=>setRange(r.id)}>{r.l}</button>
          ))}
          <button className="btn btn-secondary btn-sm"><Download size={14}/> Export Report</button>
        </div>
      </div>
      <div className="page-body fade-in">
        <div className="grid-2" style={{gap:20,marginBottom:20}}>
          {/* Daily Impressions Chart */}
          <div className="card">
            <h3 style={{fontSize:'0.95rem',marginBottom:16}}>Daily Impressions</h3>
            <div style={{height:260}}>
              <ResponsiveContainer>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="gImp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{background:'#1F2937',border:'1px solid #2D3748',borderRadius:8,fontSize:'0.82rem'}} />
                  <Area type="monotone" dataKey="impressions" stroke="#2ECC71" fill="url(#gImp)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impressions by Route (Pie) */}
          <div className="card">
            <h3 style={{fontSize:'0.95rem',marginBottom:16}}>Impressions by Route</h3>
            <div style={{height:260,display:'flex',alignItems:'center'}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" label={({name,percent})=>`${name.split('→')[0].trim()} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{background:'#1F2937',border:'1px solid #2D3748',borderRadius:8,fontSize:'0.82rem'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hourly Exposure */}
        <div className="card" style={{marginBottom:20}}>
          <h3 style={{fontSize:'0.95rem',marginBottom:16}}>Hourly Exposure</h3>
          <div style={{height:220}}>
            <ResponsiveContainer>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{background:'#1F2937',border:'1px solid #2D3748',borderRadius:8,fontSize:'0.82rem'}} />
                <Bar dataKey="exposure" fill="#2ECC71" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Performance Table */}
        <div className="card">
          <div className="card-header">
            <h3>Route Performance</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Route</th><th>Impressions</th><th>Reach</th><th>Cost</th><th>CPM</th><th>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {routePerf.map((r,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>{r.route}</td>
                  <td className="mono">{r.impressions}</td>
                  <td className="mono">{r.reach}</td>
                  <td className="mono">{r.cost}</td>
                  <td className="mono">{r.cpm}</td>
                  <td><span className="mono" style={{color:'var(--transit-green)'}}>{r.efficiency}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
