import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { LocalConstant } from 'src/app/constants/local-constant';
import { SuccessConstant } from 'src/app/constants/success.contant';
import { LoginUserData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { PracticeImageService } from 'src/app/services/practice-image.services';
import { SearchService } from 'src/app/services/search.service';
import { SettingService } from 'src/app/services/setting.service';
import { SharedService } from 'src/app/services/shared.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() mobileHeader = new EventEmitter<any>();
  show!: boolean;
  timeout: number = 1800;
  subscription!: Subscription;
  isScreenActive: boolean = false;
  intervalId: any;
  userName!: string;
  userNameFull!: string;
  userType!: string;
  userAccess!: string;
  hideBackFunction!: boolean;
  imageUrl!: string;
  Imagesubscription!: Subscription;
  receivedValue: boolean = false;
  inputValue!: string;
  searchPlaceHolder!: string;
  subject: Subject<any> = new Subject();
  length: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackBarService,
    private bnIdle: BnNgIdleService,
    private settingService: SettingService,
    private localService: LocalService,
    private sharedService: SharedService,
    private activeRoute: ActivatedRoute,
    private practiceImageService: PracticeImageService,
    private changeDetectorRef: ChangeDetectorRef,
    private searchService: SearchService
  ) {
    this.Imagesubscription =
      this.practiceImageService.headerImageUrl$.subscribe((url) =>
        url === ''
          ? (this.imageUrl = '')
          : (this.imageUrl = url || this.imageUrl)
      );
  }

  async ngOnInit(): Promise<void> {
    this.searchService.getClearInput().subscribe(async (value) => {
      this.inputValue = '';
      this.length = value.length;
    });
    const userData: LoginUserData = await this.localService.getLocalData(
      LocalConstant.USER_DATA
    );
    this.userType = userData.type;
    this.userAccess = userData.access;
    this.getPracticeImageByUserType(this.userType);
    const name = userData.userName.split(' ');
    this.userNameFull = userData.userName;
    if (name.length === 1) {
      this.userName = name[0].substr(0, 1).charAt(0).toUpperCase().substr(0, 1);
    } else {
      this.userName =
        name[0].substr(0, 1).charAt(0).toUpperCase().substr(0, 1) +
        '' +
        name[1].substr(0, 1).charAt(0).toUpperCase().substr(0, 1) +
        '';
    }
    this.detectScreenActive();

    const result = await this.settingService.getTimeOut(
      userData.type,
      userData.access
    );
    if (result && result.isSuccess) {
      this.timeout = result.data?.timeout;
      this.intervalId = setInterval(() => {
        this.isScreenActive = false;
      }, this.timeout * 1000);
    }

    this.bnIdle.startWatching(this.timeout).subscribe((res) => {
      if (res && !this.isScreenActive) this.logOut();
      else if (res && this.isScreenActive) this.bnIdle.resetTimer(this.timeout);
    });
  }
  onInputChange(): void {
    this.searchService.setInputValue(this.inputValue);
  }

  ngOnChanges(): void {
    const data: any = this.activeRoute.snapshot;
  }

  ngAfterViewChecked(): void {
    const data: any = this.activeRoute.snapshot;
    let route: any;
    route = data._routerState.url.split('/');
    const activeRoutes = `/${route[1]}/${route[2]}/${route[3]}/${route[4]}`;
    const patientRoute = `/${route[1]}/${route[2]}/`;
    if (`/user/patients/view/${route[4]}` === activeRoutes) {
      this.hideBackFunction = true;
      this.receivedValue = false;
    } else {
      this.hideBackFunction = false;
    }
    const id = route[3];
    if (id !== 'view') {
      if (
        ('/user/patients/' === patientRoute && route[3] != 'add') ||
        (`/user/settings/staff` === `/${route[1]}/${route[2]}/${route[3]}` &&
          this.length > 0) ||
        (`/user/settings/tags` === `/${route[1]}/${route[2]}/${route[3]}` &&
          this.length > 0)
      ) {
        this.searchPlaceHolder =
          `/user/settings/staff` === `/${route[1]}/${route[2]}/${route[3]}`
            ? 'Search Practice Staff'
            : 'Search';

        this.searchPlaceHolder =
          `/user/settings/tags` === `/${route[1]}/${route[2]}/${route[3]}`
            ? 'Search Tags'
            : 'Search';

        this.receivedValue = true;
      } else {
        this.receivedValue = false;
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  async getPracticeImageByUserType(UserTypeName: string) {
    const result = await this.settingService.getPracticeDetailImage(
      UserTypeName
    );
    if (result && result.isSuccess) {
      this.imageUrl = result.data.image;
    }
  }

  logOut(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
      localStorage.clear();
      this.snackbar.success(SuccessConstant.USER_LOGGED_OUT);
    });
  }

  detectScreenActive(): void {
    this.subscription = fromEvent(this.document, 'keydown').subscribe(
      (event) => {
        this.isScreenActive = true;
      }
    );
    this.subscription = fromEvent(this.document, 'keypress').subscribe(
      (event) => {
        this.isScreenActive = true;
      }
    );
    this.subscription = fromEvent(this.document, 'mousedown').subscribe(
      (event) => {
        this.isScreenActive = true;
      }
    );
    this.subscription = fromEvent(this.document, 'mousemove').subscribe(
      (event) => {
        this.isScreenActive = true;
      }
    );
  }

  addMobileHeader(value: boolean): void {
    if (value === false) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.mobileHeader.emit(this.show);
  }

  ngOnDestroy(): void {
    this.bnIdle.stopTimer();
    this.subscription.unsubscribe();
    clearInterval(this.intervalId);
  }

  openSettings(): void {
    const data = '/user/settings/details';
    this.sharedService.setRoute(data);
  }
}
