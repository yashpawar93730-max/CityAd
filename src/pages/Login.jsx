import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      const nextPath = result.user?.role === 'admin' ? '/admin/dashboard' : '/advertiser/dashboard';
      navigate(nextPath);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:40}}>
            <img src="/logo.png" alt="Nashik TransitAds" style={{width:72,height:72,objectFit:'contain',filter:'brightness(0) invert(1)',opacity:0.95}} />
            <div style={{fontFamily:'Inter',fontWeight:700,fontSize:'1.1rem',color:'#fff'}}>Nashik TransitAds</div>
          </div>
          <h1>Turn Every Bus Into a Moving Billboard with Measurable Impact.</h1>
          <p>Welcome Back!</p>
          <ul className="auth-features">
            <li><Check size={20} /> High Visibility</li>
            <li><Check size={20} /> Massive Reach</li>
            <li><Check size={20} /> Measurable Results</li>
          </ul>
          <div style={{marginTop:28,display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10,maxWidth:520}}>
            {[
              '/busads/WhatsApp Image 2026-05-02 at 5.43.26 AM.jpeg',
              '/busads/WhatsApp Image 2026-05-02 at 5.43.27 AM.jpeg',
              '/busads/WhatsApp Image 2026-05-02 at 5.43.49 AM.jpeg',
              '/busads/WhatsApp Image 2026-05-02 at 5.45.44 AM.jpeg',
            ].map((src, i) => (
              <div
                key={src}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 10px 26px rgba(0,0,0,0.25)',
                  transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                <img
                  src={src}
                  alt={`Nashik bus advertising ${i + 1}`}
                  style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:32}}>
          <img src="/logo.png" alt="Nashik TransitAds" style={{width:56,height:56,objectFit:'contain'}} />
          <span style={{fontFamily:'Inter',fontWeight:700}}>Nashik TransitAds</span>
        </div>
        <h2>Welcome Back!</h2>
        <p className="subtitle">Login to your account</p>
        {error && <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid var(--danger)',borderRadius:8,padding:'10px 14px',marginBottom:16,color:'var(--danger)',fontSize:'0.85rem'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{position:'relative'}}>
              <input type={showPass?'text':'password'} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="button" onClick={()=>setShowPass(!showPass)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text-secondary)'}}>
                {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>
          <div className="form-footer">
            <label style={{display:'flex',alignItems:'center',gap:6,color:'var(--text-secondary)'}}><input type="checkbox" /> Remember me</label>
            <a href="#" style={{color:'var(--transit-green)',fontWeight:500}}>Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop:20,background:'var(--danger)'}}>Login</button>
        </form>
        <div style={{textAlign:'center',margin:'20px 0',color:'var(--text-secondary)',fontSize:'0.85rem'}}>or continue with</div>
        <div style={{display:'flex',gap:12}}>
          <button className="btn btn-secondary" style={{flex:1,justifyContent:'center'}}>Google</button>
          <button className="btn btn-secondary" style={{flex:1,justifyContent:'center'}}>Apple</button>
        </div>
        <p style={{textAlign:'center',marginTop:20,fontSize:'0.88rem',color:'var(--text-secondary)'}}>Don't have an account? <Link to="/signup" style={{color:'var(--transit-green)',fontWeight:600}}>Sign up</Link></p>
        <div style={{marginTop:24,padding:'12px',background:'var(--surface-2)',borderRadius:8,fontSize:'0.78rem',color:'var(--text-secondary)'}}>
          <strong style={{color:'var(--text-primary)'}}>Demo Credentials:</strong><br/>
          Admin: admin@transitads.in / admin123<br/>
          Advertiser: demo@brand.com / demo123
        </div>
      </div>
    </div>
  );
}
