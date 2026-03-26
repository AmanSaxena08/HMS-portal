import { T, LOCATIONS } from "../data/constants";
import { Ico, IC } from "../components/ui/Icons";

export default function PrintModal({uhid,patient,discharge,svcs,billing,locId,admNo,onClose}){
  const total=svcs.reduce((a,s)=>a+(parseFloat(s.rate)||0)*(parseInt(s.qty)||0),0);
  const disc=parseFloat(billing.discount)||0;const adv=parseFloat(billing.advance)||0;const paid=parseFloat(billing.paidNow)||0;const net=Math.max(0,total-disc-adv-paid);
  
  const today=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"2-digit",year:"numeric"});
  const nowTime=new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:false});
  const loc=LOCATIONS.find(l=>l.id===locId) || { name: "Sangi" };

  // MOCK DATA: Just to show 'mam' how the real backend data will look
  const mockIpdNo = `SH/${patient.tpa ? patient.tpa.substring(0,4).toUpperCase() : 'GEN'}/26/${1900 + admNo}`;
  const mockBillNo = `${1900 + admNo}/26`;
  const mockClaimId = "42092669 (Mock)";

  // Reusable styling for the physical paper grid look
  const cellStyle = { border: "1px solid #000", padding: "6px 10px", fontSize: "12px", borderTop: "none", borderLeft: "none" };
  const lblStyle = { fontWeight: "600", marginRight: "6px" };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(11,37,69,.8)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"28px 20px",overflowY:"auto"}}>
      <div style={{background:"#fff",maxWidth:850,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.35)"}}>
        
        {/* Action Bar (This part hides when printing) */}
        <div className="no-print" style={{display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"14px 22px",borderBottom:`1px solid ${T.border}`,background:T.offwhite}}>
          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-print" onClick={()=>window.print()}><Ico d={IC.print} size={14} sw={2}/> Print</button>
            <button className="btn btn-ghost" onClick={onClose}>✕ Close</button>
          </div>
        </div>

        {/* Physical Paper Area */}
        <div style={{padding:"40px", color:"#000", fontFamily:"Arial, sans-serif"}}>
          
          {/* Header Layout matching the photo */}
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"10px", marginBottom:"5px"}}>
             <div style={{fontSize:"14px", fontWeight:"bold", textAlign:"center"}}>
               <span style={{color:"#1a5b8c", textDecoration:"underline"}}>{today}</span><br/>FINAL BILL
             </div>
             <div style={{textAlign:"right"}}>
                <h1 style={{color:"#1a5b8c", margin:0, fontSize:"36px", fontFamily:"Arial Black, sans-serif", letterSpacing:"1px"}}>SANGi</h1>
                <h2 style={{color:"#d93838", margin:0, fontSize:"18px", letterSpacing:"3px"}}>HOSPITAL</h2>
                
                {/* ---> HERE IS YOUR UPDATED LINE! <--- */}
                <div style={{fontSize:12,color:T.textMuted,display:"flex",alignItems:"center",justifyContent:"flex-end",gap:5,marginTop:4}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:loc?.color||"#000",display:"inline-block"}}/>
                  {loc?.name} Branch · Mathura, Uttar Pradesh
                </div>

             </div>
          </div>

          {/* Patient Details Grid (2 Columns, solid black borders) */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>
             <div style={cellStyle}><span style={lblStyle}>IPD No. :</span> {mockIpdNo}</div>
             <div style={cellStyle}><span style={lblStyle}>Bill No. :</span> {mockBillNo}</div>

             <div style={cellStyle}><span style={lblStyle}>Patient Name :</span> {patient.patientName?.toUpperCase()}</div>
             <div style={cellStyle}><span style={lblStyle}>Bill Date :</span> {today} {nowTime} HRS</div>

             <div style={cellStyle}><span style={lblStyle}>Guardian Name :</span> {patient.guardianName?.toUpperCase()}</div>
             <div style={cellStyle}><span style={lblStyle}>Age/Sex :</span> {patient.ageYY} YRS / {patient.gender?.toUpperCase()}</div>

             <div style={cellStyle}><span style={lblStyle}>Address :</span> {patient.address?.toUpperCase()}</div>
             <div style={cellStyle}><span style={lblStyle}>Card No. :</span> {patient.tpaCard || patient.tpaPanelCardNo || "—"}</div>

             <div style={cellStyle}><span style={lblStyle}>Consultant :</span> {discharge.doctorName?.toUpperCase() || "—"}</div>
             <div style={cellStyle}><span style={lblStyle}>Room :</span> {discharge.wardName?.toUpperCase() || "—"} / {discharge.roomNo || "—"}</div>

             <div style={cellStyle}><span style={lblStyle}>Claim ID :</span> {mockClaimId}</div>
             <div style={cellStyle}><span style={lblStyle}>Panel :</span> {patient.tpa?.toUpperCase() || "CASH"}</div>

             <div style={cellStyle}><span style={lblStyle}>DOA & Time :</span> {discharge.doa ? new Date(discharge.doa).toLocaleString('en-IN') : "—"}</div>
             <div style={cellStyle}><span style={lblStyle}>Contact No. :</span> {patient.phone}</div>

             <div style={cellStyle}><span style={lblStyle}>DOD & Time :</span> {discharge.dod ? new Date(discharge.dod).toLocaleString('en-IN') : "—"}</div>
             <div style={cellStyle}><span style={lblStyle}>Status on Discharge :</span> {discharge.dischargeStatus?.toUpperCase() || "—"}</div>
          </div>

          {/* Charges Table */}
          <table style={{width:"100%", borderCollapse:"collapse", marginTop:"20px", border:"1px solid #000"}}>
            <thead>
              <tr>
                {["Sr No.", "Date", "CGHS Code", "Description", "Quantity", "Rate", "Amount"].map(h => (
                  <th key={h} style={{border:"1px solid #000", padding:"8px", textAlign:"left", fontSize:"12px", background:"#f9f9f9"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {svcs.map((s, i) => (
                <tr key={i}>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{i+1}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{today}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{s.code || "—"}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{s.title || s.type || "—"}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{s.qty || 1}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{parseFloat(s.rate||0).toFixed(2)}</td>
                  <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px"}}>{((parseFloat(s.rate)||0)*(parseInt(s.qty)||0)).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="6" style={{border:"1px solid #000", padding:"8px", fontSize:"12px", textAlign:"right", fontWeight:"bold"}}>Gross Total:</td>
                <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px", fontWeight:"bold"}}>{total.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="6" style={{border:"1px solid #000", padding:"8px", fontSize:"12px", textAlign:"right", fontWeight:"bold"}}>Discount:</td>
                <td style={{border:"1px solid #000", padding:"8px", fontSize:"12px", fontWeight:"bold"}}>- {disc.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="6" style={{border:"1px solid #000", padding:"8px", fontSize:"12px", textAlign:"right", fontWeight:"bold"}}>Net Payable Amount:</td>
                <td style={{border:"1px solid #000", padding:"8px", fontSize:"14px", fontWeight:"bold"}}>{net.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div style={{marginTop: "50px", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "bold"}}>
            <div style={{textAlign: "center"}}>______________________<br/><br/>Cashier Signature</div>
            <div style={{textAlign: "center"}}>______________________<br/><br/>Patient / Attendant Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}