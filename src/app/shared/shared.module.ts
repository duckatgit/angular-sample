import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermOfUseComponent } from './components/term-of-use/term-of-use.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { LogoComponent } from './components/logo/logo.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NouisliderModule } from 'ng2-nouislider';
import { MatSliderModule } from '@angular/material/slider';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    TermOfUseComponent,
    PrivacyPolicyComponent,
    LogoComponent,
    ProgressBarComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
    DocumentViewerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaterialModule,
    AuthRoutingModule,
    NgxPaginationModule,
    ImageCropperModule,
    NouisliderModule,
    MatSliderModule,
    NgxDocViewerModule,
  ],
  exports: [
    // Components
    TermOfUseComponent,
    PrivacyPolicyComponent,
    LogoComponent,
    ProgressBarComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,

    // Modules
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
