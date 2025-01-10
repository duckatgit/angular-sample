import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalConstant } from 'src/app/constants/local-constant';
import { COUNTRY_CODE } from 'src/app/constants/country-code.constant';
import { SuccessConstant } from 'src/app/constants/success.contant';
import { ResetPasswordData } from 'src/app/models/auth.model';
import { CountryCode } from 'src/app/models/common.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { map, Observable, startWith } from 'rxjs';
import { ErrorConstant } from 'src/app/constants/error.constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isSubmitted = false;
  selectedType = 'email';
  countryCode: CountryCode[] = COUNTRY_CODE;
  selectedCountry = 'US';
  selectedDialCode: string | undefined = '+1';
  dialCodeControl = new FormControl();
  filteredCountryCodes!: Observable<CountryCode[]>;
  appUrl = environment.appUrl;

  constructor(
    protected commonService: CommonService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private localService: LocalService,
    private router: Router,
    private snackbar: SnackBarService
  ) {
    if (!this.authService.isLoginUrlAuthenticated(window.location.href)) {
      window.location.href = `${this.appUrl}/signup`;
    }
  }

  async ngOnInit(): Promise<void> {
    this.localService.removeAllLocalData();
    await this.buildForm();

    this.filteredCountryCodes = this.dialCodeControl.valueChanges.pipe(
      startWith<string | CountryCode>(''),
      map((value) => (typeof value === 'string' ? value : value.dialCode)),
      map((country) =>
        country ? this.filterCountry(country) : this.countryCode.slice()
      )
    );
  }

  async buildForm(): Promise<void> {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  onBlurChangeCountry(data: any): void {
    this.selectedDialCode = data.target.value;
    this.countryCode.forEach((code: CountryCode) => {
      if (code.dialCode === this.selectedDialCode) {
        this.selectedCountry = code.code;
      }
    });
    const dataCode: any = {
      dialCode: this.selectedCountry,
      code: this.selectedDialCode,
    };
    if (data.target.value == '' || data.target.value == '+') {
      this.selectedCountry = 'US';
    }
    this.displayFn(dataCode);
  }

  filterCountry(data: string): CountryCode[] {
    const codeData = this.countryCode.filter(
      (option) =>
        option.dialCode.toLowerCase().indexOf(data.toLowerCase()) === 0
    );
    const dialCodeData = this.countryCode.filter(
      (option) => option.code.toLowerCase().indexOf(data.toLowerCase()) === 0
    );
    const result = [...codeData, ...dialCodeData];
    return result;
  }

  displayFn(data?: CountryCode): string {
    return data ? data.dialCode : '+1';
  }

  onChangeType(value: string): void {
    this.selectedType = value;
  }

  onChangeCountry(data: CountryCode): void {
    this.selectedCountry = data.code;
    this.selectedDialCode = data.dialCode;
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (
      !this.resetPasswordForm.value.email &&
      !this.resetPasswordForm.value.phone
    ) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    if (
      this.dialCodeControl.value &&
      typeof this.dialCodeControl.value === 'string'
    ) {
      const countryExist = this.countryCode.find(
        (x) => x.dialCode === this.dialCodeControl.value
      );
      if (!countryExist) {
        this.snackbar.error(ErrorConstant.INVALID_COUNTRY);
        return;
      }
    }

    this.spinner.show();
    const data: ResetPasswordData = {
      type: this.selectedType,
      ...(this.selectedType === 'email' && {
        email: this.resetPasswordForm.value.email,
      }),
      ...(this.selectedType === 'phone' && {
        phone: `${this.selectedDialCode}-${this.resetPasswordForm.value.phone}`,
      }),
    };
    if (!this.selectedDialCode) {
      this.snackbar.error(ErrorConstant.COUNTRY_CODE);
    } else {
      const result = await this.authService.sendVerificationCode(data);
      if (result && result.isSuccess) {
        await this.localService.setLocalData(
          LocalConstant.RESET_DATA,
          JSON.stringify(data)
        );
        this.snackbar.success(SuccessConstant.VERIFICATION_CODE);
        this.router.navigate(['/verify-code']);
      }
    }
    this.spinner.hide();
  }
}
