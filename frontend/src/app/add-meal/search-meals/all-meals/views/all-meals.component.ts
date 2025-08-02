import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MealLookupService } from '../services/meal-lookup.service';
import { IFood } from 'src/app/add-meal/models/food';
import { MealDetailsComponent } from 'src/app/add-meal/meal-details/meal-details.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchMealsComponent } from '../../views/search-meals.component';
import { FavoriteMealsService } from '../../favorite-meals/services/favorite-meals.service';

@Component({
  selector: 'all-meals',
  templateUrl: './all-meals.component.html',
  styleUrl: './all-meals.component.css',
  standalone: false,
})
export class AllMealsComponent {
  @Output() favoriteMealsChange = new EventEmitter<IFood[]>();

  mealSearch: string = '';
  meals: IFood[] = [];
  loading: boolean = false;
  submitButtonPressed: boolean = false;

  constructor(
    private mealLookupService: MealLookupService,
    private favoriteMealsService: FavoriteMealsService,
    private dialog: MatDialog,
  ) {}

  Lookup(meal: string) {
    this.submitButtonPressed = true;
    this.loading = true;
    if (meal === '') {
      this.meals = [];
      this.loading = false;
      return;
    }
    this.mealLookupService.searchMeals(meal).subscribe({
      next: (data: IFood[]) => {
        this.meals = data.map((meal: IFood) => {
          return {
            ...meal,
            description: this.formatFoodName(meal.description),
            ingredients: this.formatFoodName(meal.ingredients),
            brandName: this.formatFoodName(meal.brandName),
          };
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openFoodDetails(food: IFood): void {
    this.mealLookupService
      .updateNutritions(food)
      .subscribe((updatedFood: IFood) => {
        const dialogRef = this.dialog.open(MealDetailsComponent, {
          data: {
            food: updatedFood,
            buttons: [
              { text: 'Add Food', action: 'addFood' },
              { text: 'Favorite', action: 'addFavoriteFood' },
            ],
          },
          width: '600px',
          height: '600px',
        });

        dialogRef.componentInstance.favoriteAdded.subscribe(() => {
          this.favoriteMealsService.getFavoriteMeals().subscribe((meals) => {
            this.favoriteMealsChange.emit(meals);
          });
        });
      });
  }

  formatFoodName(name: string): string {
    if (!name) {
      return '';
    }
    return name
      .toLowerCase()
      .split(',')
      .map((word) => word.trim())
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(', ');
  }
}
