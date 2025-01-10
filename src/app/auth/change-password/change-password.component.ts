import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrength } from 'check-password-strength';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalConstant } from 'src/app/constants/local-constant';
import { ErrorConstant } from 'src/app/constants/error.constant';
import { SuccessConstant } from 'src/app/constants/success.contant';
import Validation from 'src/app/helpers/must-match';
import { ResetPasswordData } from 'src/app/models/auth.model';
import { PasswordStrength } from 'src/app/models/common.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetData!: ResetPasswordData;
  changePasswordForm!: FormGroup;
  isSubmitted = false;
  strengthData!: PasswordStrength;
  isPasswordType: boolean = false;
  isNewPasswordType: boolean = false;
  appUrl = environment.appUrl;

  constructor(
    private localService: LocalService,
    private snackbar: SnackBarService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    if (!this.authService.isLoginUrlAuthenticated(window.location.href)) {
      window.location.href = `${this.appUrl}/signup`;
    }
  }

  async ngOnInit(): Promise<void> {
    if (
      (await this.localService.isDataExists(LocalConstant.IS_CODE_VERIFIED)) &&
      (await this.localService.isValidData(LocalConstant.RESET_DATA))
    ) {
      const isCodeVerified: boolean = Boolean(
        await this.localService.getLocalData(LocalConstant.IS_CODE_VERIFIED)
      );
      this.resetData = await this.localService.getLocalData(
        LocalConstant.RESET_DATA
      );
      if (isCodeVerified === true) {
        await this.buildForm();
      }
    } else {
      this.snackbar.error(ErrorConstant.USER_UNAUTHORIZED);
      this.router.navigate(['/reset-password']);
    }
  }

  async buildForm(): Promise<void> {
    this.changePasswordForm = new FormGroup(
      {
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );

    this.changePasswordForm.valueChanges.subscribe((data) => {
      if (data.password) {
        this.strengthData = passwordStrength(data.password);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  onPasswordType(): void {
    this.isPasswordType = !this.isPasswordType;
  }

  onNewPasswordType(): void {
    this.isNewPasswordType = !this.isNewPasswordType;
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.spinner.show();
    const data: ResetPasswordData = {
      type: this.resetData.type,
      password: this.changePasswordForm.value.password,
      ...(this.resetData.type === 'email' && {
        email: this.resetData.email,
      }),
      ...(this.resetData.type === 'phone' && {
        phone: this.resetData.phone,
      }),
    };

    const result = await this.authService.changePassword(data);
    if (result && result.isSuccess) {
      await this.localService.removeAllLocalData();
      this.snackbar.success(SuccessConstant.PASSWORD_CHANGED);
      this.router.navigate(['/login']);
    }
    this.spinner.hide();
  }
}
