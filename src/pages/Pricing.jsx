import { useState } from 'react';
import { CreditCard, FileText, Download } from 'lucide-react';
import { ROUTES, calculatePrice, calculateImpressions } from '../data/mockData';

export default function Pricing() {
  const [routes] = useState(['R1','R3']);
  const [busCount] = useState(120);
  const [duration] = useState(30);
  const [method, setMethod] = useState('upi');
  const [agreed, setAgreed] = useState(false);

  const price = calculatePrice(routes, busCount, duration);
  const forecast = calculateImpressions(routes, busCount, duration);
  const selectedRoutes = ROUTES.filter(r => routes.includes(r.id));

  return (
    <>
      <div className="page-header">
        <h1><CreditCard size={20}/> Pricing & Payment</h1>
      </div>
      <div className="page-body fade-in">
        <div className="grid-2" style={{gap:24}}>
          {/* Campaign Summary */}
          <div>
            <div className="card" style={{marginBottom:20}}>
              <h3 style={{fontSize:'1rem',marginBottom:16}}>Campaign Summary</h3>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem'}}>
                  <span style={{color:'var(--text-secondary)'}}>Routes</span>
                  <div>{selectedRoutes.map(r=><div key={r.id} style={{textAlign:'right'}}>{r.name}</div>)}</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',borderTop:'1px solid var(--border)',paddingTop:10}}>
                  <span style={{color:'var(--text-secondary)'}}>Buses</span><span className="mono">{busCount} Buses</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',borderTop:'1px solid var(--border)',paddingTop:10}}>
                  <span style={{color:'var(--text-secondary)'}}>Duration</span><span className="mono">{duration} Days</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',borderTop:'1px solid var(--border)',paddingTop:10}}>
                  <span style={{color:'var(--text-secondary)'}}>Est. Impressions</span><span className="mono">{(forecast.low/1e6).toFixed(1)}M – {(forecast.high/1e6).toFixed(1)}M</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.88rem',borderTop:'1px solid var(--border)',paddingTop:10}}>
                  <span style={{color:'var(--text-secondary)'}}>Est. Daily Reach</span><span className="mono">{(forecast.dailyReach/1000).toFixed(0)}K – {(forecast.dailyReach*1.4/1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 style={{fontSize:'1rem',marginBottom:16}}>Invoice Preview</h3>
              <div style={{background:'var(--surface-2)',borderRadius:8,padding:16}}>
                <div className="price-breakdown">
                  <div className="price-row"><span className="label">Base Price (Per Bus / 30 Days)</span><span className="value">₹{price.base.toLocaleString('en-IN')}</span></div>
                  <div className="price-row"><span className="label">Route Multiplier (High Traffic)</span><span className="value">× {price.routeMultiplier}</span></div>
                  <div className="price-row"><span className="label">Route Cost</span><span className="value">₹{price.routeCost.toLocaleString('en-IN')}</span></div>
                  <div className="price-row"><span className="label">Premium Location Charge</span><span className="value">₹{price.premiumLocation.toLocaleString('en-IN')}</span></div>
                  <div className="price-row"><span className="label">Printing & Installation</span><span className="value">₹{price.printingCost.toLocaleString('en-IN')}</span></div>
                  <div className="price-row"><span className="label">Sub Total</span><span className="value">₹{price.subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="price-row"><span className="label">GST (18%)</span><span className="value">₹{price.gst.toLocaleString('en-IN')}</span></div>
                  <div className="price-row total"><span className="label">Total Amount</span><span className="value" style={{color:'var(--transit-green)'}}>₹{price.total.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{marginTop:12}}><Download size={14}/> Download/Proforma Invoice</button>
            </div>
          </div>

          {/* Payment */}
          <div>
            <div className="card">
              <h3 style={{fontSize:'1rem',marginBottom:16}}>Payment Details</h3>
              <div style={{fontSize:'0.78rem',color:'var(--text-secondary)',marginBottom:12}}>⚡ Powered by Razorpay</div>
              
              <h4 style={{fontSize:'0.88rem',marginBottom:12}}>Select Payment Method</h4>
              <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
                {[{id:'upi',label:'UPI'},{id:'netbanking',label:'Net Banking'},{id:'card',label:'Credit/Debit Card'}].map(m=>(
                  <label key={m.id} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:method===m.id?'rgba(46,204,113,0.08)':'var(--surface-2)',border:`1px solid ${method===m.id?'var(--transit-green)':'var(--border)'}`,borderRadius:8,cursor:'pointer',fontSize:'0.9rem'}}>
                    <input type="radio" name="method" checked={method===m.id} onChange={()=>setMethod(m.id)} />
                    {m.label}
                  </label>
                ))}
              </div>

              <div style={{padding:16,background:'var(--surface-2)',borderRadius:8,marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>Amount Payable</span>
                  <span className="mono" style={{fontSize:'1.2rem',fontWeight:700,color:'var(--transit-green)'}}>₹{price.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <label style={{display:'flex',alignItems:'start',gap:8,fontSize:'0.82rem',color:'var(--text-secondary)',marginBottom:16}}>
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{marginTop:3}}/>
                By continuing, you agree to our Terms & Conditions and Refund Policy.
              </label>

              <button className="btn btn-primary btn-block btn-lg" disabled={!agreed} style={{opacity:agreed?1:0.5}}
                onClick={()=>alert('Payment processed successfully! Invoice will be emailed.')}>
                Pay ₹{price.total.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
