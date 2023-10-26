import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { YearlyEatingGoalsService } from '../services/yearly-eating-goals.service';
import { YearlyExercisesService } from '../services/yearly-exercise.service';
Chart.register(...registerables);

@Component({
  selector: 'YearlySummaryComponent',
  templateUrl: './yearly-summary.component.html',
})
export class YearlySummaryComponent implements OnInit {
  ExercisesCompleted!: number[];
  EatingGoalsCompleted!: number[];

  constructor(
    private yearlyExercisesService: YearlyExercisesService,
    private yearlyEatingGoalsService: YearlyEatingGoalsService
  ) {}

  ngOnInit(): void {
    this.ExercisesCompleted = this.yearlyExercisesService.getYearlyExercises();
    this.EatingGoalsCompleted =
      this.yearlyEatingGoalsService.getYearlyEatingGoals();

    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
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
            backgroundColor: 'rgba(21, 101, 192, 0.5)',
            borderColor: 'rgba(21, 101, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Eating Goals Completed',
            data: this.EatingGoalsCompleted,
            backgroundColor: 'rgba(245, 124, 0, 0.5)',
            borderColor: 'rgba(245, 124, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
