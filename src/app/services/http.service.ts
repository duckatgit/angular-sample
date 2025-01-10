import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { ErrorConstant } from '../constants/error.constant';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService,
    private commonService: CommonService
  ) {}

  public async get(uri: string, options?: any): Promise<any> {
    return lastValueFrom(this.http.get(this.apiUrl + uri, options)).catch(
      (error: HttpErrorResponse) => {
        this.catchException(error);
      }
    );
  }

  public async post(url: string, data: any, options = {}): Promise<any> {
    return lastValueFrom(
      this.http.post(this.apiUrl + url, data, options)
    ).catch((error: HttpErrorResponse) => {
      this.catchException(error);
    });
  }

  public async put(url: string, data: any, options = {}): Promise<any> {
    return lastValueFrom(this.http.put(this.apiUrl + url, data, options)).catch(
      (error: HttpErrorResponse) => {
        this.catchException(error);
      }
    );
  }

  public async patch(url: string, data: any, options = {}): Promise<any> {
    return lastValueFrom(
      this.http.patch(this.apiUrl + url, data, options)
    ).catch((error: HttpErrorResponse) => {
      this.catchException(error);
    });
  }

  public async delete(url: string, options = {}): Promise<any> {
    return lastValueFrom(this.http.delete(this.apiUrl + url, options)).catch(
      (error: HttpErrorResponse) => {
        this.catchException(error);
      }
    );
  }

  catchException(error: HttpErrorResponse): void {
    console.log('error ==>', error);

    if (error?.error && error?.error?.message && error?.error?.statusCode) {
      if (error?.error?.statusCode === 400) {
        if (this.commonService.isEmptyObject(error?.error?.message)) {
          if (error?.statusText) {
            this.snackbar.error(error?.statusText);
          } else {
            this.snackbar.error(ErrorConstant.SOMETHING_WENT_WRONG);
          }
        } else {
          if (typeof error?.error?.message === 'string') {
            this.snackbar.error(error?.error?.message);
          } else {
            if (error?.statusText) {
              this.snackbar.error(error?.statusText);
            } else {
              this.snackbar.error(ErrorConstant.SOMETHING_WENT_WRONG);
            }
          }
        }
      } else {
        this.snackbar.error('Error: Some issue occured. Please try again');
      }
    } else if (error.status === 0) {
      this.snackbar.error('Error: Network error. Please try again');
    } else {
      this.snackbar.error('Error: Some issue occured. Please try again');
    }
  }
}

export class HttpProjectService {}
