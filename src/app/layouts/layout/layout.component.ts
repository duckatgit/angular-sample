import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { LocalConstant } from 'src/app/constants/local-constant';
import { LocalService } from 'src/app/services/local.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sideBar') sideBar!: ElementRef;
  isToogleSidebar = false;
  smallHeader!: boolean;

  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private localService: LocalService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.sharedService.getToggleSidebar().subscribe((data: boolean) => {
      this.isToogleSidebar = data;
    });
  }

  async ngOnInit(): Promise<void> {
    if (await this.localService.isDataExists(LocalConstant.SMALL_SIDEBAR)) {
      this.isToogleSidebar = JSON.parse(
        localStorage.getItem(LocalConstant.SMALL_SIDEBAR) || ''
      );
    }
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe(['(max-width:1024px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches === true) {
          this.renderer.addClass(this.sideBar?.nativeElement, 'small-sidebar');
          this.isToogleSidebar = true;
        } else {
          this.renderer.removeClass(
            this.sideBar?.nativeElement,
            'small-sidebar'
          );
          this.isToogleSidebar = false;
        }
      });

    this.breakpointObserver
      .observe(['(max-width:767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches === true) {
          this.renderer.addClass(this.sideBar?.nativeElement, 'small-sidebar');
          this.isToogleSidebar = true;
        } else {
          this.renderer.removeClass(
            this.sideBar?.nativeElement,
            'small-sidebar'
          );
          this.isToogleSidebar = false;
        }
      });

    this.breakpointObserver
      .observe(['(max-width:500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches === true) {
          this.renderer.removeClass(
            this.sideBar?.nativeElement,
            'small-sidebar'
          );
        }
      });
  }

  addHeader(data: boolean): void {
    this.smallHeader = data;
  }

  addHeaders(data: boolean): void {
    this.smallHeader = data;
  }
}
