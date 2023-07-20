import { Component, OnInit } from '@angular/core';
import { CategoryModel, UpdateCategoryModel } from 'src/app/models/category-model.entity';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }
  categories: CategoryModel[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }
}
