import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit {
  doc!: string;
  loadedContent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef
  ) {
    this.spinner.show();
    this.doc = this.data.data;
  }

  ngOnInit(): void {}

  contentLoaded(): void {
    this.loadedContent = true;
    this.spinner.hide();
  }
}
