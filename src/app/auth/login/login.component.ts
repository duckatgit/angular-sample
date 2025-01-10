import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalConstant } from 'src/app/constants/local-constant';
import { ErrorConstant } from 'src/app/constants/error.constant';
import { SuccessConstant } from 'src/app/constants/success.contant';
import { LoginUser, LoginUserData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  isPasswordType: boolean = false;
  appUrl = environment.appUrl;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private localService: LocalService,
    private snackbar: SnackBarService
  ) {
    // if (!this.authService.isLoginUrlAuthenticated(window.location.href)) {
    //   window.location.href = `${this.appUrl}/signup`;
    // }
  }

  async ngOnInit(): Promise<void> {
    const userData = localStorage.getItem('user-data');
    if (userData) {
      this.router.navigate(['/user/patients']);
    } else {
      await this.localService.removeAllLocalData();
    }
    await this.buildForm();
  }

  async buildForm(): Promise<void> {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onPasswordType(): void {
    this.isPasswordType = !this.isPasswordType;
  }

  onCreateAccount(): void {
    window.location.href = `${this.appUrl}/signup`;
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show();
    const data: LoginUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    const result = await this.authService.login(data);
    if (result) {
      if (result.isSuccess) {
        const userData: LoginUserData = result.data;
        await this.localService.setLocalData(LocalConstant.USER_DATA, userData);
        this.snackbar.success(SuccessConstant.USER_LOGGED_IN);
        this.router.navigate(['/user/patients']);
      } else {
        if (result.data?.type === 'owner') {
          this.snackbar.warning(ErrorConstant.ACCOUNT_NOT_VERIFIED);
        }
        if (result.data?.type === 'practitioner') {
          this.snackbar.warning(ErrorConstant.PRACTITIONER_NOT_VERIFIED);
        }
      }
    }
    this.spinner.hide();
  }
}
