import { useState } from "react";
import { T, NAV_PAGES } from "./data/constants";
import { LOCATION_DB } from "./data/mockDb";
import { blankPatient, blankDischarge, blankBilling, blankSvc } from "./utils/helpers";
import { Ico, IC, PAGE_ICONS } from "./components/ui/Icons";

// Core Components
import LocationSwitcher from "./components/layout/LocationSwitcher";
import LiveDate from "./components/layout/LiveDate";

// Pages
import SearchPage from "./pages/SearchPage";
import PatientFormPage from "./pages/PatientFormPage";
import DischargePage from "./pages/DischargePage";
import ServicesPage from "./pages/ServicesPage";
import SummaryPage from "./pages/SummaryPage";
import PatientsHistoryPage from "./pages/PatientsHistoryPage";

// Modals
import UHIDScreen from "./modals/UHIDScreen";
import PrintModal from "./modals/PrintModal";
import PatientDetailModal from "./modals/PatientDetailModal";

export default function App() {
  const [locId,setLocId]=useState("laxmi");
  const [page,setPage]=useState("patient");
  const [subPage,setSubPage]=useState("search");
  const [uhid,setUhid]=useState(null);
  const [admNo,setAdmNo]=useState(1);
  const [showUHID,setShowUHID]=useState(false);
  const [isReturning,setIsReturning]=useState(false);
  const [patientDone,setPatientDone]=useState(false);
  const [dischargeDone,setDischargeDone]=useState(false);
  const [servicesDone,setServicesDone]=useState(false);
  const [showPrint,setShowPrint]=useState(false);
  const [showPatientDetail,setShowPatientDetail]=useState(null);
  
  const [patient,setPatient]=useState(blankPatient());
  const [discharge,setDischarge]=useState(blankDischarge());
  const [svcs,setSvcs]=useState([blankSvc()]);
  const [billing,setBilling]=useState(blankBilling());
  const [errs,setErrs]=useState({});
  
  // CHANGED: We now use setDb so we can save the Expected Discharge Dates
  const [db, setDb]=useState(JSON.parse(JSON.stringify(LOCATION_DB)));

  const currentDb=db[locId];

const resetAll=()=>{setPage("patient");setSubPage("search");setUhid(null);setShowUHID(false);setPatientDone(false);setDischargeDone(false);setServicesDone(false);setPatient(blankPatient());setDischarge(blankDischarge());setSvcs([]);setBilling(blankBilling());setErrs({});};
  const switchLoc=id=>{setLocId(id);resetAll();setShowPatientDetail(null);};
  
  // NEW: Completely clears the dashboard to register a new patient
  const endSession=()=>{ resetAll(); };

  // NEW: Syncs live updates to the History Database!
  const syncDb = (currentUhid, currentAdmNo, dataKey, dataValue) => {
    setDb(prev => {
      const nextDb = JSON.parse(JSON.stringify(prev));
      const p = nextDb[locId].find(x => x.uhid === currentUhid);
      if(p) {
        const a = p.admissions.find(x => x.admNo === currentAdmNo);
        if(a) a[dataKey] = dataValue;
      }
      return nextDb;
    });
  };

  const handleNewAdmission=existing=>{
    const{admissions,...pd}=existing; setPatient(pd); setUhid(existing.uhid); 
    const newAdmNo = existing.admissions.length+1; setAdmNo(newAdmNo); setIsReturning(true); setShowUHID(true);
    
    // Instantly add blank admission to DB History
    setDb(prev => {
      const nextDb = JSON.parse(JSON.stringify(prev));
      const p = nextDb[locId].find(x => x.uhid === existing.uhid);
      p.admissions.push({ admNo: newAdmNo, dateTime: new Date().toISOString(), discharge: blankDischarge(), services: [], billing: blankBilling() });
      return nextDb;
    });
  };

  const handleDischargeFromHistory=(patientObj,admObj)=>{
    const{admissions,...pd}=patientObj; setPatient(pd); setUhid(patientObj.uhid); setAdmNo(admObj.admNo); setIsReturning(true);
    setDischarge({...blankDischarge(),...(admObj.discharge||{})}); setSvcs(admObj.services&&admObj.services.length?admObj.services:[]); setBilling({...blankBilling(),...(admObj.billing||{})});
    setPatientDone(true); setDischargeDone(false); setServicesDone(false); setShowPatientDetail(null); setShowUHID(false); setPage("discharge");
  };

  const handleGenerateBillFromHistory=(patientObj,admObj)=>{
    const{admissions,...pd}=patientObj; setPatient(pd); setUhid(patientObj.uhid); setAdmNo(admObj.admNo); setIsReturning(true);
    setDischarge({...blankDischarge(),...(admObj.discharge||{})}); setSvcs(admObj.services&&admObj.services.length?admObj.services:[]); setBilling({...blankBilling(),...(admObj.billing||{})});
    setPatientDone(true); setDischargeDone(true); setServicesDone(false); setShowPatientDetail(null); setShowUHID(false); setPage("services");
  };

  const handleSetExpectedDod=(uhidToUpdate, admNoToUpdate, date)=>{
    setDb(prev => {
      const nextDb = JSON.parse(JSON.stringify(prev));
      nextDb[locId].forEach(p => { if (p.uhid === uhidToUpdate) p.admissions.forEach(a => { if (a.admNo === admNoToUpdate) { if (!a.discharge) a.discharge = {}; a.discharge.expectedDod = date; }});});
      return nextDb;
    });
  };

  const validatePatient=()=>{
    const e={}; if(!patient.patientName.trim())e.patientName="Required"; if(!patient.guardianName.trim())e.guardianName="Required"; if(!patient.gender)e.gender="Required"; if(!patient.phone||patient.phone.replace(/\D/g,"").length!==10)e.phone="Must be 10 digits"; if(!patient.email||!patient.email.includes("@"))e.email="Valid email required"; if(!patient.nationalId.trim())e.nationalId="Required"; if(!patient.address.trim())e.address="Required"; setErrs(e); return !Object.keys(e).length;
  };

  const handleRegister=()=>{
    if(!validatePatient())return;
    const newUhid = "UHID-"+Math.floor(1000000+Math.random()*9000000);
    setUhid(newUhid); setAdmNo(1); setIsReturning(false); setShowUHID(true);
    
    // Instantly add new patient to DB History!
    const newPat = { ...patient, uhid: newUhid, admissions: [{ admNo: 1, dateTime: new Date().toISOString(), discharge: blankDischarge(), services: [], billing: blankBilling() }]};
    setDb(prev => ({ ...prev, [locId]: [newPat, ...prev[locId]] }));
  };

  const handleUHIDContinue=()=>{setPatientDone(true);setShowUHID(false);setPage("discharge");};
  const handleUHIDDashboard=()=>{setPatientDone(true);setShowUHID(false);setPage("patient");setSubPage("search");};
  const handleUHIDNewPatient=()=>{ endSession(); setSubPage("form"); };
  
  // Save actions now update the DB instantly
  const handleSaveDischarge=()=>{ syncDb(uhid, admNo, 'discharge', discharge); setDischargeDone(true); setPage("services"); };
  const handleSaveServices=(updatedSvcs, updatedBilling)=>{ 
    setSvcs(updatedSvcs); setBilling(updatedBilling); 
    syncDb(uhid, admNo, 'services', updatedSvcs); syncDb(uhid, admNo, 'billing', updatedBilling); 
    setServicesDone(true); setPage("summary"); 
  };

  const canNav=id=>({patient:true,discharge:patientDone,services:patientDone&&dischargeDone,summary:patientDone&&dischargeDone&&servicesDone}[id]||false);
  const isDone=id=>({patient:patientDone,discharge:dischargeDone,services:servicesDone}[id]||false);
  const navTo=id=>{if(!canNav(id))return;setShowUHID(false);setPage(id);};

  return(<>
    <style dangerouslySetInnerHTML={{__html:CSS}}/>
    {showPrint&&<PrintModal uhid={uhid} patient={patient} discharge={discharge} svcs={svcs} billing={billing} locId={locId} admNo={admNo} onClose={()=>setShowPrint(false)}/>}
    {showPatientDetail&&<PatientDetailModal patient={showPatientDetail} onClose={()=>setShowPatientDetail(null)} onDischarge={handleDischargeFromHistory}/>}
    
    <header className="hdr">
      <div className="hdr-left"><div className="hdr-logo"><Ico d={IC.cross} size={18} sw={2}/></div><div><p className="hdr-name">Sangi Hospital</p><p className="hdr-sub">IPD Portal</p></div></div>
      <LocationSwitcher locId={locId} setLocId={switchLoc} />
      <div className="hdr-right">
        {uhid&&<div className="hdr-uhid"><span className="hdr-uhid-label">UHID</span>{uhid}</div>}
        <LiveDate/>
      </div>
    </header>

    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-section-label">Registration Steps</div>
          {NAV_PAGES.map((p,i)=>{
            const locked=!canNav(p.id); const active=page===p.id&&!showUHID; const done=isDone(p.id);
            return(
              <div key={p.id} className={`nav-item${active?" active":""}${done&&!active?" done":""}${locked?" locked":""}`} onClick={()=>navTo(p.id)}>
                <div className="nav-icon">{locked?<Ico d={IC.lock} size={15} sw={2}/>:<Ico d={PAGE_ICONS[p.icon]} size={15} sw={2}/>}</div>
                <span className="nav-label">{p.label}</span>
                <span className="nav-step-num">{done?<Ico d={IC.check} size={10} sw={2.5}/>:i+1}</span>
              </div>
            );
          })}
          <div className="sidebar-divider"/>
          <div className="sidebar-section-label" style={{marginTop:8}}>Records</div>
          <div className={`sidebar-hist-item${page==="history"?" active":""}`} onClick={()=>{setShowUHID(false);setPage("history");}}>
            <div className="sidebar-hist-icon"><Ico d={IC.users} size={15} sw={2}/></div>
            <span className="sidebar-hist-label">Patients History</span>
          </div>
        </div>
        {uhid&&(
          <div className="sidebar-bottom">
            <div className="uhid-card" style={{marginBottom: 12}}>
              <div className="uhid-card-label">Current UHID</div>
              <div className="uhid-card-val">{uhid}</div>
              <div className="uhid-card-sub">{patient.patientName||"Patient"}{admNo>1?` · Adm #${admNo}`:""}</div>
            </div>
            <button onClick={endSession} style={{width: "100%", padding: "10px", borderRadius: "10px", background: T.redTint, color: T.red, border: `1px solid ${T.red}`, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"}}>
              <Ico d={IC.cross} size={14} sw={2.5}/> Close Patient
            </button>
          </div>
        )}
      </aside>
      
      <main className="main" key={page+showUHID+subPage+locId}>
        {page==="patient"&&!showUHID&&subPage==="search"&&<SearchPage db={currentDb} locId={locId} onNewAdmission={handleNewAdmission} onNewPatient={()=>setSubPage("form")}/>}
        {page==="patient"&&!showUHID&&subPage==="form"&&<PatientFormPage data={patient} setData={setPatient} onSubmit={handleRegister} errs={errs} onBack={()=>setSubPage("search")}/>}
        {page==="patient"&&showUHID&&<UHIDScreen uhid={uhid} patient={patient} isReturning={isReturning} admNo={admNo} onContinue={handleUHIDContinue} onDashboard={handleUHIDDashboard} onNewPatient={handleUHIDNewPatient}/>}
        {page==="discharge"&&<DischargePage data={discharge} setData={setDischarge} onSave={handleSaveDischarge}/>}
        {page==="services"&&<ServicesPage svcs={svcs} setSvcs={setSvcs} billing={billing} setBilling={setBilling} onSave={handleSaveServices}/>}
        {page==="summary"&&<SummaryPage uhid={uhid} patient={patient} discharge={discharge} svcs={svcs} billing={billing} locId={locId} admNo={admNo} onPrint={()=>setShowPrint(true)}/>}
        
        {/* WE PASSED THE NEW PROPS HERE */}
        {page==="history"&&<PatientsHistoryPage db={currentDb} locId={locId} onBack={()=>setPage("patient")} onDischarge={handleDischargeFromHistory} onGenerateBill={handleGenerateBillFromHistory} onSetExpectedDod={handleSetExpectedDod} onViewPatient={p=>setShowPatientDetail(p)}/>}
      </main>
    </div>
  </>);
}