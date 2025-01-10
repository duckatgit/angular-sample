import { AppointmentDataSource, updatePatientProfile } from './patient.mode';

export interface AppointmentDialog {
  appointmentData: AppointmentDataSource;
  recieveData: any;
}

export interface PatientProfileDialog {
  patientProfileData: updatePatientProfile;
}
