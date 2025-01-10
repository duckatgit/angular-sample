export interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  practiceName?: string;
  practiceLink?: string;
  specialization?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: number;
  licenseNumber?: string;
  isAgree?: boolean;
  timeout?: number;
  image?: string;
}

export interface DuplicateUser {
  email: string;
  phone: string;
}

export interface UserPracticeLink {
  practiceLink: string;
}

export interface ResetPasswordData {
  type: string;
  email?: string;
  phone?: string;
  code?: number;
  password?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserData {
  access: string;
  email: string;
  userId: number;
  practiceLink: string;
  token: string;
  type: string;
  userName: string;
  loginUserId: number;
  practiceName?: string;
}
