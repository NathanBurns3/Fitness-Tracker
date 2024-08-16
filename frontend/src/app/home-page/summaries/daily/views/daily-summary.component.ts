import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';
import { IExerciseInfo } from '../models/exercise-info';
import { DailyEatingInfoService } from '../services/daily-eating-info.service';
import { DailyExerciseInfoService } from '../services/daily-exercise-info.service';
import { Chart, ChartConfiguration } from 'chart.js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'DailySummaryComponent',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css'],
})
export class DailySummaryComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dailyEatingInfo!: IDailyEatingInfo;
  @Input() dailyExerciseInfo!: IExerciseInfo;
  @Input() isLoading: boolean = false;

  exercisePercentage!: number[];
  eatingPercentage!: number[];
  eatingTotalsAndGoals!: { total: number; goal: number }[];
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
  macros: string[] = ['Calories', 'Protein', 'Carbs', 'Fat', 'Fiber'];
  macroUnits: { [key: string]: string } = {
    Calories: 'kcal',
    Protein: 'g',
    Carbs: 'g',
    Fat: 'g',
    Fiber: 'g',
  };
  hoverIndex: number = -1;
  screenWidth!: number;
  chart!: Chart;

  ngOnInit(): void {
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dailyEatingInfo'] && changes['dailyEatingInfo'].currentValue) {
      this.eatingPercentage = this.getEatingPercentage();
    }
    if (
      changes['dailyExerciseInfo'] &&
      changes['dailyExerciseInfo'].currentValue
    ) {
      this.exercisePercentage = this.getExercisePercentage();
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
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
    const exerciseInfo = Object.values(this.dailyExerciseInfo);
    const exerciseNames = Object.keys(this.dailyExerciseInfo);
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

  getEatingPercentage(): number[] {
    const percentages: number[] = [];
    this.eatingTotalsAndGoals = [];
    const eatingTotals = Object.values(this.dailyEatingInfo.totals);
    const eatingGoals = Object.values(this.dailyEatingInfo.goals);
    const eatingInfoLength = eatingTotals.length;
    for (let i = 0; i < eatingInfoLength; i++) {
      const percentage = Math.round((eatingTotals[i] / eatingGoals[i]) * 100);
      if (percentage !== 0) {
        percentages.push(percentage);
      }
      this.eatingTotalsAndGoals.push({
        total: parseFloat(eatingTotals[i].toFixed(2)),
        goal: parseFloat(eatingGoals[i].toFixed(2)),
      });
    }
    return percentages;
  }

  createChart(): void {
    setTimeout(() => {
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
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

            this.chart = new Chart(context, config);
          }
        } else {
          console.error('Failed to acquire context from the given item');
        }
      }
    }, 0);
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
