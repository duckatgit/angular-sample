import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResonse } from '../models/common.model';
import {
  CreatePatient,
  UpdateAppointemt,
  UpdatePatient,
  updateMedicalHistory,
  updateMedicalHistoryComp,
} from '../models/patient.mode';
import { UpdateStatus } from '../models/setting.model';
import { HttpService } from './http.service';
import { DeleteNotes } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  apiUrl = environment.apiUrl;

  constructor(public httpService: HttpService) {}

  getPatients(): Promise<BaseResonse> {
    return this.httpService.get(`api/patient/get-patient`);
  }

  createPatient(data: CreatePatient): Promise<BaseResonse> {
    return this.httpService.post(`api/patient/create-patient`, data);
  }

  getPatientById(id: number): Promise<BaseResonse> {
    return this.httpService.get(`api/patient/get-patient-by-id/${id}`);
  }

  updatePatient(data: UpdatePatient): Promise<BaseResonse> {
    return this.httpService.put(`api/patient/update-patient`, data);
  }

  updateStatus(data: UpdateStatus): Promise<BaseResonse> {
    return this.httpService.patch(`api/patient/update-patient-status`, data);
  }

  getApointmentByID(id: number): Promise<BaseResonse> {
    return this.httpService.get(`api/appointment/get-appointments/${id}`);
  }

  updatePatientAppointment(
    data: updateMedicalHistoryComp
  ): Promise<BaseResonse> {
    return this.httpService.put(
      `api/appointment/update-appointment-details`,
      data
    );
  }

  updateHistory(data: updateMedicalHistory): Promise<BaseResonse> {
    return this.httpService.patch(`api/patient/update-medical-history`, data);
  }

  getRecentPatientList(): Promise<BaseResonse> {
    return this.httpService.get(`api/patient/get-recent-patients`);
  }

  UploadPatientImage(id, formData): Promise<BaseResonse> {
    return this.httpService.post(
      `api/patient/upload-patient-image/${id}`,
      formData
    );
  }

  deletePatientImage(id: number) {
    return this.httpService.delete(`api/patient/delete-patient-image/${id}`);
  }

  deleteMedicalHistory(data: updateMedicalHistory): Promise<BaseResonse> {
    const options = {
      body: {
        id: data.id,
        medicalHistory: data.medicalHistory,
      },
    };
    return this.httpService.delete(
      'api/patient/delete-medical-history',
      options
    );
  }

  updateThresholds(data: any): Promise<BaseResonse> {
    return this.httpService.patch(
      `api/patient/update-patient-thresholds`,
      data
    );
  }

  // Add allergies
  addAllergiesData(data: any): Promise<BaseResonse> {
    return this.httpService.patch(`api/patient/create-allergy`, data);
  }

  deleteAllergyData(data: { name: string }): Promise<BaseResonse> {
    return this.httpService.post(`api/patient/delete-allergy`, data);
  }

  // Notes
  addPatientNotes(data: { notes: string }): Promise<BaseResonse> {
    return this.httpService.post(`api/patient/create-patient-note`, data);
  }

  deletePatientNotes(data: DeleteNotes): Promise<any> {
    const options = {
      body: {
        patientId: data.patientId,
        notesId: data.notesId,
      },
    };
    return this.httpService.delete('api/patient/delete-patient-note', options);
  }
  deletePatientDocument(data: any): Promise<any> {
    const options = {
      body: {
        patientId: data.patientId,
        docsId: data.docsId,
      },
    };
    return this.httpService.delete('api/patient/delete-patient-doc', options);
  }
}
