import { Link } from 'react-router-dom';
import { MapPin, Upload, BarChart3, Radio, Shield, FileText, Check, Bus, Eye, TrendingUp } from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track live performance, reach, impressions and route-level analytics.' },
  { icon: Radio, title: 'Live Bus Tracking', desc: 'See your ads on live buses with real-time location and route updates.' },
  { icon: Bus, title: 'High Reach Network', desc: 'Access 300+ buses across 10+ high-traffic routes in Nashik city.' },
  { icon: Upload, title: 'Easy Creative Upload', desc: 'Quick upload, auto-validation and preview on actual bus templates.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your campaigns and payments with 24/7 support.' },
  { icon: FileText, title: 'Detailed Reports', desc: 'Download detailed reports and share performance with your team and clients.' },
];

export default function Landing() {
  return (
    <div>
      {/* Nav */}
      <nav className="landing-nav">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <img src="/logo.png" alt="Nashik TransitAds" style={{width:56,height:56,objectFit:'contain'}} />
          <span style={{fontFamily:'Inter',fontWeight:700,fontSize:'1rem'}}>Nashik TransitAds</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:28}}>
          <a href="#features" style={{color:'var(--text-secondary)',fontSize:'0.9rem'}}>Features</a>
          <a href="#how" style={{color:'var(--text-secondary)',fontSize:'0.9rem'}}>How It Works</a>
          <a href="#pricing" style={{color:'var(--text-secondary)',fontSize:'0.9rem'}}>Pricing</a>
          <Link to="/login" style={{color:'var(--text-primary)',fontSize:'0.9rem',fontWeight:600}}>Login</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">Start Campaign</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="tag">#1 Bus Advertising Platform in Nashik</div>
          <h1>Turn Every Bus Into a <span>Moving Billboard</span></h1>
          <p>Plan, launch and track your bus advertising campaigns across Nashik city with real-time analytics and measurable impact.</p>
          <div style={{display:'flex',gap:12}}>
            <Link to="/signup" className="btn btn-primary btn-lg">Start Campaign</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">View Demo</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">50+</div><div className="lbl">Trusted Brands</div></div>
            <div className="hero-stat"><div className="num">320+</div><div className="lbl">Buses Available</div></div>
            <div className="hero-stat"><div className="num">12+</div><div className="lbl">High Reach Routes</div></div>
            <div className="hero-stat"><div className="num">2.5M+</div><div className="lbl">Daily Impressions</div></div>
          </div>
        </div>
        <div className="hero-visual">
          <div style={{position:'relative',maxWidth:520}}>
            <img src="/busads/WhatsApp Image 2026-05-02 at 5.43.49 AM.jpeg" alt="Bus advertising example - Spice Nation" style={{width:'100%',borderRadius:16,border:'1px solid var(--border)',boxShadow:'0 20px 60px rgba(0,0,0,0.4)'}} />
            <div style={{position:'absolute',top:16,right:16,background:'rgba(17,24,39,0.9)',backdropFilter:'blur(8px)',borderRadius:12,padding:'12px 16px',border:'1px solid var(--border)'}}>
              <div style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>Campaign Reach</div>
              <div style={{fontFamily:'JetBrains Mono',fontSize:'1.4rem',fontWeight:700}}>2.4M</div>
              <div style={{fontSize:'0.72rem',color:'var(--transit-green)'}}>+15.6%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section style={{padding:'48px 48px',background:'var(--surface-1)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <p style={{textAlign:'center',fontSize:'0.85rem',color:'var(--text-secondary)',marginBottom:28}}>Trusted by leading brands and agencies — Real campaigns on Nashik CityLink buses</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,maxWidth:1200,margin:'0 auto'}}>
          {[
            {src:'/busads/WhatsApp Image 2026-05-02 at 5.43.26 AM.jpeg',alt:'Goodwill Jewellers Bus Ad'},
            {src:'/busads/WhatsApp Image 2026-05-02 at 5.43.27 AM.jpeg',alt:'Shree Jewellers Bus Ad'},
            {src:'/busads/WhatsApp Image 2026-05-02 at 5.43.49 AM.jpeg',alt:'Spice Nation Bus Ad'},
            {src:'/busads/WhatsApp Image 2026-05-02 at 5.45.44 AM.jpeg',alt:'Skyline Heights Bus Ad'},
          ].map((img,i) => (
            <div key={i} style={{borderRadius:12,overflow:'hidden',border:'1px solid var(--border)',transition:'transform 0.3s,border-color 0.3s',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.borderColor='var(--transit-green)'}} onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.borderColor='var(--border)'}}>
              <img src={img.src} alt={img.alt} style={{width:'100%',height:180,objectFit:'cover',display:'block'}} />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how" style={{background:'var(--surface-1)'}}>
        <div className="section-title">
          <div className="overline">How It Works</div>
          <h2>Simple Steps. Maximum Impact.</h2>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:60,maxWidth:800,margin:'0 auto'}}>
          {[
            { num: 1, icon: MapPin, title: 'Select Routes', desc: 'Choose from high-traffic bus routes and premium locations across Nashik city.' },
            { num: 2, icon: Upload, title: 'Upload Creative', desc: 'Upload your CDR/PDF/PNG files and preview how your ad will look on the bus.' },
            { num: 3, icon: TrendingUp, title: 'Track Performance', desc: 'Launch your campaign and track real-time impressions, reach and performance.' },
          ].map(s => (
            <div key={s.num} style={{textAlign:'center',maxWidth:220}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(46,204,113,0.1)',display:'grid',placeItems:'center',margin:'0 auto 16px',position:'relative'}}>
                <s.icon size={24} color="var(--transit-green)" />
                <span style={{position:'absolute',top:-4,left:-4,width:22,height:22,borderRadius:'50%',background:'var(--transit-green)',color:'#fff',fontSize:'0.7rem',fontWeight:700,display:'grid',placeItems:'center'}}>{s.num}</span>
              </div>
              <h3 style={{fontSize:'1.05rem',marginBottom:6}}>{s.title}</h3>
              <p style={{fontSize:'0.85rem',color:'var(--text-secondary)',lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-title">
          <div className="overline">Our Platform</div>
          <h2>Everything You Need for Successful Campaigns</h2>
        </div>
        <div className="features-grid">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="icon"><f.icon size={22} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-banner">
        <h2>Real Impact. Real Results.</h2>
        <p>Trusted by leading brands across Maharashtra</p>
        <div className="stats-row">
          <div className="stat-item"><div className="stat-num">2.5M+</div><div className="stat-lbl">Daily Impressions</div></div>
          <div className="stat-item"><div className="stat-num">75K+</div><div className="stat-lbl">People Reached Daily</div></div>
          <div className="stat-item"><div className="stat-num">300+</div><div className="stat-lbl">Active Buses</div></div>
          <div className="stat-item"><div className="stat-num">98%</div><div className="stat-lbl">On-Time Campaigns</div></div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="section-title">
          <div className="overline">Flexible Plans</div>
          <h2>Campaigns That Fit Your Goals</h2>
          <p>Choose the best plan for your business and budget.</p>
        </div>
        <div className="plans-grid">
          {[
            { name:'Starter', desc:'Perfect for small businesses and local campaigns', price:'₹15,000', per:'/7 days', items:['10 Buses','1 Route','Estimated Reach 150K+','Standard Support'] },
            { name:'Growth', desc:'Ideal for growing brands and agencies', price:'₹35,000', per:'/15 days', items:['25 Buses','3 Routes','Estimated Reach 500K+','Priority Support'], featured:true },
            { name:'Enterprise', desc:'For large brands and city-wide campaigns', price:'₹75,000', per:'/30 days', items:['50+ Buses','All Premium Routes','Estimated Reach 2M+','Dedicated Support'] },
          ].map(p => (
            <div className={`plan-card ${p.featured ? 'featured' : ''}`} key={p.name}>
              <h3>{p.name}</h3>
              <p className="plan-desc">{p.desc}</p>
              <div className="plan-price">{p.price} <span>{p.per}</span></div>
              <ul>{p.items.map(i => <li key={i}><Check size={16} />{i}</li>)}</ul>
              <Link to="/signup" className={`btn ${p.featured ? 'btn-primary' : 'btn-secondary'} btn-block`}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'linear-gradient(135deg,var(--deep-green),#145A32)',padding:'60px 48px',textAlign:'center'}}>
        <h2 style={{fontSize:'1.8rem',marginBottom:8}}>Ready to put your brand on the move?</h2>
        <p style={{color:'rgba(255,255,255,0.7)',marginBottom:24}}>Launch your bus advertising campaign today and reach thousands of people across Nashik every day.</p>
        <Link to="/signup" className="btn btn-primary btn-lg" style={{background:'#fff',color:'var(--deep-green)'}}>Start Your Campaign</Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{display:'flex',alignItems:'center',gap:8}}><img src="/logo.png" alt="Logo" style={{width:44,height:44,objectFit:'contain'}} /> Nashik TransitAds</h3>
            <p style={{marginTop:8}}>Nashik's leading bus advertising platform helping brands connect with millions on the move.</p>
          </div>
          <div className="footer-col"><h4>Platform</h4><a href="#">Campaigns</a><a href="#">Inventory</a><a href="#">Live Tracking</a><a href="#">Analytics</a></div>
          <div className="footer-col"><h4>Company</h4><a href="#">About Us</a><a href="#">Contact</a><a href="#">Blog</a><a href="#">Careers</a></div>
          <div className="footer-col"><h4>Support</h4><a href="#">Help Center</a><a href="#">Guidelines</a><a href="#">Terms</a><a href="#">Refund Policy</a></div>
          <div className="footer-col"><h4>Contact Us</h4><a href="#">+91 99688-43216</a><a href="#">ads@nashiktransitads.com</a><a href="#">Nashik, Maharashtra, India</a></div>
        </div>
        <div className="footer-bottom">© 2026 Nashik TransitAds. All rights reserved.</div>
      </footer>
    </div>
  );
}
