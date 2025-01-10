import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private inputValue = new Subject<any>();
  private pageName = new Subject<string>();
  setInputValue(value: string): void {
    this.inputValue?.next(value);
  }

  getInputValue(): Subject<string> {
    return this.inputValue;
  }

  setClearInput(value: any): void {
    this.pageName?.next(value);
  }
  getClearInput(): Subject<any> {
    return this.pageName;
  }
}
