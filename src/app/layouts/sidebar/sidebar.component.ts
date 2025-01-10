import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalConstant } from 'src/app/constants/local-constant';
import { LoginUserData } from 'src/app/models/auth.model';
import { LocalService } from 'src/app/services/local.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatExpansionPanel, { static: true })
  matExpansionPanelElement!: MatExpansionPanel;
  @ViewChild('smallHeaderBar') smallHeaderBar!: ElementRef;
  @Input() isHaveSmallSideBar: boolean = true;
  @Input() smallHeader!: boolean;
  @Output() mobileHeader = new EventEmitter<any>();

  isToggle = false;
  currentRoute: string = '';
  userName!: string;
  userNameFull!: string;
  userType!: string;
  userAccess!: string;
  show!: boolean;
  subsideMenu: string = '';
  isOpen!: boolean;
  id!: any;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private localService: LocalService,
    private renderer: Renderer2
  ) {
    this.currentRoute = this.router.url;
  }

  async ngOnInit(): Promise<void> {
    this.id = this.currentRoute.split('/').pop();
    if (await this.localService.isDataExists(LocalConstant.SMALL_SIDEBAR)) {
      this.isToggle = JSON.parse(
        localStorage.getItem(LocalConstant.SMALL_SIDEBAR) || ''
      );
    }
    const userData: LoginUserData = await this.localService.getLocalData(
      LocalConstant.USER_DATA
    );
    this.userType = userData.type;
    this.userAccess = userData.access;
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
  }

  ngAfterViewChecked(): void {
    if (this.smallHeader == true) {
      this.renderer.addClass(this.smallHeaderBar?.nativeElement, 'slide-right');
    } else {
      this.renderer.removeClass(
        this.smallHeaderBar?.nativeElement,
        'slide-right'
      );
    }
    this.sharedService.patientDetailsRoute.subscribe((res: any) => {
      this.onClickMenu(res);
      this.getActiveMenu(res);
    });
  }

  async onToggleSidebar(): Promise<void> {
    this.isToggle = !this.isToggle;
    localStorage.setItem(
      LocalConstant.SMALL_SIDEBAR,
      JSON.stringify(this.isToggle)
    );
    this.sharedService.setToggleSidebar(this.isToggle);
    const mainEl = document.getElementById('mySidebar');
    if (mainEl) {
      mainEl.style.marginLeft = '0px';
    }
  }

  getActiveMenu(route: string): boolean {
    if (
      this.currentRoute === '/user/dashboard' ||
      this.currentRoute === '/user/schedule' ||
      this.currentRoute === '/user/patients/' + this.id ||
      this.currentRoute === '/user/telehealth' ||
      this.currentRoute === '/user/monitoring' ||
      this.currentRoute === '/user/payments' ||
      this.currentRoute === '/user/expenses' ||
      this.currentRoute === '/user/communications' ||
      this.currentRoute === '/user/reports' ||
      this.currentRoute === '/user/help' ||
      this.currentRoute === '/user/settings/staff' ||
      this.currentRoute === '/user/settings/details' ||
      this.currentRoute === '/user/settings/calendar' ||
      this.currentRoute === '/user/settings/communications' ||
      this.currentRoute === '/user/settings/pricing' ||
      this.currentRoute === '/user/settings/forms' ||
      this.currentRoute === '/user/settings/medications' ||
      this.currentRoute === '/user/settings/tags'
    ) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }

    if (this.currentRoute !== '/user/patients') {
      localStorage.removeItem('patientsTab');
    }
    if (this.currentRoute.includes(route)) {
      return true;
    } else {
      return false;
    }
  }

  onClickMenu(route: string): void {
    this.currentRoute = route;
    this.addMobileHeader(false);
  }

  addMobileHeader(data: any): void {
    this.show = false;
    this.mobileHeader.emit(this.show);
  }
}
