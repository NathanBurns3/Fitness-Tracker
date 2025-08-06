import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'YearlySummaryComponent',
  templateUrl: './yearly-summary.component.html',
  styleUrl: './yearly-summary.component.css',
  standalone: false,
})
export class YearlySummaryComponent implements OnInit, OnDestroy {
  @Input() exercisesCompleted!: number[];
  @Input() eatingGoalsCompleted!: number[];
  @Input() isLoading: boolean = false;

  yearlyChart!: Chart;
  screenWidth!: number;

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    if (this.yearlyChart) {
      this.yearlyChart.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['exercisesCompleted'] &&
      changes['exercisesCompleted'].currentValue &&
      changes['eatingGoalsCompleted'] &&
      changes['eatingGoalsCompleted'].currentValue
    ) {
      this.createChart();
    }

    if (changes['daysOfMonth'] && changes['daysOfMonth'].currentValue) {
      this.createChart();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.debouncedCreateChart();
  }

  isSmallScreen() {
    return this.screenWidth < 450;
  }

  debouncedCreateChart = this.debounce(() => this.createChart(), 200);

  createChart(): void {
    if (this.yearlyChart) {
      this.yearlyChart.destroy();
    }

    var ctx = document.getElementById('yearlyChart') as HTMLCanvasElement;
    var gradient1 = ctx?.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    gradient1?.addColorStop(0, 'rgba(21, 101, 192, 0.5)');
    gradient1?.addColorStop(1, 'rgba(21, 101, 192, 1)');

    var gradient2 = ctx?.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    gradient2?.addColorStop(0, 'rgba(245, 124, 0, 0.5)');
    gradient2?.addColorStop(1, 'rgba(245, 124, 0, 1)');

    this.yearlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Exercises Completed',
            data: this.exercisesCompleted,
            backgroundColor: gradient1,
            borderColor: 'rgba(21, 101, 192, 1)',
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: 'rgba(21, 101, 192, 1)',
          },
          {
            label: 'Eating Goals Completed',
            data: this.eatingGoalsCompleted,
            backgroundColor: gradient2,
            borderColor: 'rgba(245, 124, 0, 1)',
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: 'rgba(245, 124, 0, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  debounce(func: Function, wait: number) {
    let timeout: any;
    return function (...args: any) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
