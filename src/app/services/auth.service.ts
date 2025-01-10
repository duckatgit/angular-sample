import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalConstant } from '../constants/local-constant';
import {
  ResetPasswordData,
  UserData,
  DuplicateUser,
  UserPracticeLink,
  LoginUser,
  LoginUserData,
} from '../models/auth.model';
import { BaseResonse } from '../models/common.model';
import { HttpService } from './http.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    public httpService: HttpService,
    private localService: LocalService
  ) {}

  checkDuplicateUser(data: DuplicateUser): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/check-duplicate-user`, data);
  }

  checkPracticeLink(data: UserPracticeLink): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/verify-link`, data);
  }

  createAccount(data: UserData): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/create-account`, data);
  }

  verifyAccount(token: string, id: string): Promise<any> {
    return this.httpService.get(`api/auth/verify-account/${token}/${id}`);
  }

  sendVerificationCode(data: ResetPasswordData): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/send-verification-code`, data);
  }

  verifyCode(data: ResetPasswordData): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/verify-code`, data);
  }

  codeTimeOut(data: ResetPasswordData): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/code-timeout`, data);
  }

  changePassword(data: ResetPasswordData): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/change-password`, data);
  }

  login(data: LoginUser): Promise<BaseResonse> {
    return this.httpService.post(`api/auth/login`, data);
  }

  logout(): Observable<boolean> {
    this.localService.removeAllLocalData();
    return of(true);
  }

  async isUserLoggedIn(): Promise<boolean> {
    const userData: LoginUserData = await this.localService.getLocalData(
      LocalConstant.USER_DATA
    );
    if (
      userData &&
      userData?.userId &&
      userData?.loginUserId &&
      userData?.token
    ) {
      return true;
    } else {
      return false;
    }
  }

  isLoginUrlAuthenticated(url: string): boolean {
    const urlData = url ? url.split('.') : [];
    if (urlData.length !== 3) {
      return false;
    } else {
      return true;
    }
  }

  isSignupUrlAuthenticated(url: string): boolean {
    const urlData = url ? url.split('.') : [];
    if (urlData.length !== 2) {
      return false;
    } else {
      return true;
    }
  }
}
