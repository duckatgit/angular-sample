import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  appUrl = environment.appUrl;

  constructor() {}

  ngOnInit(): void {}

  onClickBack(): void {
    window.location.href = `${this.appUrl}/signup`;
  }
}
