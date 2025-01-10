export interface updateInstantMeeting {
  instantMeetingLink: string;
  userType: string;
}
export interface AllAppointmentData {
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
  patientAllData?: any;
  time?: any;
  endTime: string;
  startScheduleTime: string;
  staffdata?: any;
}
