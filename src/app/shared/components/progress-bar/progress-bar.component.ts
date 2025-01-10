import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() progress: number = 0;

  progressItems: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.progressItems = [];
    if (changes['progress'].currentValue === 0) {
      this.progressItems.push(0);
    } else if (changes['progress'].currentValue === 1) {
      this.progressItems.push(0, 1);
    } else if (changes['progress'].currentValue === 2) {
      this.progressItems.push(0, 1, 2);
    } else if (changes['progress'].currentValue === 3) {
      this.progressItems.push(0, 1, 2, 3);
    }
  }
}
