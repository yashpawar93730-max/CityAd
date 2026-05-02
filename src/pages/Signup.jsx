import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', password:'', confirm:'' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (k, v) => setForm(p => ({...p, [k]: v}));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    signup(form);
    navigate('/advertiser/dashboard');
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
        </div>
      </div>
      <div className="auth-right" style={{width:520,overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
          <img src="/logo.png" alt="Nashik TransitAds" style={{width:56,height:56,objectFit:'contain'}} />
          <span style={{fontFamily:'Inter',fontWeight:700}}>Nashik TransitAds</span>
        </div>
        <h2>Create Your Account</h2>
        <p className="subtitle">Sign up and start advertising on the move</p>
        {error && <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid var(--danger)',borderRadius:8,padding:'10px 14px',marginBottom:16,color:'var(--danger)',fontSize:'0.85rem'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name</label><input placeholder="Enter your full name" value={form.name} onChange={e=>update('name',e.target.value)} required /></div>
          <div className="form-group"><label>Email Address</label><input type="email" placeholder="Enter your email" value={form.email} onChange={e=>update('email',e.target.value)} required /></div>
          <div className="form-group"><label>Phone Number</label><input placeholder="Enter your phone number" value={form.phone} onChange={e=>update('phone',e.target.value)} /></div>
          <div className="form-group"><label>Company Name</label><input placeholder="Enter your company name" value={form.company} onChange={e=>update('company',e.target.value)} /></div>
          <div className="form-group"><label>Password</label><input type="password" placeholder="Create a password" value={form.password} onChange={e=>update('password',e.target.value)} required /></div>
          <div className="form-group"><label>Confirm Password</label><input type="password" placeholder="Repeat your password" value={form.confirm} onChange={e=>update('confirm',e.target.value)} required /></div>
          <label style={{display:'flex',alignItems:'start',gap:8,fontSize:'0.82rem',color:'var(--text-secondary)',margin:'12px 0'}}><input type="checkbox" required style={{marginTop:3}} /> I agree to the Terms & Conditions and Privacy Policy</label>
          <button type="submit" className="btn btn-primary btn-block btn-lg" style={{background:'var(--danger)'}}>Sign Up</button>
        </form>
        <div style={{textAlign:'center',margin:'16px 0',color:'var(--text-secondary)',fontSize:'0.85rem'}}>or sign up with</div>
        <div style={{display:'flex',gap:12}}>
          <button className="btn btn-secondary" style={{flex:1,justifyContent:'center'}}>Google</button>
          <button className="btn btn-secondary" style={{flex:1,justifyContent:'center'}}>Apple</button>
        </div>
        <p style={{textAlign:'center',marginTop:16,fontSize:'0.88rem',color:'var(--text-secondary)'}}>Already have an account? <Link to="/login" style={{color:'var(--transit-green)',fontWeight:600}}>Login</Link></p>
      </div>
    </div>
  );
}
