export const T={primary:"#0B2545",primaryDark:"#071830",primaryMid:"#1A4A7A",primaryLight:"#2563A8",accent:"#38BDF8",accentDark:"#0EA5E9",accentDeep:"#0284C7",accentLight:"#BAE6FD",bgPage:"#EBF6FD",bgTint:"#E0F2FE",bgTint2:"#BAE6FD",white:"#FFFFFF",offwhite:"#F0F9FF",border:"#BFDBEE",borderHov:"#90C4E4",text:"#0B2040",textMid:"#1E4976",textMuted:"#4A7FA5",textLight:"#88B4CC",red:"#DC2626",redTint:"#FEF2F2",green:"#059669",greenTint:"#ECFDF5",greenBorder:"#A7F3D0",amber:"#D97706",amberTint:"#FEF3C7",shadow:"0 1px 4px rgba(11,37,69,.07), 0 6px 20px rgba(11,37,69,.06)",shadowMd:"0 4px 12px rgba(11,37,69,.1), 0 12px 32px rgba(11,37,69,.08)",shadowLg:"0 8px 24px rgba(11,37,69,.14), 0 24px 56px rgba(11,37,69,.1)"};

export const LOCATIONS=[{id:"laxmi",name:"Laxmi Nagar",city:"Mathura",short:"LNM",color:"#0EA5E9"},{id:"raya",name:"Raya",city:"Mathura",short:"RYM",color:"#7C3AED"}];

export const BLOOD_GRP=["A+","A−","B+","B−","O+","O−","AB+","AB−"];
export const GENDERS=["Male","Female","Other"];
export const MARITAL=["Single","Married","Divorced","Widowed"];
export const DISC_ST=["Recovered","Referred","LAMA (Left Against Medical Advice)","Absconded","Expired","Transferred"];
export const PAY_MODES=["Cash","UPI / QR code","Credit card","Debit card","Net banking","NEFT / RTGS","Cheque","Insurance (TPA)","Partial payment"];
export const TPA_LIST=["Star Health","Care Insurance","ICICI Lombard","HDFC ERGO","Niva Bupa","United India","Oriental Insurance","New India Assurance"];
export const TPA_CARD_TYPES=["ECHS","ESI / ESIC","FCI","Ayushman Bharat","Northern Railway"];
// Replace the old SVC_TYPES with this new Master Data
export const MASTER_ROOMS = [
  { title: "GENERAL WARD", code: "RM01", rate: 1500 },
  { title: "SEMI PVT WARD", code: "RM02", rate: 3000 }
];

export const MASTER_CONSULTANTS = [
  { title: "DR. NEERAJ JAI BHAGWAN SHARMA (UROLOGY)", code: "CN003", rate: 700 },
  { title: "DR. G. A. NOMANI (CARDIOLOGY)", code: "CN003", rate: 700 },
  { title: "DR. RAJENDER SINGLA (NEUROLOGY)", code: "CN003", rate: 700 },
  { title: "DR. SURENDRA SHARMA (SURGEON)", code: "CN003", rate: 700 },
  { title: "DR. HARENDRA SINGH (ORTHO)", code: "CN003", rate: 700 },
  { title: "DR. R. K. MITTAL (CHEST PHYSICIAN)", code: "CN003", rate: 700 }
];

export const MASTER_SERVICES = {
  "RADIOLOGY": [
    { title: "USG ABDOMEN", code: "RI020", rate: 544 },
    { title: "CT Scan Whole Abdomen With Contrast", code: "RI070", rate: 3519 },
    { title: "CT Scan Whole Abdomen Without Contrast", code: "RI069", rate: 2346 },
    { title: "NCCT Head/Brain", code: "RI062", rate: 704 },
    { title: "CT Scan Head w/ Contrast", code: "RI063", rate: 1496 },
    { title: "HRCT CHEST", code: "RI065", rate: 1360 },
    { title: "2D ECHO", code: "RI001", rate: 1003 },
    { title: "ECG", code: "CI001", rate: 119 },
    { title: "CBCT", code: "RI086", rate: 1020 },
    { title: "CHEST X-RAY PA", code: "RI034", rate: 156 },
    { title: "X-RAY PARANASAL SINUSES", code: "RI043", rate: 136 }
  ],
  "ICU CARE": [
    { title: "ICU", code: "CC001", rate: 5400 },
    { title: "OXYGEN CHARGES", code: "CC002", rate: 68 },
    { title: "CATHETERIZATION", code: "GP009", rate: 476 },
    { title: "Ventilator charges (Per day)", code: "CC003", rate: 2040 },
    { title: "BIPAP SUPPORT", code: "CC003", rate: 2040 }
  ],
  "GENERAL SERVICES": [
    { title: "DRESSING", code: "GP001", rate: 204 },
    { title: "NEBULISATION CHARGES", code: "CC012", rate: 34 },
    { title: "ELECTRICAL STIMULATION", code: "PT006", rate: 272 },
    { title: "PHYSIOTHERAPY ULTRASONIC", code: "PT005", rate: 204 },
    { title: "PHYSIOTHERAPY HOT PACK", code: "PT007", rate: 204 },
    { title: "LIMB PHYSIOTERAPY", code: "PT002", rate: 204 },
    { title: "CHEST PHYSIOTHERAPY", code: "PT004", rate: 204 },
    { title: "CVP LINE CHARGE", code: "CC011", rate: 3400 }
  ]
};
export const DEPARTMENTS=["General Medicine","Surgery","Orthopaedics","Gynaecology","Paediatrics","Cardiology","ENT","Ophthalmology","Dermatology","Neurology","Urology","Psychiatry","Oncology","Emergency","ICU"];
export const NAV_PAGES=[{id:"patient",label:"Patient Info",icon:"person"},{id:"discharge",label:"Discharge Details",icon:"bed"},{id:"services",label:"Service Charges",icon:"pulse"},{id:"summary",label:"Summary",icon:"receipt"}];

// You can keep the massive CSS string here too
export const CSS = `/* Paste your massive CSS string here from the original file */`;