import { Component, HostListener, OnInit } from '@angular/core';
import { IMonthlyBreakdownInfo } from '../models/monthly-breakdown-info';
import { MonthlyBreakdownInfoService } from '../services/monthly-breakdown-info.service';
import { IExerciseInfo } from '../../daily/models/exercise-info';
import { MonthlyExerciseInfoService } from '../services/monthly-exercise-info.service';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'MonthlySummaryComponent',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.css'],
})
export class MonthlySummaryComponent implements OnInit {
  monthlyBreakdownInfo!: IMonthlyBreakdownInfo[];
  monthlyExerciseInfo!: IExerciseInfo;
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
  daysOfMonth: IMonthlyBreakdownInfo[] = [];
  screenWidth!: number;
  chart!: Chart;

  constructor(
    private monthlyBreakdownInfoService: MonthlyBreakdownInfoService,
    private monthlyExerciseInfoService: MonthlyExerciseInfoService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.monthlyBreakdownInfo =
      this.monthlyBreakdownInfoService.getMonthlyBreakdownInfo();
    this.monthlyExerciseInfo =
      this.monthlyExerciseInfoService.getMonthlyExerciseInfo();
    this.exercisePercentage = this.getExercisePercentage();
    this.daysOfMonth = this.generateDaysOfMonth(
      this.date.getFullYear(),
      this.date.getMonth()
    );
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.createChart();
  }

  isSmallScreen() {
    return this.screenWidth < 450;
  }

  generateDaysOfMonth(year: number, month: number): IMonthlyBreakdownInfo[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days: IMonthlyBreakdownInfo[] = [];
    const goals = this.monthlyBreakdownInfoService.getMonthlyBreakdownInfo();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, exerciseGoal: false, eatingGoal: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const goal = goals.find((g) => g.day === day);
      if (goal) {
        days.push(goal);
      } else {
        days.push({ day, exerciseGoal: false, eatingGoal: false });
      }
    }
    return days;
  }

  getExercisePercentage(): number[] {
    const percentages: number[] = [];
    const exerciseInfo = Object.values(this.monthlyExerciseInfo);
    const exerciseInfoLength = exerciseInfo.length - 1;
    const totalSets = exerciseInfo[exerciseInfoLength];
    for (let i = 0; i < exerciseInfoLength; i++) {
      const percentage = Math.round((exerciseInfo[i] / totalSets) * 100);
      if (percentage !== 0) {
        percentages.push(percentage);
      }
    }
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
}
