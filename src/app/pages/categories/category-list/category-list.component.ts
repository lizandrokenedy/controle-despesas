import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (categories) => {
        this.categories = categories
      },
      (error: Error) => {
        alert('Não foi possível carregar as categorias.')
      }
    )
  }

  deleteCategory(category: Category): void {

    const mustDelete = confirm(`Deseja realmente excluir esta categoria: ${category.name}?`)

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => {
          this.categories = this.categories.filter((element) => element != category),
            (error: Error) => {
              alert('Erro ao tentar excluir')
            }
        }
      )
    }
  }

}
