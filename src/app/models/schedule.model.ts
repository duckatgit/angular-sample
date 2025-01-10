import { PracticeStaff } from './setting.model';

export interface CreateAppointmentDialog {
  practitionerData: PracticeStaff[];
  id?: number;
  date?: string;
  idEdit?: boolean;
}

export interface SchedulerData {
  id?: number;
  label: string;
  dateStart: Date;
  class?: string;
  status?: string;
  backgroundColor?: string;
  backgroundColorClass?: string;
  staffId?: number;
  disableResize?: boolean;
  img: string;
  duration: any;
  itemType: any;
}

export interface SchedulerViews {
  type: string;
  hideWeekend?: boolean;
}

export interface AppointmentData {
  duration: number;
  id?: number;
  isDeleted?: boolean;
  isPatientNotifyViaSms: boolean;
  isPractitionerNotifyViaEmail: boolean;
  isPractitionerNotifyViaSms: boolean;
  notes: string;
  patientEmail?: string;
  patientsdata?: any;
  patientId?: number;
  patientName?: string;
  patientPhone?: string;
  procedures: string;
  scheduleDate: string;
  scheduleTime: string;
  staffId: number;
  title: string;
  type: string;
  isNew?: boolean;
  streamId?: string;
  roomId?: string;
  streamName?: string;
  meetingLink?: string;
}

export interface PatientData {
  created_at: string;
  email: string;
  id: number;
  isDeleted: boolean;
  name: string;
  phone: string;
  updated_at: string;
  status: boolean;
  dob?: string;
  firstName: string;
  lastName: string;
}

export interface patientDataMain {
  addressLine1: string;
  addressLine2: string;
  alergies: any;
  alternatePhone: string;
  bloodGroup: string;
  city: string;
  concessionType: string;
  country: string;
  created_at: string;
  currentStep: number;
  dob: string;
  email: string;
  emailInvoiceTo: string;
  emergencyAddress: string;
  emergencyEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  expiryDate: string;
  firstName: string;
  fracture: boolean;
  funds: string;
  gender: string;
  highBp: boolean;
  id: number;
  image: string;
  indigenousStatus: string;
  insuranceLevel: any;
  invoiceExtraInfo: string;
  invoiceTo: string;
  isDeleted: boolean;
  isEmergency: boolean;
  isPrivateInsurance: boolean;
  lastChecked: any;
  lastName: string;
  medicalHistory: any;
  medicareNumber: string;
  mrn: string;
  name: string;
  observation: any;
  onInsulin: boolean;
  openingBalance: string;
  phone: string;
  policyNumber: any;
  postCode: string;
  pronouns: string;
  referenceNumber: string;
  referralType: string;
  sex: string;
  state: string;
  status: string;
  timeZone: string;
  title: string;
  updated_at: string;
  vitalsThresholds: any;
  notes: any;
  documents: any;
}

export interface DeleteNotes {
  patientId: number;
  notesId: number;
}

export interface UpdateAppointment {
  created_at?: string;
  duration: number;
  id: number;
  isDeleted?: boolean;
  isPatientNotifyViaSms: boolean;
  isPractitionerNotifyViaEmail: boolean;
  isPractitionerNotifyViaSms: boolean;
  notes: string;
  patientEmail?: string;
  patientId?: number;
  patientName?: string;
  patientPhone?: string;
  procedures: string;
  scheduleDate: string;
  scheduleTime: string;
  staffId: number;
  title: string;
  type: string;
  updated_at?: string;
}

export interface UpdateAppointmentDate {
  id: number;
  newDate: string;
}

export interface CreateConferenceRoom {
  streamId: string;
  status: string;
  playListStatus: string;
  type: string;
  name: string;
}

export interface ConferenceData {
  absoluteStartTimeMs?: number;
  altitude?: null | any;
  bitrate?: number;
  category?: null | any;
  currentPlayIndex?: number;
  dashViewerCount?: number;
  dashViewerLimit?: number;
  date?: number;
  description?: string | null;
  duration?: number;
  endPointList?: null | string;
  expireDurationMS?: number;
  hlsViewerCount?: number;
  hlsViewerLimit?: number;
  ipAddr?: null | string;
  is360?: boolean;
  latitude?: null;
  listenerHookURL?: null | string;
  longitude?: null | string;
  mainTrackStreamId?: null | string;
  metaData?: string;
  mp4Enabled?: number;
  name?: string;
  originAdress?: string;
  password?: null | string;
  pendingPacketSize?: number;
  plannedEndDate?: number;
  plannedStartDate?: number;
  playListItemList?: null | string;
  playListStatus?: string;
  playlistLoopEnabled?: boolean;
  publicStream?: boolean;
  publish?: boolean;
  publishType?: null | string;
  quality?: null | any;
  receivedBytes?: number;
  rtmpURL?: string;
  rtmpViewerCount?: number;
  speed?: number;
  startTime?: number;
  status?: string;
  streamId?: string;
  streamUrl?: null | string;
  subFolder?: string;
  subTrackStreamIds?: [];
  type?: string;
  updateTime?: number;
  userAgent?: string;
  username?: string | null;
  webMEnabled?: number;
  zombi?: boolean;
}

export interface SuggestionsData {
  name: string;
  color: string;
  textColor: string;
}
