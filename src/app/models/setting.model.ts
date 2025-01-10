export interface NotificationType {
  type: string;
  sms: boolean;
  email: boolean;
}

export interface PracticeStaff {
  appointmentsConfirmationEmail: true;
  appointmentsConfirmationSms: false;
  created_at: string | null;
  dailyScheduleEmail: true;
  dailyScheduleSms: false;
  email: string;
  id: number;
  phone: string;
  providerNumber: string;
  treoAccess: string;
  type: string;
  updated_at: string | null;
  userId: number;
  userName: string;
  name: string;
  status: string;
  isDeleted: boolean | null;
  isVerified: boolean | null;
  color: string;
  colorClass: string;
  count?: number;
  checked?: boolean;
  videoCount?: number | undefined;
  audioCount?: number | undefined;
}

export interface AddPracticeStaff {
  name: string;
  id?: number;
  email: string;
  phone: string;
  treoAccess: string;
  dailyScheduleSms: boolean | undefined;
  dailyScheduleEmail: boolean | undefined;
  type: string;
  providerNumber?: number;
  appointmentsConfirmationSms?: boolean | undefined;
  appointmentsConfirmationEmail?: boolean | undefined;
}

export interface Tags {
  name: string;
  id?: number;
  type?: string;
  isDeleted: boolean | null;
  isActive: boolean | null;
  tagType: string;
}
export interface AddTags {
  name: string;
  id?: number;
  type?: string;
  color: string;
  tagType?: string;
  textColor?: string;
}

export interface UpdateTagStatus {
  id: number;
  status: boolean;
}

export interface PracticeStaffDialog {
  data: PracticeStaff;
  isEdit: boolean;
}

export interface TagDialog {
  data: PracticeStaff;
  isEdit: boolean;
}

export interface SetPasswordStaff {
  id: number;
  password: string;
}

export interface UpdateStatus {
  id: number;
  active: boolean;
}
export interface UpdateInformation {
  id: number;
  status: string;
}
export interface UpdateTagStatus {
  id: number;
  status: boolean;
}
export interface Duration {
  minutes: number;
}

export interface ChangePassword {
  id: number;
  oldPassword: string;
  newPassword: string;
}
