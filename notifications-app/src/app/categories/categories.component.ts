import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Output() selectCategoryEmitter = new EventEmitter<string>();
  selectedCategory: string;
  listOfCategories: string[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.listOfCategories = categories.map(
          (category: Category) => category.name
        );
      },
      (error) => {
        console.log('Error fetching categories:', error);
      }
    );
  }

  selectCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    this.selectCategoryEmitter.emit(selectedCategory);
  }

  emitSelectedCategory() {
    this.selectCategoryEmitter.emit(this.selectedCategory);
  }

  resetFilters() {
    this.selectedCategory = undefined;
    this.emitSelectedCategory();
  }
}
