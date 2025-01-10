import { DiversityType } from 'check-password-strength';

export interface BaseResonse {
  instantMeetingLink: any;
  total: number;
  data?: any;
  message?: string;
  statusCode?: number;
  isSuccess?: boolean;
}

export interface CountryCode {
  name: string;
  dialCode: string;
  code: string;
}

export interface PasswordStrength {
  id: number;
  value: string;
  contains: DiversityType[];
  length: number;
}

export interface SidebarMenu {
  name: string;
  icon: string;
  route: string;
}

export interface DialogResponse {
  isSuccess: boolean;
}

export interface ConfirmDialogData {
  title: string;
  content: string;
}

export interface GenderListData {
  name: string;
  value: string;
}

export interface IndigenousStatus {
  name: string;
  value: string;
}

export interface GenderIdentity {
  name: string;
  value: string;
}

export interface PersonalPronouns {
  name: string;
  value: string;
}

export interface InsuranceFund {
  fundName: string;
  fundCode: string;
}
export interface InsuranceLevel {
  levelName: string;
  levelCode: string;
  levelValue: string;
}
