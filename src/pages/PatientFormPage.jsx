import { T, GENDERS, MARITAL, BLOOD_GRP, TPA_LIST, TPA_CARD_TYPES } from "../data/constants";
import { Ico, IC } from "../components/ui/Icons";
import { Card, Inp, Sel, Txta, Field } from "../components/ui/SharedUI";

export default function PatientFormPage({data,setData,onSubmit,errs,onBack}){
  const set=k=>e=>setData(p=>({...p,[k]:e.target.value}));
  const handleDob=e=>{
    const dob=e.target.value;
    if(!dob){setData(p=>({...p,dob:"",ageYY:"",ageMM:"",ageDD:""}));return;}
    const today=new Date();const birth=new Date(dob);
    let yy=today.getFullYear()-birth.getFullYear(); let mm=today.getMonth()-birth.getMonth(); let dd=today.getDate()-birth.getDate();
    if(dd<0){mm--;dd+=new Date(today.getFullYear(),today.getMonth(),0).getDate();}
    if(mm<0){yy--;mm+=12;}
    setData(p=>({...p,dob,ageYY:String(yy),ageMM:String(mm),ageDD:String(dd)}));
  };

  return(<div className="form-page">
    <div className="page-hd"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}><div><h1>New Patient Registration</h1><p>Fill in all details to register and generate a UHID</p></div><button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Search</button></div></div>
    <Card icon={IC.person} title="Personal Details" subtitle="Core identity and demographic information" delay={0}>
      <div className="g2">
        <Inp label="Patient Name" req placeholder="Full legal name" value={data.patientName} onChange={set("patientName")} err={errs.patientName}/>
        <Inp label="Guardian Name" req placeholder="Guardian / relative's name" value={data.guardianName} onChange={set("guardianName")} err={errs.guardianName}/>
        <Sel label="Gender" req opts={GENDERS} placeholder="Select gender" value={data.gender} onChange={set("gender")} err={errs.gender}/>
        <Sel label="Marital Status" opts={MARITAL} placeholder="Select status" value={data.maritalStatus} onChange={set("maritalStatus")}/>
        <Sel label="Blood Group" opts={BLOOD_GRP} placeholder="Select blood group" value={data.bloodGroup} onChange={set("bloodGroup")}/>
        <Inp label="Date of Birth" type="date" value={data.dob} onChange={handleDob}/>
      </div>
      <div className="div-lbl mt">Age <span style={{fontSize:10,fontWeight:400,color:T.textLight,textTransform:"none",letterSpacing:0}}>(auto-filled from DOB)</span></div>
      <div className="g3">
        <Inp label="Years" placeholder="YY" type="number" value={data.ageYY} onChange={set("ageYY")}/>
        <Inp label="Months" placeholder="MM" type="number" value={data.ageMM} onChange={set("ageMM")}/>
        <Inp label="Days" placeholder="DD" type="number" value={data.ageDD} onChange={set("ageDD")}/>
      </div>
    </Card>
    <Card icon={IC.phone} title="Contact Information" subtitle="Phone, email and address" delay={0.04}>
      <div className="g2">
        <Inp label="Phone Number" req type="tel" placeholder="10-digit mobile" value={data.phone} onChange={set("phone")} err={errs.phone}/>
        <Inp label="Alternate Number" type="tel" placeholder="10-digit alternate" value={data.altPhone} onChange={set("altPhone")}/>
        <Inp label="Email Address" req type="email" placeholder="patient@email.com" value={data.email} onChange={set("email")} err={errs.email}/>
        <Inp label="National ID" req placeholder="Aadhar / PAN / Passport" value={data.nationalId} onChange={set("nationalId")} err={errs.nationalId}/>
        <div className="s2"><Field label="Residential Address" req err={errs.address}><textarea className={`ctrl${errs.address?" err":""}`} rows={2} placeholder="Full address with city, state and PIN code" value={data.address} onChange={set("address")}/></Field></div>
      </div>
    </Card>
    <Card icon={IC.file} title="Remarks & Allergies" subtitle="Additional notes for treating team" delay={0.08}>
      <div className="g2">
        <Txta label="Remarks / Notes" placeholder="Any additional notes…" value={data.remarks} onChange={set("remarks")} rows={3}/>
        <Txta label="Known Allergies" placeholder="Drug, food or other known allergies…" value={data.allergies} onChange={set("allergies")} rows={3}/>
      </div>
    </Card>
    <div className="g2">
      <Card icon={IC.shield} title="TPA Details" subtitle="Insurance panel — Optional" delay={0.12}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <Sel label="Insurance Panel (TPA)" opts={TPA_LIST} placeholder="Select panel" value={data.tpa} onChange={set("tpa")}/>
          <Inp label="Card No." placeholder="TPA card number" value={data.tpaCard} onChange={set("tpaCard")}/>
          <Inp label="Validity Date" type="date" value={data.tpaValidity} onChange={set("tpaValidity")}/>
        </div>
      </Card>
      <Card icon={IC.id} title="Panel Card" subtitle="Govt. / scheme card — Optional" delay={0.14}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <Sel label="Card Type" opts={TPA_CARD_TYPES} placeholder="Select card type" value={data.tpaCardType} onChange={set("tpaCardType")}/>
          <Inp label="Card No." placeholder="Panel card number" value={data.tpaPanelCardNo} onChange={set("tpaPanelCardNo")}/>
          <Inp label="Validity Date" type="date" value={data.tpaPanelValidity} onChange={set("tpaPanelValidity")}/>
        </div>
      </Card>
    </div>
    <div className="btn-row"><button className="btn btn-accent" onClick={onSubmit}><Ico d={IC.check} size={15} sw={2.5}/> Register &amp; Generate UHID</button></div>
  </div>);
}