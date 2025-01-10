import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'smart-webcomponents-angular/calendar';
import { SchedulerModule } from 'smart-webcomponents-angular/scheduler';

@NgModule({
  declarations: [],
  imports: [CommonModule, CalendarModule, SchedulerModule],
  exports: [CalendarModule, SchedulerModule],
})
export class ScheduleModule {}
