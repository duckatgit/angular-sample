import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UserData } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { LocalConstant } from 'src/app/constants/local-constant';
import { LocalService } from 'src/app/services/local.service';
import { ErrorConstant } from 'src/app/constants/error.constant';
import { AuthService } from 'src/app/services/auth.service';
import { SuccessConstant } from 'src/app/constants/success.contant';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  createAccountForm!: FormGroup;
  isSubmitted = false;
  isAgree = false;
  signupData!: UserData;

  constructor(
    private router: Router,
    private localService: LocalService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private snackbar: SnackBarService,
    protected commonService: CommonService
  ) {
    if (!this.authService.isSignupUrlAuthenticated(window.location.href)) {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    if (await this.localService.isValidData(LocalConstant.SIGNUP_DATA)) {
      this.signupData = await this.localService.getLocalData(
        LocalConstant.SIGNUP_DATA
      );
      await this.buildForm();
    } else {
      this.snackbar.error(ErrorConstant.FORM_INCOMPLETE);
      this.router.navigate(['/signup']);
    }
  }

  async buildForm(): Promise<void> {
    this.createAccountForm = new FormGroup({
      practiceName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      practiceLink: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.createAccountForm.valueChanges.subscribe(async (data) => {
      const formData = {
        practiceName: data.practiceName,
        practiceLink: data.practiceLink,
      };
      await this.localService.setLocalData(
        LocalConstant.CREATE_ACCOUNT,
        formData
      );
    });

    if (await this.localService.isValidData(LocalConstant.CREATE_ACCOUNT)) {
      const formData = await this.localService.getLocalData(
        LocalConstant.CREATE_ACCOUNT
      );
      this.createAccountForm.patchValue({
        practiceName: formData.practiceName,
        practiceLink: formData.practiceLink,
      });
    }
  }

  get f() {
    return this.createAccountForm.controls;
  }

  onChangeAgree(event: MatCheckboxChange): void {
    this.isAgree = event.checked;
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (this.createAccountForm.invalid || !this.isAgree) {
      return;
    }

    this.spinner.show();
    const practiceLink = this.createAccountForm.value.practiceLink;
    const practiceData = { practiceLink: practiceLink };
    const linkResult = await this.authService.checkPracticeLink(practiceData);
    if (linkResult && linkResult.isSuccess) {
      const userEmail = this.signupData.email;
      if (
        userEmail?.includes('@incarta.com.au') ||
        userEmail?.includes('@dryeyecentre.com.au') ||
        userEmail?.includes('@ducktaleit.com')
      ) {
        const data: UserData = {
          firstName: this.signupData.firstName,
          lastName: this.signupData.lastName,
          email: userEmail,
          password: this.signupData.password,
          phone: this.signupData.phone,
          practiceName: this.createAccountForm.value.practiceName,
          practiceLink: practiceLink,
          isAgree: this.isAgree,
        };
        const result = await this.authService.createAccount(data);
        if (result && result.isSuccess) {
          this.snackbar.success(SuccessConstant.ACCOUNT_CREATED);
          this.snackbar.success(SuccessConstant.VERIFY_LINK);
          this.localService.removeAllLocalData();
          this.router.navigate(['/signup']);
        }
      } else {
        this.snackbar.success(SuccessConstant.ACCOUNT_CREATED);
        this.localService.removeAllLocalData();
        this.router.navigate(['/signup']);
      }
    }
    this.spinner.hide();
  }
}
