import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalConstant } from 'src/app/constants/local-constant';
import { ErrorConstant } from 'src/app/constants/error.constant';
import { SuccessConstant } from 'src/app/constants/success.contant';
import { ResetPasswordData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  resetData!: ResetPasswordData;
  resetValue: string = '';
  codeOne!: number | null;
  codeTwo!: number | null;
  codeThree!: number | null;
  codeFour!: number | null;
  codeFive!: number | null;
  codeSix!: number | null;
  isValid!: boolean;
  countDown!: number;
  isTimeOut = true;
  countInterval!: NodeJS.Timer;
  appUrl = environment.appUrl;

  @ViewChild('codeOneEle') codeOneEle!: ElementRef;
  @ViewChild('codeTwoEle') codeTwoEle!: ElementRef;
  @ViewChild('codeThreeEle') codeThreeEle!: ElementRef;
  @ViewChild('codeFourEle') codeFourEle!: ElementRef;
  @ViewChild('codeFiveEle') codeFiveEle!: ElementRef;
  @ViewChild('codeSixEle') codeSixEle!: ElementRef;

  constructor(
    private localService: LocalService,
    private snackbar: SnackBarService,
    private router: Router,
    protected commonService: CommonService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {
    if (!this.authService.isLoginUrlAuthenticated(window.location.href)) {
      window.location.href = `${this.appUrl}/signup`;
    }
  }

  async ngOnInit(): Promise<void> {
    if (await this.localService.isValidData(LocalConstant.RESET_DATA)) {
      this.resetData = await this.localService.getLocalData(
        LocalConstant.RESET_DATA
      );
      await this.setData();
      await this.setTimer();
    } else {
      this.snackbar.error(ErrorConstant.SOMETHING_WENT_WRONG);
      this.router.navigate(['/reset-password']);
    }
  }

  async setData(): Promise<void> {
    if (this.resetData.type === 'email') {
      if (this.resetData.email) {
        const email = this.resetData.email.split('@');
        const firstTwo = email[0].substring(0, 2);
        const lastTwo = email[0].substring(email[0].length - 2);
        this.resetValue = `${firstTwo}*******${lastTwo}@${email[1]}`;
      }
    }
    if (this.resetData.type === 'phone') {
      if (this.resetData.phone) {
        const phone = this.resetData.phone.split('-');
        const lastTwo = phone[1].substring(phone[1].length - 2);
        this.resetValue = `${phone[0]}-********${lastTwo}`;
      }
    }
  }

  async setTimer(): Promise<void> {
    if (await this.localService.isDataExists(LocalConstant.COUNT_DOWN)) {
      this.countDown = await this.localService.getLocalData(
        LocalConstant.COUNT_DOWN
      );
      if (this.countDown <= 0) {
        this.isTimeOut = true;
      } else {
        this.isTimeOut = false;
        await this.startTimer();
      }
    } else {
      this.countDown = 60;
      this.isTimeOut = false;
      await this.localService.setLocalData(
        LocalConstant.COUNT_DOWN,
        this.countDown
      );
      await this.startTimer();
    }
  }

  async startTimer(): Promise<void> {
    this.countInterval = setInterval(async () => {
      if (this.countDown === 0) {
        const data: ResetPasswordData = {
          type: this.resetData.type,
          ...(this.resetData.type === 'email' && {
            email: this.resetData.email,
          }),
          ...(this.resetData.type === 'phone' && {
            phone: this.resetData.phone,
          }),
        };
        await this.authService.codeTimeOut(data);
        this.isTimeOut = true;
        localStorage.setItem(LocalConstant.COUNT_DOWN, String(this.countDown));
        clearInterval(this.countInterval);
      } else {
        --this.countDown;
        await this.localService.setLocalData(
          LocalConstant.COUNT_DOWN,
          this.countDown
        );
      }
    }, 1000);
  }

  onKeyupCodeOne(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106)) {
      this.codeTwoEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  onKeyupCodeTwo(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106)) {
      this.codeThreeEle.nativeElement.focus();
    }
    if (charCode === 8 && !event.target.value) {
      this.codeOneEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  onKeyupCodeThree(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106)) {
      this.codeFourEle.nativeElement.focus();
    }
    if (charCode === 8 && !event.target.value) {
      this.codeTwoEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  onKeyupCodeFour(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106)) {
      this.codeFiveEle.nativeElement.focus();
    }
    if (charCode === 8 && !event.target.value) {
      this.codeThreeEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  onKeyupCodeFive(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode > 95 && charCode < 106)) {
      this.codeSixEle.nativeElement.focus();
    }
    if (charCode === 8 && !event.target.value) {
      this.codeFourEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  onKeyupCodeSix(event: any): void {
    const charCode: number = event.which ? event.which : event.keyCode;
    if (charCode === 8 && !event.target.value) {
      this.codeFiveEle.nativeElement.focus();
    }
    this.checkValidation();
  }

  checkValidation(): void {
    if (
      this.codeOne &&
      this.codeTwo &&
      this.codeThree &&
      this.codeFour &&
      this.codeFive &&
      this.codeSix
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  async onResendCode(): Promise<void> {
    this.spinner.show();
    const data: ResetPasswordData = {
      type: this.resetData.type,
      ...(this.resetData.type === 'email' && {
        email: this.resetData.email,
      }),
      ...(this.resetData.type === 'phone' && {
        phone: this.resetData.phone,
      }),
    };
    const result = await this.authService.sendVerificationCode(data);
    if (result && result.isSuccess) {
      this.codeOne = null;
      this.codeTwo = null;
      this.codeThree = null;
      this.codeFour = null;
      this.codeFive = null;
      this.codeSix = null;
      this.countDown = 60;
      this.isTimeOut = false;
      this.isValid = false;
      await this.localService.setLocalData(
        LocalConstant.COUNT_DOWN,
        this.countDown
      );
      this.snackbar.success(SuccessConstant.VERIFICATION_CODE);
      await this.startTimer();
    }
    this.spinner.hide();
  }

  async onVerify(): Promise<void> {
    if (!this.isValid) {
      this.snackbar.error(ErrorConstant.CODE_REQUIRED);
      return;
    }

    this.spinner.show();
    const code = Number(
      `${this.codeOne}${this.codeTwo}${this.codeThree}${this.codeFour}${this.codeFive}${this.codeSix}`
    );
    const data: ResetPasswordData = {
      type: this.resetData.type,
      code: code,
      ...(this.resetData.type === 'email' && {
        email: this.resetData.email,
      }),
      ...(this.resetData.type === 'phone' && {
        phone: this.resetData.phone,
      }),
    };

    const result = await this.authService.verifyCode(data);
    if (result && result.isSuccess) {
      clearInterval(this.countInterval);
      await this.localService.removeLocalData(LocalConstant.COUNT_DOWN);
      await this.localService.setLocalData(
        LocalConstant.IS_CODE_VERIFIED,
        true
      );
      this.snackbar.success(SuccessConstant.CODE_VERIFIED);
      this.router.navigate(['/change-password']);
    }
    this.spinner.hide();
  }

  async ngOnDestroy(): Promise<void> {
    clearInterval(this.countInterval);
    await this.localService.removeLocalData(LocalConstant.COUNT_DOWN);
  }
}
