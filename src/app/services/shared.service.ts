import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewPatientDataSource } from '../models/patient.mode';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  toggleSidebar = new Subject<boolean>();
  patientDetailsRoute = new Subject();
  patientData = new Subject();

  constructor() {}

  setToggleSidebar(value: boolean) {
    this.toggleSidebar.next(value);
  }

  getToggleSidebar(): Observable<boolean> {
    return this.toggleSidebar.asObservable();
  }

  setRoute(value: string): void {
    this.patientDetailsRoute.next(value);
  }

  setPatientData(value: NewPatientDataSource[]): void {
    this.patientData.next(value);
  }
}
