import { Component } from '@angular/core';

@Component({
  selector: 'search-meals',
  templateUrl: './search-meals.component.html',
})
export class SearchMealsComponent {
  selectedSearch: string = 'All';

  selectSearch(searchType: string) {
    this.selectedSearch = searchType;
  }
}
