import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_CODE } from 'src/app/constants/country-code.constant';
import { CountryCode, PasswordStrength } from 'src/app/models/common.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LocalConstant } from 'src/app/constants/local-constant';
import { UserData } from 'src/app/models/auth.model';
import { LocalService } from 'src/app/services/local.service';
import { passwordStrength } from 'check-password-strength';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, startWith } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ErrorConstant } from 'src/app/constants/error.constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitted = false;
  countryCode: CountryCode[] = COUNTRY_CODE;
  selectedCountry = 'US';
  selectedDialCode: string | undefined = '+1';
  strengthData!: PasswordStrength;
  isPasswordType: boolean = false;
  dialCodeControl = new FormControl();
  filteredCountryCodes!: Observable<CountryCode[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localService: LocalService,
    protected commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackbar: SnackBarService
  ) {
    if (!this.authService.isSignupUrlAuthenticated(window.location.href)) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.buildForm();
  }

  async buildForm(): Promise<void> {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    this.signupForm.valueChanges.subscribe((data) => {
      if (data.password) {
        this.strengthData = passwordStrength(data.password);
      }
    });

    if (await this.localService.isValidData(LocalConstant.SIGNUP_DATA)) {
      const signupData = await this.localService.getLocalData(
        LocalConstant.SIGNUP_DATA
      );
      const phone: string[] = signupData?.phone.split('-');
      this.selectedDialCode = phone[0];

      this.signupForm.patchValue({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        phone: phone[1],
      });
    }

    this.filteredCountryCodes = this.dialCodeControl.valueChanges.pipe(
      startWith<string | CountryCode>(''),
      map((value) => (typeof value === 'string' ? value : value.dialCode)),
      map((country) =>
        country ? this.filterCountry(country) : this.countryCode.slice()
      )
    );
  }

  get f() {
    return this.signupForm.controls;
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

  onPasswordType(): void {
    this.isPasswordType = !this.isPasswordType;
  }

  onChangeCountry(data: CountryCode): void {
    this.selectedCountry = data.code;
    this.selectedDialCode = data.dialCode;
  }
  onBlurChangeCountry(data: any): void {
    this.selectedDialCode = data.target.value;
    this.countryCode.forEach((code: any) => {
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
  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
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
    const data = {
      email: this.signupForm.value.email,
      phone: `${this.selectedDialCode}-${this.signupForm.value.phone}`,
    };
    const result = await this.authService.checkDuplicateUser(data);
    if (result && result.isSuccess) {
      const signupData: UserData = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phone: `${this.selectedDialCode}-${this.signupForm.value.phone}`,
      };
      await this.localService.setLocalData(
        LocalConstant.SIGNUP_DATA,
        signupData
      );

      if (!this.selectedDialCode) {
        this.snackbar.error(ErrorConstant.COUNTRY_CODE);
      } else {
        this.router.navigate(['/create-account']);
      }
    }
    this.spinner.hide();
  }
}
