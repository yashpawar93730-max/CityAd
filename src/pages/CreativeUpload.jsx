import { useState } from 'react';
import { Upload, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CreativeUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('side');

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files[0] || e.target.files?.[0];
    if (f) {
      const ext = f.name.split('.').pop().toUpperCase();
      const valid = ['CDR','PDF','PNG','JPG','JPEG'].includes(ext);
      setFile({
        name: f.name, size: (f.size/1024/1024).toFixed(2) + ' MB',
        format: ext, valid,
        sizeValid: f.size < 10*1024*1024,
        resolution: '3000x1200',
      });
    }
  };

  return (
    <>
      <div className="page-header">
        <h1><Upload size={20}/> Creative Upload</h1>
        <button className="btn btn-secondary btn-sm">Upload Guidelines</button>
      </div>
      <div className="page-body fade-in">
        <div className="grid-2" style={{gap:24}}>
          {/* Upload area */}
          <div>
            <div className="card" style={{marginBottom:20}}>
              <h3 style={{fontSize:'0.95rem',marginBottom:16}}>Upload Creative (CDR, PDF, PNG)</h3>
              <div className="upload-zone" onDragOver={e=>e.preventDefault()} onDrop={handleDrop} onClick={()=>document.getElementById('file-input').click()}>
                <Upload size={48} />
                <p style={{fontSize:'0.95rem',fontWeight:600,marginTop:8}}>Drop & drop your file here</p>
                <p style={{fontSize:'0.82rem'}}>or click to browse</p>
                <input id="file-input" type="file" accept=".cdr,.pdf,.png,.jpg,.jpeg" style={{display:'none'}} onChange={handleDrop} />
              </div>
              <div style={{marginTop:12,fontSize:'0.78rem',color:'var(--text-secondary)'}}>
                Supported: CDR, PDF, PNG | Max File Size: 10MB<br/>
                Recommended Resolution: 3000x1200px
              </div>
            </div>

            {/* Validation */}
            {file && (
              <div className="card">
                <h3 style={{fontSize:'0.95rem',marginBottom:12}}>Validation Status</h3>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'var(--surface-2)',borderRadius:6}}>
                    <span style={{fontSize:'0.85rem'}}>File Size</span>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span className="mono" style={{fontSize:'0.82rem'}}>{file.size}</span>
                      {file.sizeValid ? <span className="badge badge-approved">Valid</span> : <span className="badge badge-rejected">Too Large</span>}
                    </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'var(--surface-2)',borderRadius:6}}>
                    <span style={{fontSize:'0.85rem'}}>Format</span>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span className="mono" style={{fontSize:'0.82rem'}}>{file.format}</span>
                      {file.valid ? <span className="badge badge-approved">Valid</span> : <span className="badge badge-rejected">Invalid</span>}
                    </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'var(--surface-2)',borderRadius:6}}>
                    <span style={{fontSize:'0.85rem'}}>Resolution</span>
                    <span className="mono" style={{fontSize:'0.82rem'}}>{file.resolution}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',background:'var(--surface-2)',borderRadius:6}}>
                    <span style={{fontSize:'0.85rem'}}>Color Mode</span>
                    <span className="mono" style={{fontSize:'0.82rem'}}>CMYK</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-block" style={{marginTop:16}}>Submit for Review</button>
              </div>
            )}
          </div>

          {/* Preview */}
          <div>
            <div className="card">
              <h3 style={{fontSize:'0.95rem',marginBottom:12}}>Preview on Bus</h3>
              <div style={{display:'flex',gap:8,marginBottom:16}}>
                {['side','front','back'].map(v => (
                  <button key={v} className={`btn btn-sm ${preview===v?'btn-primary':'btn-secondary'}`} onClick={()=>setPreview(v)} style={{textTransform:'capitalize'}}>{v} View</button>
                ))}
              </div>
              <div style={{borderRadius:8,overflow:'hidden',border:'1px solid var(--border)',position:'relative',height:220}}>
                <img
                  src={preview==='side' ? '/busads/WhatsApp Image 2026-05-02 at 5.43.26 AM.jpeg'
                    : preview==='front' ? '/busads/WhatsApp Image 2026-05-02 at 5.43.27 AM.jpeg'
                    : '/busads/WhatsApp Image 2026-05-02 at 5.45.44 AM.jpeg'}
                  alt={`Bus ${preview} view preview`}
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                />
                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'8px 12px',background:'linear-gradient(transparent,rgba(0,0,0,0.7))',fontSize:'0.72rem',color:'#fff'}}>
                  {preview.charAt(0).toUpperCase()+preview.slice(1)} View Preview
                </div>
                {file && <div style={{position:'absolute',top:12,right:12,background:'var(--transit-green)',color:'#fff',padding:'4px 10px',borderRadius:4,fontSize:'0.72rem',fontWeight:600}}>Creative Applied</div>}
              </div>

              <div style={{marginTop:20}}>
                <h4 style={{fontSize:'0.9rem',marginBottom:12}}>Creative Status</h4>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.82rem',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{color:'var(--text-secondary)'}}>Submitted On</span>
                    <span>16 May 2026, 11:30 AM</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.82rem',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{color:'var(--text-secondary)'}}>Submitted By</span>
                    <span>{user?.company || 'Advertiser'}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.82rem',padding:'6px 0'}}>
                    <span style={{color:'var(--text-secondary)'}}>Status</span>
                    <span className="badge badge-pending">Pending Approval</span>
                  </div>
                </div>
                <div style={{marginTop:12,padding:12,background:'rgba(245,158,11,0.08)',borderRadius:8,border:'1px solid rgba(245,158,11,0.2)',fontSize:'0.82rem',color:'var(--warning)'}}>
                  ⏳ Our team will review your creative within 24 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
