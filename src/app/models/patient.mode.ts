export interface Months {
  month: string;
  value: number;
}

export interface CreatePatient {
  id?: number;
  preferredFirstName: string;
  firstName: string;
  lastName: string;
  email: string;
  mrn: number;
  title: string;
  dob: any;
  sex: string;
  gender: string;
  pronouns: string;
  indigenousStatus: string;
  currentStep: number;
  isEmergency?: boolean;
  emergencyName?: string;
  emergencyEmail?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
  emergencyAddress?: string;
  isEdit?: boolean;
}

export interface PatientDataSource {
  addressLine1: string | null;
  addressLine2: string | null;
  alternatePhone: string | null;
  city: string | null;
  concessionType: string | null;
  bloodGroup: string | null;
  alergies: string | null;
  observation: string | null;
  country: string | null;
  created_at: string;
  currentStep: number;
  dob: string;
  email: string;
  mrn: number;
  emailInvoiceTo: string | null;
  expiryDate: string | null;
  firstName: string;
  lastName: string;
  funds: string;
  gender: string | string;
  id: number;
  indigenousStatus: string;
  insuranceLevel: string;
  invoiceExtraInfo: string | null;
  invoiceTo: string | null;
  isDeleted: boolean;
  isPrivateInsurance: boolean;
  medicareNumber: string | null;
  name: string;
  openingBalance: string | null;
  phone: string | null;
  policyNumber: string | null;
  postCode: string | null;
  pronouns: string;
  referenceNumber: string | null;
  referralType: string | null;
  sex: string;
  state: string | null;
  timeZone: string | null;
  title: string;
  updated_at: string;
  isEdit?: boolean;
  highBp?: boolean;
  onInsulin?: boolean;
  fracture?: boolean;
  isEmergency?: boolean;
  emergencyName: string;
  emergencyEmail: string;
  emergencyPhone: string;
  emergencyRelation: string;
  emergencyAddress: string;
  lastChecked: PatientLastChecked;
  image: string;
  status: string;
  notes: string;
}

export interface PatientLastChecked {
  isLastChecked: boolean;
  lastCheckedDate: string;
  practitionerName?: string;
  date?: Date;
}

export interface UpdatePatient {
  addressLine1?: string | null;
  addressLine2?: string | null;
  alternatePhone?: string | null;
  city?: string | null;
  concessionType?: string | null;
  country?: string | null;
  currentStep?: number;
  isEmergency?: boolean;
  dob?: string;
  email?: string;
  mrn?: number;
  emailInvoiceTo?: string | null;
  expiryDate?: string | null;
  firstName?: string;
  funds?: string | null;
  gender?: string | string;
  id?: number;
  indigenousStatus?: string;
  insuranceLevel?: string | null;
  invoiceExtraInfo?: string | null;
  invoiceTo?: string | null;
  isDeleted?: boolean;
  isPrivateInsurance?: boolean;
  medicareNumber?: string | null;
  name?: string;
  openingBalance?: string | null;
  phone?: string | null;
  policyNumber?: string | null;
  postCode?: string | null;
  pronouns?: string;
  referenceNumber?: string | null;
  referralType?: string | null;
  sex?: string;
  state?: string | null;
  timeZone?: string | null;
  title?: string;
  isEdit?: boolean;
}

export interface AppointmentDataSource {
  bp: null | string;
  created_at: string;
  diagnoses: null | string;
  duration: number;
  hr: null | number;
  id: number;
  isClinicalNotes: false;
  isDeleted: false;
  isVitalSigns: false;
  notes: null | string;
  observation: null | string;
  patientId: number;
  presentation: null | string;
  rr: null | number;
  scheduleDate: string;
  scheduleId: number;
  scheduleTime: string;
  spo2: number;
  staffId: number;
  temp: null | number;
  updated_at: string;
  weight: null | string;
  practitionerName: string;
  isMenu: boolean;
  drName?: string;
  scheduleDateTime: Date;
}

export interface UpdateAppointemt {
  id?: number;
  weight?: number;
  bp?: string;
  hr?: number;
  spo2?: number;
  rr?: number;
  temp?: number;
  isVitalSigns?: boolean;
  presentation?: string;
  observation?: string;
  diagnoses?: string;
  notes?: string;
  isClinicalNotes?: boolean;
}

export interface updatePatientProfile {
  id?: number;
  bloodGroup?: string;
  alergies?: string;
  observation?: string;
  highBp?: boolean;
  onInsulin?: boolean;
  fracture?: boolean;
}

export interface FullAge {
  years: number;
  months: number;
  days: number;
}

export interface NewPatientDataSource {
  patientData: PatientDataSource[];
  key: any;
  header: string;
  other: NewPatientDataSource;
}

export interface updateMedicalHistory {
  id: number;
  medicalHistory: string;
}
export interface updateMedicalHistoryComp {
  id?: number;
  medicalHistory?: string;
  color?: string;
  textColor?: string;
}
export interface thresholdData {
  BP: any;
  RR: any;
  Temp: any;
  heartRate: any;
  spo2: any;
}
