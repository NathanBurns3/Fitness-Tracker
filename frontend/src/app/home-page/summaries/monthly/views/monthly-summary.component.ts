import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IMonthlyBreakdownInfo } from '../models/monthly-breakdown-info';
import { MonthlyBreakdownInfoService } from '../services/monthly-breakdown-info.service';
import { IExerciseInfo } from '../../daily/models/exercise-info';
import { MonthlyExerciseInfoService } from '../services/monthly-exercise-info.service';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
    selector: 'MonthlySummaryComponent',
    templateUrl: './monthly-summary.component.html',
    styleUrls: ['./monthly-summary.component.css'],
    standalone: false
})
export class MonthlySummaryComponent implements OnInit, OnDestroy, OnChanges {
  @Input() daysOfMonth!: IMonthlyBreakdownInfo[];
  @Input() monthlyExerciseInfo!: IExerciseInfo;
  @Input() isLoading: boolean = false;

  exercisePercentage!: number[];
  colors: string[] = [
    'bg-red-400',
    'bg-blue-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-orange-400',
    'bg-green-400',
    'bg-pink-400',
    'bg-lime-400',
    'bg-sky-400',
    'bg-indigo-400',
    'bg-teal-400',
  ];
  colorsHex: string[] = [
    '#f87171', // bg-red-400
    '#60a5fa', // bg-blue-400
    '#facc15', // bg-yellow-400
    '#a78bfa', // bg-purple-400
    '#fb923c', // bg-orange-400
    '#34d399', // bg-green-400
    '#ec4899', // bg-pink-400
    '#84cc16', // bg-lime-400
    '#3b82f6', // bg-sky-400
    '#6366f1', // bg-indigo-400
    '#14b8a6', // bg-teal-400
  ];
  exercises: string[] = [
    'Chest',
    'Calves',
    'Hamstrings',
    'Quads',
    'Glutes',
    'Shoulders',
    'Triceps',
    'Forearms',
    'Biceps',
    'Back',
    'Abs',
  ];
  date = new Date();
  currentMonthYear = this.date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
  hoverIndex: number = -1;
  screenWidth!: number;
  chart!: Chart;

  ngOnInit(): void {
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['monthlyExerciseInfo'] &&
      changes['monthlyExerciseInfo'].currentValue
    ) {
      this.exercisePercentage = this.getExercisePercentage();
    }

    if (changes['daysOfMonth'] && changes['daysOfMonth'].currentValue) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
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

  getExercisePercentage(): number[] {
    const percentages: number[] = [];
    const exerciseInfo = Object.values(this.monthlyExerciseInfo);
    const exerciseNames = Object.keys(this.monthlyExerciseInfo);
    const filteredExercisesSet: Set<string> = new Set();
    const totalSets = exerciseInfo.reduce((acc, curr) => acc + curr, 0);
    let totalPercentage = 0;

    for (let i = 0; i < exerciseInfo.length; i++) {
      if (exerciseInfo[i] !== 0) {
        const percentage = parseFloat(
          ((exerciseInfo[i] / totalSets) * 100).toFixed(1)
        );
        percentages.push(percentage);
        totalPercentage += percentage;

        let exerciseName = exerciseNames[i].toLowerCase();

        if (exerciseName.includes('ab')) {
          exerciseName = 'Abs';
        } else if (exerciseName.includes('back')) {
          exerciseName = 'Back';
        } else {
          exerciseName = exerciseName.replace('sets', '');
          exerciseName =
            exerciseName.charAt(0).toUpperCase() + exerciseName.slice(1);
          exerciseName += 's';
        }

        filteredExercisesSet.add(exerciseName);
      }
    }

    this.exercises = [...filteredExercisesSet];

    return percentages;
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.isSmallScreen()) {
      let xValues = this.exercises;
      let yValues = this.exercisePercentage;
      let barColors = this.colorsHex;

      let config: ChartConfiguration = {
        type: 'pie',
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };

      this.chart = new Chart('myChart', config);
    }
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
