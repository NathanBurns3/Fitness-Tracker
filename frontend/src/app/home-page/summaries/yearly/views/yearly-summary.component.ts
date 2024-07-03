import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { YearlyEatingGoalsService } from '../services/yearly-eating-goals.service';
import { YearlyExercisesService } from '../services/yearly-exercise.service';
Chart.register(...registerables);

@Component({
  selector: 'YearlySummaryComponent',
  templateUrl: './yearly-summary.component.html',
  styleUrls: ['./yearly-summary.component.css'],
})
export class YearlySummaryComponent implements OnInit, OnDestroy {
  ExercisesCompleted!: number[];
  EatingGoalsCompleted!: number[];
  myChart!: Chart;
  screenWidth!: number;

  constructor(
    private yearlyExercisesService: YearlyExercisesService,
    private yearlyEatingGoalsService: YearlyEatingGoalsService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.ExercisesCompleted = this.yearlyExercisesService.getYearlyExercises();
    this.EatingGoalsCompleted =
      this.yearlyEatingGoalsService.getYearlyEatingGoals();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.destroy();
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
    if (this.myChart) {
      this.myChart.destroy();
    }

    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var gradient1 = ctx?.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    gradient1?.addColorStop(0, 'rgba(21, 101, 192, 0.5)');
    gradient1?.addColorStop(1, 'rgba(21, 101, 192, 1)');

    var gradient2 = ctx?.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    gradient2?.addColorStop(0, 'rgba(245, 124, 0, 0.5)');
    gradient2?.addColorStop(1, 'rgba(245, 124, 0, 1)');

    var myChart = new Chart(ctx, {
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
            data: this.ExercisesCompleted,
            backgroundColor: gradient1,
            borderColor: 'rgba(21, 101, 192, 1)',
            borderWidth: 1,
            hoverBorderWidth: 2,
            hoverBorderColor: 'rgba(21, 101, 192, 1)',
          },
          {
            label: 'Eating Goals Completed',
            data: this.EatingGoalsCompleted,
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
