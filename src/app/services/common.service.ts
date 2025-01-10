import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  noSpace(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 32) {
      return false;
    }
    return true;
  }

  charNumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 96 && charCode <= 122) ||
      (charCode >= 48 && charCode <= 57) ||
      charCode === 8
    ) {
      return true;
    }
    return false;
  }

  isEmptyObject(obj: any): boolean {
    if (obj && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  isValidJson(data: string): boolean {
    if (data) {
      try {
        const obj = JSON.parse(data);
        if (obj && typeof obj === 'object') {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  async createRandomString(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async convertFrom24To12Format(time24: any): Promise<any> {
    if (time24 != null) {
      const [sHours, minutes] = time24
        ?.match(/([0-9]{1,2}):([0-9]{2})/)
        .slice(1);
      const period = +sHours <= 12 ? 'AM' : 'PM';
      const hours = +sHours % 12 || 12;

      return `${hours}:${minutes} ${period}`;
    }
  }

  async createRandomNumber(): Promise<string> {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
